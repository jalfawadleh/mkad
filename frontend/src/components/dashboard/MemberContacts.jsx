import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Bar } from "../common/Wrappers";
import {
  AvatarLink,
  Empty,
  ExclamationCircle,
  MemberApproveCircle,
  MemberCircle,
  MemberDeleteCircle,
  MessageCircleLink,
  TextCenterBox,
  TextCenterLink,
} from "../common/Icons";

const MemberContacts = () => {
  const [contacts, setContacts] = useState([]);

  const approveContact = async (id) => {
    await axios
      .post("/contacts/approve", { id })
      .then(() => getContacts())
      .catch(() => toast.error("Something went wrong"));
  };

  const deleteContact = async (id) => {
    await axios
      .delete("/contacts/" + id)
      .then(() => getContacts())
      .catch(() => toast.error("Something went wrong"));
  };

  const getContacts = async () => {
    await axios
      .get("/contacts")
      .then((res) => setContacts(res.data))
      .catch(() => toast.error("Something went wrong"));
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <div className='my-2' />
      <Bar>
        <MemberCircle />
        <TextCenterBox text='Contacts' />
        <Empty />
      </Bar>

      {contacts.length ? (
        contacts.map((contact) => (
          <Bar key={contact._id}>
            <AvatarLink to={"/members/" + contact._id} name={contact.name} />
            <TextCenterLink to={contact._id} text={contact.name} />
            <span onClick={() => deleteContact(contact._id)}>
              <MemberDeleteCircle />
            </span>
            {contact.approved ? (
              <MessageCircleLink
                to={`/messaging/${contact._id}/${contact.name}`}
              />
            ) : (
              !contact.requested && (
                <span onClick={() => approveContact(contact._id)}>
                  <MemberApproveCircle />
                </span>
              )
            )}
          </Bar>
        ))
      ) : (
        <Bar>
          <ExclamationCircle color='white' />
          <span className='p-auto m-auto'>No Contacts Added</span>
        </Bar>
      )}

      <Outlet />
    </>
  );
};

export default MemberContacts;
