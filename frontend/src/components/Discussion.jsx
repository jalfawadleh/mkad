import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import moment from "moment";

import Wrappers from "./common/Wrappers";

import { UserContext } from "../store";
import { useNavigate, useParams } from "react-router-dom";
import {
  CloseCircleLink,
  AvatarLink,
  Spinner,
  TextCenterBox,
  DiscusstionCircle,
  OrganisationCircle,
  ActivityCircle,
} from "./common/Icons";
import axios from "axios";
import { toast } from "react-toastify";
import { getErrorMessage } from "../utils/http.js";

/**
 * Conversation component.
 *
 * @returns {React.ReactElement} languages element.
 */
const Discussion = () => {
  const { type, id, name } = useParams();
  const { user, socket } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [conversationBlockedUntil, setConversationBlockedUntil] = useState(0);
  const navigate = useNavigate();

  const message = useMemo(() => ({
    sender: { _id: user._id, name: user.name, type: "member" },
    recipient: { _id: id, type, name },
    content: "",
  }), [id, name, type, user._id, user.name]);

  const showLastMessage = useCallback(() =>
    setTimeout(
      () =>
        document
          .getElementById("endoflist")
          .scrollIntoView({ behavior: "smooth", block: "end" }),
      250
    ), []);

  const getDiscussion = useCallback(async () => {
    setIsLoading(true);
    await axios
      .post(`/messages/discussion`, { _id: id, type, skip: messages.length })
      .then((res) => setMessages((previous) => [...res.data, ...previous]))
      .then(() => {
        if (messages.length < 10) showLastMessage();
      })
      .then(() => setIsLoading(false))
      .catch((error) => toast.error(getErrorMessage(error)));
  }, [id, messages.length, showLastMessage, type]);

  useEffect(() => {
    getDiscussion();
  }, [getDiscussion]);

  const onScroll = (e) => {
    if (e.target.scrollTop === 0) {
      getDiscussion();
    }
  };

  // member join coversation when online
  useEffect(() => {
    if (socket.id) {
      socket.emit("joinDiscussion", { ...message, content: "join" }, (ack) => {
        if (!ack?.ok && ack?.error) toast.error(`Join failed: ${ack.error}`);
      });
    } else navigate("/");
    return () => {
      if (socket.id) {
        socket.emit("leaveDiscussion", { ...message, content: "leave" });
      }
    };
  }, [message, navigate, socket]);

  // on receiving a message
  useEffect(() => {
    const onConversation = (message) => {
      setMessages((previous) => [...previous, message]);
      showLastMessage();
    };
    const onRateLimit = (payload) => {
      if (payload?.event === "conversation" && payload?.retryAfterMs) {
        setConversationBlockedUntil(Date.now() + payload.retryAfterMs);
        toast.error(`Messaging limited. Retry in ${Math.ceil(payload.retryAfterMs / 1000)}s`);
      }
    };
    if (socket.id) socket.on("conversation", onConversation);
    if (socket.id) socket.on("rate_limit", onRateLimit);
    return () => {
      if (socket.id) socket.off("conversation", onConversation);
      if (socket.id) socket.off("rate_limit", onRateLimit);
    };
  }, [showLastMessage, socket]);

  const send = (event) => {
    if (Date.now() < conversationBlockedUntil) return;
    if (event.key === "Enter" && event.target.value) {
      socket.emit(
        "conversation",
        { ...message, content: event.target.value },
        (ack) => {
          if (!ack?.ok) {
            if (ack?.retryAfterMs) {
              setConversationBlockedUntil(Date.now() + ack.retryAfterMs);
            }
            toast.error(`Message failed: ${ack?.error || "unknown error"}`);
          }
        },
      );
      event.target.value = "";
    }
  };

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <DiscusstionCircle />
          {type === "organisation" ? <OrganisationCircle /> : <ActivityCircle />}
          <TextCenterBox text={name} />
          <CloseCircleLink />
        </Wrappers.Header>
        <div
          className='modal-body d-block overflow-y-auto p-1 m-1'
          onScroll={onScroll}
        >
          {isLoading && (
            <div className='d-block m-0 p-0'>
              <Spinner />
            </div>
          )}
          {messages?.length > 0 &&
            messages.map((m, index) => (
              <div
                className='d-block m-0 p-0'
                id={m._id}
                key={m._id ?? `${m.sender?._id}-${m.createdAt}-${index}`}
              >
                <div className='d-flex justify-content-between w-100'>
                  <span className='w-100 m-0 ms-1 lh-1 fw-lighter fs-6 text-start'>
                    {m.sender.name ? m.sender.name : ""}
                  </span>
                  <span className='w-100 m-0 lh-1 fw-lighter fs-6 text-end'>
                    {m.createdAt
                      ? moment(m.createdAt).format("DD MMMM h:mm a")
                      : ""}
                  </span>
                </div>
                <div className='d-inline m-0 me-1 p-0'>
                  <AvatarLink
                    size={24}
                    to={"/members/" + m.sender._id}
                    name={m.sender.name}
                  />
                </div>
                <div className='d-inline'>{m.content}</div>
                <hr className='m-1 p-0' />
              </div>
            ))}
          <div id='endoflist' className='my-0' />
        </div>
        <Wrappers.Footer>
          <input
            id='content'
            className='w-100 bg-black text-break text-wrap'
            placeholder='Enter Message'
            type='text'
            onKeyDown={(event) => send(event)}
            style={{ fontSize: "16px" }}
            autoFocus
            autoCorrect='off'
            autoCapitalize='none'
            autoComplete='off'
          />
        </Wrappers.Footer>
      </Wrappers.Modal>
    </>
  );
};

export default Discussion;
