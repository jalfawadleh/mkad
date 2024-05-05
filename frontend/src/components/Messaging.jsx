import { useContext, useEffect, useState } from "react";
import moment from "moment";

import Wrappers from "./common/Wrappers";

import { UserContext } from "../store";
import { useNavigate, useParams } from "react-router-dom";
import {
  MessageCircle,
  CloseCircleLink,
  Avatar,
  AvatarLink,
  Spinner,
  TextCenterBox,
  LocationCircleLink,
} from "./common/Icons";
import axios from "axios";
import { toast } from "react-toastify";

/**
 * Conversation component.
 *
 * @returns {React.ReactElement} languages element.
 */
const Messaging = () => {
  const { id, name } = useParams();
  const { user, socket } = useContext(UserContext);

  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const navigate = useNavigate();

  const message = {
    sender: { _id: user._id, name: user.name, type: "member" },
    recipient: { _id: id, name, type: "member" },
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

  const getMember = async () => {
    await axios
      .get(`/members/${id}`)
      .then((res) => {
        setMember(res.data);
        if (!res.data.contacts.find((c) => c._id == user._id)) {
          toast.error("Not a contact");
          navigate("/");
        }
      })
      .catch((error) => toast.error(error));
  };

  async function getMessages() {
    setIsLoading(true);
    await axios
      .post(`/messages`, { _id: id, skip: messages.length })
      .then((res) => setMessages((previous) => [...res.data, ...previous]))
      .then(() => {
        if (messages.length < 10) showLastMessage();
      })
      .then(() => setIsLoading(false))
      .catch((error) => toast.error(error));
  }

  useEffect(() => {
    getMember();
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = (e) => {
    if (e.target.scrollTop === 0) getMessages();
  };

  // member join coversation when online
  useEffect(() => {
    if (socket.id) {
      message.content = "join";
      socket.emit("joinMessaging", message);
    } else navigate("/");
    return () => {
      message.content = "leave";
      if (socket.id) socket.emit("leaveMessaging", message);
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
          <MessageCircle />
          <Avatar name={member.name} />
          <TextCenterBox text={member.name} />
          <LocationCircleLink location={member.location} />
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

export default Messaging;
