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
  Spinner,
} from "./common/Icons";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * Discussion component.
 *
 * @returns {React.ReactElement} languages element.
 */
const Messaging = () => {
  const { id, name } = useParams();
  const { user, socket } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [messagesNumber, setMessagesNumber] = useState(0);
  const navigate = useNavigate();

  const message = {
    sender: { _id: user._id, name: user.name, type: "members" },
    recipient: { _id: id, name, type: "members" },
    content: "",
  };

  const showLastMessage = () =>
    setTimeout(
      () =>
        document
          .getElementById("endoflist")
          .scrollIntoView({ behavior: "smooth", block: "end" }),
      250
    );

  async function getMessages() {
    setIsLoading(true);
    await axios
      .post(`/messages`, { _id: id, name, type: "members", messagesNumber })
      .then((res) => setMessages((previous) => [...res.data, ...previous]))
      .then(() => setIsLoading(false))
      .then(() => messagesNumber > 0 && showLastMessage())
      .then(() => setMessagesNumber(messagesNumber + 15))
      .catch(() => {
        toast.error("Something went wrong");
      });
  }

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      showLastMessage();
    };
    if (socket.id) socket.on("conversation", onConversation);
    return () => {
      if (socket.id) socket.off("conversation", onConversation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = (event) => {
    if (event.key == "Enter" && event.target.value) {
      message.content = event.target.value;
      socket.emit("conversation", message);
      event.target.value = "";
    }
  };

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <MessageCircle color='white' />
          <Avatar name={name} />
          <BoxCenterHeader>{name}</BoxCenterHeader>
          <CloseCircleLink />
        </Wrappers.Header>
        <Wrappers.Body>
          {isLoading && (
            <div className='d-block m-0 p-0'>
              <Spinner />
            </div>
          )}
          {messages?.length > 0 &&
            messages.map((m, index) => (
              <div className='d-block m-0 p-0' id={m._id} key={index}>
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
                    name={m.sender.name}
                    id={m.sender._id}
                  />
                </div>
                <div className='d-inline'>{m.content}</div>
                <hr className='m-1 p-0' />
              </div>
            ))}
          <div id='endoflist' className='my-0' />
        </Wrappers.Body>
        <Wrappers.Footer>
          <input
            id='content'
            className='w-100'
            placeholder='Enter Message'
            type='text'
            onKeyDown={(event) => send(event)}
            style={{ fontSize: "16px" }}
            autoCorrect='off'
            autoCapitalize='none'
            autoComplete='off'
          />
        </Wrappers.Footer>
      </Wrappers.Modal>
    </>
  );
};

export default Messaging;
