import test from "node:test";
import assert from "node:assert/strict";

import Members from "../models/modelUsers.js";
import {
  validateConversationEvent,
  validateDiscussionEvent,
  validateMessagingEvent,
} from "../middleware/socketMessagePolicy.js";

const baseSocket = {
  message: {
    sender: {
      _id: "507f1f77bcf86cd799439011",
      name: "Alice",
      type: "member",
    },
  },
  handshake: { address: "127.0.0.1" },
};

test("validateDiscussionEvent accepts allowed recipient types", async () => {
  const originalFindById = Members.findById;
  Members.findById = () => ({
    select: async () => ({
      organisations: [
        {
          _id: { equals: (value) => value === "507f1f77bcf86cd799439021" },
          approved: true,
        },
      ],
    }),
  });

  try {
    const result = await validateDiscussionEvent(baseSocket, {
      recipient: {
        _id: "507f1f77bcf86cd799439021",
        type: "organisation",
        name: "Org",
      },
      content: "hello",
    });

    assert.equal(result.ok, true);
    assert.equal(result.message.content, "hello");
  } finally {
    Members.findById = originalFindById;
  }
});

test("validateDiscussionEvent rejects invalid recipient type", async () => {
  const result = await validateDiscussionEvent(baseSocket, {
    recipient: {
      _id: "507f1f77bcf86cd799439021",
      type: "member",
      name: "Bob",
    },
    content: "hello",
  });

  assert.equal(result.ok, false);
  assert.equal(result.reason, "invalid_recipient_type");
});

test("validateDiscussionEvent rejects when membership is missing", async () => {
  const originalFindById = Members.findById;
  Members.findById = () => ({ select: async () => ({ organisations: [] }) });

  try {
    const result = await validateDiscussionEvent(baseSocket, {
      recipient: {
        _id: "507f1f77bcf86cd799439021",
        type: "organisation",
        name: "Org",
      },
      content: "hello",
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "forbidden");
  } finally {
    Members.findById = originalFindById;
  }
});

test("validateMessagingEvent requires approved contact", async () => {
  const originalExists = Members.exists;
  Members.exists = async () => null;

  try {
    const result = await validateMessagingEvent(baseSocket, {
      recipient: {
        _id: "507f1f77bcf86cd799439021",
        type: "member",
        name: "Bob",
      },
      content: "",
    });

    assert.equal(result.ok, false);
    assert.equal(result.reason, "forbidden");
  } finally {
    Members.exists = originalExists;
  }
});

test("validateConversationEvent trims and bounds message length", async () => {
  const originalExists = Members.exists;
  Members.exists = async () => ({ _id: "x" });

  try {
    const result = await validateConversationEvent(baseSocket, {
      recipient: {
        _id: "507f1f77bcf86cd799439021",
        type: "member",
        name: "Bob",
      },
      content: `  ${"x".repeat(900)}  `,
    });

    assert.equal(result.ok, true);
    assert.equal(result.message.content.length, 500);
  } finally {
    Members.exists = originalExists;
  }
});
