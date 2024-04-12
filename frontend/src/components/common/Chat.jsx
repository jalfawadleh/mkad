import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

import multiavatar from "@multiavatar/multiavatar/esm";

import Wrappers, { SectionForm } from "./Wrappers";
import { FaPlus } from "react-icons/fa";

import { UserContext } from "../../store";
import { Link } from "react-router-dom";

/**
 * Languages component.
 *
 * @param {Object} props.languages - languages object.
 * @param {Function} props.setParent - function to update parent object.
 * @param {Boolean} props.editing - editing object default false.
 *
 * @returns {React.ReactElement} languages element.
 */
const Chat = ({ type = [], id = "" }) => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  const URL = "http://localhost:3001";
  const socket = io(URL, {
    autoConnect: true,
    extraHeaders: {
      authorization: user.token,
    },
  });

  socket.on("message", (msg) => console.log(msg));
  socket.on("disconnect", (reason) => {
    console.log(`disconnected due to ${reason}`);
  });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  const send = () => {
    const element = document.getElementById("content");
    const content = element.value;
    if (content) {
      setMessages((previous) => [
        ...previous,
        { content, name: user.name, memberId: user._id },
      ]);
      socket.emit("message", content);
      element.value = "";
    }
  };

  const LinkAvatarMember = ({ item }) => {
    return (
      <Link
        className='link-underline link-underline-opacity-0 p-0 m-1'
        to={"/member/" + item._id}
      >
        <img
          className='p-0 m-0'
          width={28}
          height={28}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            multiavatar(item.name)
          )}`}
        />
      </Link>
    );
  };

  return (
    <>
      <Wrappers.Body>
        {messages?.length > 0 &&
          messages.map((m, index) => (
            <div className='d-block w100 m-1 p-1' key={index}>
              <LinkAvatarMember item={{ name: m.name, _id: m.memberId }} />
              <div className='d-inline'>{m.content}</div>
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
    </>
  );
};

export default Chat;
