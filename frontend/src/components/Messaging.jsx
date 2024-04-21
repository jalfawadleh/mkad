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
  const [msgBoxH, setMsgBoxH] = useState(
    window.innerWidth < 560
      ? window.innerHeight - 100
      : window.innerHeight - 200
  );
  const navigate = useNavigate();

  const message = {
    sender: { _id: user._id, name: user.name, type: "members" },
    recipient: { _id: id, name, type: "members" },
    content: "",
  };

  // member join coversation when online
  useEffect(() => {
    if (socket.id) {
      message.content = "join";
      socket.emit("joinConversation", message);
    } else navigate("/");
    return () => {
      message.content = "leave";
      if (socket.id) socket.emit("leaveConversation", message);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // on receiving a message
  useEffect(() => {
    const onConversation = (message) => {
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
    if (socket.id) socket.on("conversation", onConversation);
    return () => {
      if (socket.id) socket.off("conversation", onConversation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = (event) => {
    message.content = event.target.value;
    if (message.content) {
      socket.emit("conversation", message);
      event.target.value = "";
    }
  };

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <Avatar name={name} />
          <MessageCircle color='white' />
          <BoxCenterHeader>{name}</BoxCenterHeader>
          <CloseCircleLink />
        </Wrappers.Header>

        <div className='overflow-auto' style={{ height: msgBoxH + "px" }}>
          {messages?.length > 0 &&
            messages.map((m, index) => (
              <div className='d-block m-0 p-0' id={m._id} key={index}>
                <div className='d-flex justify-content-between w-100'>
                  <span className='w-100 m-0 ms-1 lh-1 fw-lighter fs-6 text-start'>
                    {m.sender.name ? m.sender.name : ""}
                  </span>
                  <span className='w-100 m-0 lh-1 fw-lighter fs-6 text-end'>
                    {m.createdAt
                      ? moment(message.createdAt).format("DD MMMM h:mm a")
                      : ""}
                  </span>
                </div>
                <div className='d-inline m-0 me-1 p-0'>
                  <AvatarLink
                    size={24}
                    name={m.sender.name}
                    id={m.sender._id}
                  />
                </div>
                <div className='d-inline'>{m.content}</div>
                <hr className='m-1 p-0' />
              </div>
            ))}
          <div id='endoflist' className='my-0' />
        </div>

        <div className='p-1' id='sendForm'>
          <input
            id='content'
            placeholder='Enter Message'
            // value={content}
            type='text'
            className='form-control form-control-sm'
            onKeyDown={(event) => event.key == "Enter" && send(event)}
            style={{ fontSize: "16px" }}
            autoCorrect='off'
            autoCapitalize='none'
            autoComplete='off'
            onFocus={() => {
              if (window.innerWidth < 560) {
                setMsgBoxH(msgBoxH - 270);
                setTimeout(() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }, 100);
              }
            }}
            onBlur={() =>
              window.innerWidth < 560 ? setMsgBoxH(msgBoxH + 270) : null
            }
          />
        </div>
      </Wrappers.Modal>
    </>
  );
};

export default Messaging;
