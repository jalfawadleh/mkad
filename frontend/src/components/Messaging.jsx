import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";
import { toast } from "react-toastify";

import Wrappers from "./common/Wrappers";

import { UserContext } from "../store";
import { useNavigate, useParams } from "react-router-dom";
import {
  BoxCenterHeader,
  CloseCircleLink,
  Avatar,
  AvatarLink,
  MessageCircle,
  OfflineCircle,
  OnlineCircle,
} from "./common/Icons";

/**
 * Messaging component.
 *
 * @returns {React.ReactElement} languages element.
 */
const Messaging = () => {
  const { id, name } = useParams();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user._id == id) {
      navigate(-1);
      toast("You can't text yourself");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState(false);

  const URL = import.meta.env.PROD
    ? "https://demo.mkadifference.com/"
    : "http://localhost:3011/";

  const socket = io(URL, {
    autoConnect: true,
    extraHeaders: { authorization: user.token },
  });

  const message = {
    sender: { _id: user._id, type: "member", name: user.name },
    recipient: { _id: id, type: "member", name },
    content: "",
  };

  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when member connect join the discussion
  useEffect(() => {
    const join = () => {
      message.content = "join";
      socket.emit("join", message);
    };
    socket.on("connect", join);
    return () => socket.off("connect", join);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onMessage = (message) => {
      setMessages((previous) => [...previous, message]);
      setTimeout(
        () =>
          document.getElementById("endoflist").scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "end",
          }),
        200
      );
    };
    socket.on("message", onMessage);
    return () => socket.off("message", onMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("online", setOnline);
    return () => socket.off("online");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = () => {
    const element = document.getElementById("content");
    const content = element.value;
    if (content) {
      message.content = content;
      socket.emit("message", message);
      element.value = "";
    }
  };

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <Avatar name={name} />
          <MessageCircle color='white' />
          <BoxCenterHeader>{name}</BoxCenterHeader>
          {online ? <OnlineCircle /> : <OfflineCircle />}
          <CloseCircleLink />
        </Wrappers.Header>

        <Wrappers.Body>
          {messages?.length > 0 &&
            messages.map((message) => (
              <div className='d-block p-1' id={message._id} key={message._id}>
                <div className='d-flex justify-content-between w-100'>
                  <span className='w-100 m-0 lh-1 fw-lighter fs-6 text-start'>
                    {message.sender.name}
                  </span>
                  <span className='w-100 m-0 lh-1 fw-lighter fs-6 text-end'>
                    {moment(message.createdAt).format("DD MMMM h:mm a")}
                  </span>
                </div>
                <div className='d-inline'>
                  <AvatarLink
                    name={message.sender.name}
                    id={message.sender._id}
                  />
                </div>
                <div className='d-inline'>{message.content}</div>
                <hr className='m-1 p-0' />
              </div>
            ))}
          <div id='endoflist' className='my-0' />
        </Wrappers.Body>

        <div className='hstack gap-2 p-1' id='sendForm'>
          <input
            id='content'
            placeholder='Enter Message'
            // value={content}
            type='text'
            className='form-control form-control-sm'
            onKeyDown={(event) => event.key == "Enter" && send()}
          />
        </div>
      </Wrappers.Modal>
    </>
  );
};

export default Messaging;
