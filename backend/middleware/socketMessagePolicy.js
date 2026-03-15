import mongoose from "mongoose";
import Members from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";
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

// Only allow member-to-member access for self or approved contacts.
const ensureMemberAccess = async ({ senderId, recipientId }) => {
  if (!isValidId(senderId) || !isValidId(recipientId)) return false;
  if (senderId.toString() === recipientId.toString()) return true;
  return await canMessageMember(senderId, recipientId);
};

const ensureDiscussionAccess = async ({
  senderId,
  recipientId,
  recipientType,
}) => {
  if (!isValidId(senderId) || !isValidId(recipientId)) return false;

  if (recipientType === "member") {
    return await ensureMemberAccess({ senderId, recipientId });
  }

  // For organisations, only the org itself or approved members can participate.
  if (recipientType === "organisation") {
    if (senderId.toString() === recipientId.toString()) return true;
    const member = await Members.findById(senderId).select("organisations");
    if (!member) return false;
    return (
      member.organisations?.some(
        (o) => o._id.equals(recipientId) && o.approved,
      ) ?? false
    );
  }

  // For activities, require membership or ownership/management.
  if (recipientType === "activity") {
    const activity = await Activities.findById(recipientId).select(
      "members createdBy managedBy",
    );
    if (!activity) return false;
    if (activity.createdBy?._id?.equals?.(senderId)) return true;
    if (activity.managedBy?.some((m) => m._id.equals(senderId))) return true;
    return activity.members?.some((m) => m._id.equals(senderId)) ?? false;
  }

  return false;
};

const validateMessagingEvent = async (socket, payload) => {
  incrementMetric("socketEvents");
  const normalized = normalizeSocketMessage(socket, payload, { requireContent: false });
  if (!normalized.ok) return normalized;

  if (normalized.message.recipient.type !== "member") {
    return { ok: false, reason: "invalid_recipient_type" };
  }

  const allowed = await ensureDiscussionAccess({
    senderId: normalized.message.sender._id,
    recipientId: normalized.message.recipient._id,
    recipientType: "member",
  });
  if (!allowed) return { ok: false, reason: "forbidden" };

  return normalized;
};

const validateDiscussionEvent = async (socket, payload) => {
  incrementMetric("socketEvents");
  const normalized = normalizeSocketMessage(socket, payload, { requireContent: false });
  if (!normalized.ok) return normalized;

  if (!ALLOWED_DISCUSSION_TYPES.has(normalized.message.recipient.type)) {
    return { ok: false, reason: "invalid_recipient_type" };
  }

  const allowed = await ensureDiscussionAccess({
    senderId: normalized.message.sender._id,
    recipientId: normalized.message.recipient._id,
    recipientType: normalized.message.recipient.type,
  });
  if (!allowed) return { ok: false, reason: "forbidden" };

  return normalized;
};

const validateConversationEvent = async (socket, payload) => {
  incrementMetric("socketEvents");
  const normalized = normalizeSocketMessage(socket, payload, { requireContent: true });
  if (!normalized.ok) return normalized;

  if (
    !ALLOWED_DISCUSSION_TYPES.has(normalized.message.recipient.type) &&
    normalized.message.recipient.type !== "member"
  ) {
    return { ok: false, reason: "invalid_recipient_type" };
  }

  const allowed = await ensureDiscussionAccess({
    senderId: normalized.message.sender._id,
    recipientId: normalized.message.recipient._id,
    recipientType: normalized.message.recipient.type,
  });
  if (!allowed) return { ok: false, reason: "forbidden" };

  return normalized;
};

const socketErrorPayload = (reason) => ({
  code: "socket_policy_violation",
  reason,
});

export {
  ensureDiscussionAccess,
  ensureMemberAccess,
  socketErrorPayload,
  validateConversationEvent,
  validateDiscussionEvent,
  validateMessagingEvent,
};
