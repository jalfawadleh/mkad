import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

import Wrappers, { SectionForm } from "./common/Wrappers";
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

  const URL = import.meta.env.PROD
    ? "https://demo.mkadifference.com/"
    : "http://localhost:3011/";

  const socket = io(URL, {
    autoConnect: true,
    extraHeaders: { authorization: user.token },
  });

  useEffect(() => {
    // Connected, let's sign-up for to receive messages for this room
    socket.on("connect", () => socket.emit("join", type, id));

    socket.on("message", (message) =>
      setMessages((previous) => [...previous, message])
    );

    return () => socket.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = () => {
    const element = document.getElementById("content");
    const content = element.value;

    if (content) {
      const message = { content, name: user.name, _id: user._id };
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

        <Wrappers.Body>
          {messages?.length > 0 &&
            messages.map((m, index) => (
              <div className='d-block w100 m-1 p-0' key={index}>
                <AvatarLink name={m.name} id={m.memberId} />
                <div className='d-inline'>{m.name}</div>
                <div className='d-inline ms-1'>{m.content}</div>
              </div>
            ))}
        </Wrappers.Body>
        <Wrappers.Body>
          <SectionForm>
            <div className='hstack gap-2'>
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
          </SectionForm>
        </Wrappers.Body>
      </Wrappers.Modal>
    </>
  );
};

export default Discussion;
