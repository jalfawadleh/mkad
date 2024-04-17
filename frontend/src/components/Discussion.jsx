import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import moment from "moment";

import Wrappers from "./common/Wrappers";
import { FaPlus } from "react-icons/fa";

import { UserContext } from "../store";
import { useParams } from "react-router-dom";
import {
  BoxCenterHeader,
  ActivityCircle,
  DiscusstionCircle,
  OrganisationCircle,
  CloseCircleLink,
  Avatar,
  AvatarLink,
} from "./common/Icons";

/**
 * Languages component.
 *
 * @param {Object} props.languages - languages object.
 * @param {Function} props.setParent - function to update parent object.
 * @param {Boolean} props.editing - editing object default false.
 *
 * @returns {React.ReactElement} languages element.
 */
const Discussion = () => {
  const { type, id, name } = useParams();
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);

  const URL = import.meta.env.PROD
    ? "https://demo.mkadifference.com/"
    : "http://localhost:3011/";

  const socket = io(URL, {
    autoConnect: true,
    extraHeaders: { authorization: user.token },
  });

  const message = {
    sender: { _id: user._id, type: user.type, name: user.name },
    recipient: { _id: id, type, name },
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
    socket.on("members", setMembers);
    return () => socket.off("members");
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

  const iconType = (
    <>
      {type == "organisation" && <OrganisationCircle />}
      {type == "activity" && <ActivityCircle />}
      {type == "member" && <Avatar name={name} />}
    </>
  );

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          {iconType}
          <DiscusstionCircle color='white' />
          <BoxCenterHeader>{name}</BoxCenterHeader>
          <CloseCircleLink />
        </Wrappers.Header>

        <div className='d-block mx-2 overflow-y-scroll'>
          <div className='d-inline mx-2'>{members.length}</div>
          <div className='d-inline mx-1'>Members</div>
          {members.map((m) => (
            <AvatarLink name={m.name} id={m._id} key={m._id} />
          ))}
          <hr className='border border-primary border-1 opacity-75 m-1' />
        </div>
        <Wrappers.Body>
          {messages?.length > 0 &&
            messages.map((message) => (
              <div className='d-block' id={message._id} key={message._id}>
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

        <div className='hstack gap-2 m-1' id='sendForm'>
          <input
            id='content'
            placeholder='Enter Message'
            // value={content}
            type='text'
            className='form-control form-control-sm'
            onKeyDown={(event) => event.key == "Enter" && send()}
          />
          <button
            type='submit'
            // disabled={!content}
            role='button'
            className='m-0 p-1 badge border-0 text-bg-primary'
            onClick={() => send()}
          >
            <FaPlus size={20} />
          </button>
        </div>
      </Wrappers.Modal>
    </>
  );
};

export default Discussion;
