import { useContext, useEffect, useState } from "react";
import moment from "moment";

import Wrappers from "./common/Wrappers";

import { UserContext } from "../store";
import { useNavigate, useParams } from "react-router-dom";
import {
  BoxCenterHeader,
  MessageCircle,
  CloseCircleLink,
  Avatar,
  AvatarLink,
} from "./common/Icons";

/**
 * Discussion component.
 *
 * @returns {React.ReactElement} languages element.
 */
const Messaging = () => {
  const { id, name } = useParams();
  const { user, socket } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const message = {
    sender: { _id: user._id, name: user.name, type: "members" },
    recipient: { _id: id, name, type: "members" },
    content: "",
  };

  // member join coversation when online
  useEffect(() => {
    message.content = "join";
    socket.emit("joinConversation", message);
    return () => {
      message.content = "leave";
      socket.emit("leaveConversation", message);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on receiving a message
  useEffect(() => {
    const onConversation = (message) => {
      setMessages((previous) => [...previous, message]);
      document.getElementById("endoflist").scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    };
    socket.on("conversation", onConversation);
    return () => socket.off("conversation", onConversation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = (event) => {
    message.content = event.target.value;
    if (message.content) {
      socket.emit("conversation", message);
      event.target.value = "";
    }
  };

  // on receiving a message
  useEffect(() => {
    const onDisconnect = () => {
      navigate(-1);
    };
    socket.on("disconnect", onDisconnect);
    return () => socket.off("disconnect", onDisconnect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <Avatar name={name} />
          <MessageCircle color='white' />
          <BoxCenterHeader>{name}</BoxCenterHeader>
          <CloseCircleLink />
        </Wrappers.Header>

        <Wrappers.Body>
          {messages?.length > 0 &&
            messages.map((message, index) => (
              <div className='d-block m-0 p-0' id={message._id} key={index}>
                <div className='d-flex justify-content-between w-100'>
                  <span className='w-100 m-0 ms-1 lh-1 fw-lighter fs-6 text-start'>
                    {message.sender.name}
                  </span>
                  <span className='w-100 m-0 lh-1 fw-lighter fs-6 text-end'>
                    {moment(message.createdAt).format("DD MMMM h:mm a")}
                  </span>
                </div>
                <div className='d-inline m-0 me-1 p-0'>
                  <AvatarLink
                    size={24}
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

        <div className='p-1' id='sendForm'>
          <input
            id='content'
            placeholder='Enter Message'
            // value={content}
            type='text'
            className='form-control form-control-sm'
            onKeyDown={(event) => event.key == "Enter" && send(event)}
            style={{ fontSize: "16px" }}
          />
        </div>
      </Wrappers.Modal>
    </>
  );
};

export default Messaging;
