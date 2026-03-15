import helmet from "helmet";
import { Server } from "socket.io";

import { authSender } from "../middleware/authMiddleware.js";
import { incrementMetric } from "../middleware/metricsMiddleware.js";
import {
  createSocketEventLimiter,
  socketPrincipal,
} from "../middleware/socketRateLimiter.js";
import {
  socketErrorPayload,
  validateConversationEvent,
  validateDiscussionEvent,
  validateMessagingEvent,
} from "../middleware/socketMessagePolicy.js";
import { saveMessage } from "../modules/modulMessages.js";

const generateConversationId = (message) => {
  const sender = message.sender._id.toString();
  const recipient = message.recipient._id.toString();
  const recipientType = message.recipient.type.toString();

  if (message.recipient.type.toString() === "member")
    return sender > recipient
      ? `${sender}:${recipient}`
      : `${recipient}:${sender}`;
  else return `${recipientType}:${recipient}`;
};

const replyAck = (ack, payload) => {
  if (typeof ack === "function") ack(payload);
};

export const setupSocket = (server) => {
  // https://socket.io/docs/v4/server-socket-instance/
  const io = new Server(server, { transports: ["websocket"] });

  io.engine.use(helmet());
  const socketEventLimiter = createSocketEventLimiter();

  // Authorization middleware to append the user as well.
  io.use(authSender);
  // io.engine.use(RateLimit({ windowMs: 1 * 60 * 1000, max: 10 }));

  io.on("connection", async (socket) => {
    const allowSocketEvent = (eventName) => {
      const verdict = socketEventLimiter.consume({
        key: socketPrincipal(socket),
        event: eventName,
      });
      if (!verdict.allowed) {
        incrementMetric("socketRateLimitHits");
        socket.emit("rate_limit", {
          event: eventName,
          retryAfterMs: verdict.retryAfterMs,
        });
        return { allowed: false, retryAfterMs: verdict.retryAfterMs };
      }
      return { allowed: true, retryAfterMs: 0 };
    };

    const enforceSocketRate = (eventName, ack) => {
      const verdict = allowSocketEvent(eventName);
      if (!verdict.allowed) {
        replyAck(ack, {
          ok: false,
          error: "rate_limited",
          retryAfterMs: verdict.retryAfterMs,
        });
        return false;
      }
      return true;
    };

    // Centralized persistence with consistent socket error handling.
    const persistMessage = async (payload, ack) => {
      try {
        return await saveMessage(payload);
      } catch (error) {
        console.error(error);
        socket.emit("socket_error", socketErrorPayload("server_error"));
        replyAck(ack, { ok: false, error: "server_error" });
        return null;
      }
    };

    // once a member has requested Messaging another member
    socket.on("joinMessaging", async (m, ack) => {
      if (!enforceSocketRate("join", ack)) return;
      const validation = await validateMessagingEvent(socket, m);
      if (!validation.ok) {
        socket.emit("socket_error", socketErrorPayload(validation.reason));
        replyAck(ack, { ok: false, error: validation.reason });
        return;
      }
      // add sender details from authentication
      // then save vomplete message to DB
      const saved = await persistMessage(
        {
          ...validation.message,
          content: "Joined",
        },
        ack,
      );
      if (!saved) return;
      socket.message = saved;

      const conversationId = generateConversationId(socket.message);

      // announce the member has joined the messaging
      io.sockets.in(conversationId).emit("conversation", socket.message);

      // join member to 2 rooms one for the sender another for the recepient
      socket.join(conversationId);
      replyAck(ack, { ok: true, event: "joinMessaging" });
    });

    socket.on("joinDiscussion", async (m, ack) => {
      if (!enforceSocketRate("join", ack)) return;
      const validation = await validateDiscussionEvent(socket, m);
      if (!validation.ok) {
        socket.emit("socket_error", socketErrorPayload(validation.reason));
        replyAck(ack, { ok: false, error: validation.reason });
        return;
      }
      // add sender details from authentication
      // then save vomplete message to DB
      const saved = await persistMessage(
        {
          ...validation.message,
          content: "Joined",
        },
        ack,
      );
      if (!saved) return;
      socket.message = saved;

      const conversationId = generateConversationId(socket.message);

      // announce the member has joined the messaging
      io.sockets.in(conversationId).emit("conversation", socket.message);

      // join member to 2 rooms one for the sender another for the recepient
      socket.join(conversationId);
      replyAck(ack, { ok: true, event: "joinDiscussion" });
    });

    // on receiving a message send a message to both members in the messaging
    socket.on("conversation", async (m, ack) => {
      if (!enforceSocketRate("conversation", ack)) return;
      const validation = await validateConversationEvent(socket, m);
      if (!validation.ok) {
        socket.emit("socket_error", socketErrorPayload(validation.reason));
        replyAck(ack, { ok: false, error: validation.reason });
        return;
      }
      // add sender details from authentication
      // then save vomplete message to DB
      const saved = await persistMessage({ ...validation.message }, ack);
      if (!saved) return;
      socket.message = saved;
      const conversationId = generateConversationId(socket.message);
      // announce the member has joined the messaging
      io.sockets.in(conversationId).emit("conversation", socket.message);
      replyAck(ack, { ok: true, event: "conversation", id: socket.message?._id });
    });

    // on member leave messaging
    socket.on("leaveMessaging", async (m, ack) => {
      if (!enforceSocketRate("leave", ack)) return;
      const validation = await validateMessagingEvent(socket, m);
      if (!validation.ok) {
        socket.emit("socket_error", socketErrorPayload(validation.reason));
        replyAck(ack, { ok: false, error: validation.reason });
        return;
      }
      // add sender details from authentication
      // then save vomplete message to DB
      const saved = await persistMessage(
        {
          ...validation.message,
          content: "Left",
        },
        ack,
      );
      if (!saved) return;
      socket.message = saved;

      const conversationId = generateConversationId(socket.message);

      // annnounce member leaving the messaging
      io.sockets.in(conversationId).emit("conversation", socket.message);

      // member leave the room
      socket.leave(conversationId);
      replyAck(ack, { ok: true, event: "leaveMessaging" });
    });

    socket.on("leaveDiscussion", async (m, ack) => {
      if (!enforceSocketRate("leave", ack)) return;
      const validation = await validateDiscussionEvent(socket, m);
      if (!validation.ok) {
        socket.emit("socket_error", socketErrorPayload(validation.reason));
        replyAck(ack, { ok: false, error: validation.reason });
        return;
      }
      // add sender details from authentication
      // then save vomplete message to DB
      const saved = await persistMessage(
        {
          ...validation.message,
          content: "Left",
        },
        ack,
      );
      if (!saved) return;
      socket.message = saved;

      const conversationId = generateConversationId(socket.message);

      // annnounce member leaving the messaging
      io.sockets.in(conversationId).emit("conversation", socket.message);

      // member leave the room
      socket.leave(conversationId);
      replyAck(ack, { ok: true, event: "leaveDiscussion" });
    });

    // on member disconnect
    socket.on("disconnect", async (reason) => {});

    // // on member disconnecting
    socket.on("disconnecting", async (reason) => {});

    // Opportunistic cleanup to avoid unbounded in-memory limiter growth.
    if (Math.random() < 0.1) socketEventLimiter.cleanup();
  });

  return io;
};
