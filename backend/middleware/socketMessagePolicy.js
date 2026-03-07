import mongoose from "mongoose";
import Members from "../models/modelUsers.js";
import { incrementMetric } from "./metricsMiddleware.js";

const ALLOWED_DISCUSSION_TYPES = new Set(["organisation", "activity"]);
const MAX_MESSAGE_LENGTH = 500;

const asString = (value) => (typeof value === "string" ? value.trim() : "");
const isValidId = (value) => mongoose.isValidObjectId(value);

const normalizeSocketMessage = (socket, payload, { requireContent = false } = {}) => {
  const senderId = socket?.message?.sender?._id;
  const senderName = asString(socket?.message?.sender?.name);
  const senderType = asString(socket?.message?.sender?.type) || "member";

  if (!isValidId(senderId)) {
    return { ok: false, reason: "unauthorized" };
  }

  const recipientId = payload?.recipient?._id;
  const recipientType = asString(payload?.recipient?.type);
  const recipientName = asString(payload?.recipient?.name);

  if (!isValidId(recipientId)) {
    return { ok: false, reason: "invalid_recipient" };
  }

  if (!recipientType) return { ok: false, reason: "invalid_recipient_type" };

  const content = asString(payload?.content).slice(0, MAX_MESSAGE_LENGTH);
  if (requireContent && !content) return { ok: false, reason: "empty_message" };

  return {
    ok: true,
    message: {
      sender: { _id: senderId, name: senderName, type: senderType },
      recipient: { _id: recipientId, type: recipientType, name: recipientName },
      content,
    },
  };
};

const canMessageMember = async (senderId, recipientId) => {
  if (senderId.toString() === recipientId.toString()) return false;
  const found = await Members.exists({
    _id: senderId,
    contacts: { $elemMatch: { _id: recipientId, approved: true } },
  });
  return Boolean(found);
};

const validateMessagingEvent = async (socket, payload) => {
  incrementMetric("socketEvents");
  const normalized = normalizeSocketMessage(socket, payload, { requireContent: false });
  if (!normalized.ok) return normalized;

  if (normalized.message.recipient.type !== "member") {
    return { ok: false, reason: "invalid_recipient_type" };
  }

  const allowed = await canMessageMember(
    normalized.message.sender._id,
    normalized.message.recipient._id,
  );
  if (!allowed) return { ok: false, reason: "forbidden" };

  return normalized;
};

const validateDiscussionEvent = (socket, payload) => {
  incrementMetric("socketEvents");
  const normalized = normalizeSocketMessage(socket, payload, { requireContent: false });
  if (!normalized.ok) return normalized;

  if (!ALLOWED_DISCUSSION_TYPES.has(normalized.message.recipient.type)) {
    return { ok: false, reason: "invalid_recipient_type" };
  }

  return normalized;
};

const validateConversationEvent = async (socket, payload) => {
  incrementMetric("socketEvents");
  const normalized = normalizeSocketMessage(socket, payload, { requireContent: true });
  if (!normalized.ok) return normalized;

  if (normalized.message.recipient.type === "member") {
    const allowed = await canMessageMember(
      normalized.message.sender._id,
      normalized.message.recipient._id,
    );
    if (!allowed) return { ok: false, reason: "forbidden" };
    return normalized;
  }

  if (!ALLOWED_DISCUSSION_TYPES.has(normalized.message.recipient.type)) {
    return { ok: false, reason: "invalid_recipient_type" };
  }

  return normalized;
};

const socketErrorPayload = (reason) => ({
  code: "socket_policy_violation",
  reason,
});

export {
  socketErrorPayload,
  validateConversationEvent,
  validateDiscussionEvent,
  validateMessagingEvent,
};
