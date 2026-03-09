import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const serverSource = fs.readFileSync(path.resolve(process.cwd(), "server.js"), "utf8");

const mustContain = (snippet) =>
  assert.equal(serverSource.includes(snippet), true, `Missing snippet: ${snippet}`);

test("socket handlers expose ack contract for all realtime events", () => {
  mustContain('socket.on("joinMessaging", async (m, ack) =>');
  mustContain('socket.on("joinDiscussion", async (m, ack) =>');
  mustContain('socket.on("conversation", async (m, ack) =>');
  mustContain('socket.on("leaveMessaging", async (m, ack) =>');
  mustContain('socket.on("leaveDiscussion", async (m, ack) =>');

  mustContain('replyAck(ack, { ok: true, event: "joinMessaging" });');
  mustContain('replyAck(ack, { ok: true, event: "joinDiscussion" });');
  mustContain('replyAck(ack, { ok: true, event: "leaveMessaging" });');
  mustContain('replyAck(ack, { ok: true, event: "leaveDiscussion" });');
  mustContain('replyAck(ack, { ok: false, error: validation.reason });');
  mustContain('error: "rate_limited"');
});
