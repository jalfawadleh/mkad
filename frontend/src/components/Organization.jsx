import { useCallback, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getErrorMessage } from "../utils/http.js";

import { UserContext } from "../store.js";

import { IconButton } from "./common/LinkItems.jsx";
import Wrapper from "./common/Wrappers.jsx";

import ManageDescription from "./common/ManageDescription.jsx";
import ManageLanguages from "./common/ManageLanguages.jsx";
import ManageInterests from "./common/ManageInterests.jsx";
import ManageHelp from "./common/ManageHelp.jsx";
import {
  ActivityCircleLink,
  AvatarLink,
  CloseCircleLink,
  DiscusstionCircleLink,
  Loader,
  LocationCircleLink,
  MemberAddCircle,
  MessageCircleLink,
  OrganisationCircle,
  ShareCircleLink,
  TextCenterBox,
} from "./common/Icons.jsx";

const Organization = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isContact, setIsContact] = useState(false);

  const [organisation, setOrganisation] = useState({
    _id: id,
    name: "",
    description: "",
    notes: [],
    languages: [],
    interests: [],
    help: [],
    members: [],
    activities: [],
  });

  const getOrganisation = useCallback(async () => {
    setIsLoading(true);
    await axios
      .get(`/organisations/${id}`)
      .then((res) => {
        setOrganisation(res.data);
        res.data.members.map(
          (member) => member._id === user._id && setIsMember(member)
        );
        res.data.contacts.map((c) => {
          if (c._id === user._id) setIsContact(c);
        });
      })
      .then(() => setIsLoading(false))
      .catch((error) => toast.error(getErrorMessage(error)));
  }, [id, user._id]);

  const joinOrganisation = async () => {
    await axios
      .post("/organisations/join", { id })
      .then(() =>
        setIsMember({
          _id: "662c8211a67ce64e7e78c8b6",
          name: "claire",
          approved: false,
        })
      )
      .catch((error) => toast.error(getErrorMessage(error)));
  };

  useEffect(() => {
    getOrganisation();
  }, [getOrganisation]);

  const organisationActivities = (
    <>
      <div className='d-flex flex-wrap mx-2'>
        <div
          className='d-inline-flex my-auto mx-1 p-1 ps-3 text-center text-success border border-2 border-success rounded-pill rounded-end'
          style={{ width: 100 }}
        >
          Activities
        </div>

        {organisation.activities.map((a) => (
          <div className='d-inline-flex m-0 p-0' key={a._id}>
            <ActivityCircleLink to={"/activities/" + a._id} />
            <div className='d-inline-flex my-auto'>{a.name}</div>
          </div>
        ))}
      </div>
      <hr className='m-2' />
    </>
  );

  const membersJoined = (
    <>
      <div className='d-flex flex-wrap mx-2'>
        <div
          className='d-inline-flex my-auto mx-1 p-1 ps-3 text-center text-primary border border-2 border-primary rounded-pill rounded-end'
          style={{ width: 100 }}
        >
          Members
        </div>

        {!isMember
          ? organisation._id !== user._id && (
              <span onClick={() => joinOrganisation()}>
                <IconButton>Join</IconButton>
              </span>
            )
          : !isMember.approved && <IconButton>Pending Approval</IconButton>}

        {organisation.members?.map(
          (m) =>
            m.approved && (
              <div className='d-inline-flex m-0 p-0' key={m._id}>
                <AvatarLink name={m.name} to={"/members/" + m._id} />
              </div>
            )
        )}
      </div>
      <hr className='m-2' />
    </>
  );

  const postContact = async () => {
    const contact = { _id: organisation._id, name: organisation.name };
    await axios
      .post("/contacts", contact)
      .then(() => getOrganisation())
      .then(() => toast("Contact request sent"))
      .catch((error) => toast.error(getErrorMessage(error)));
  };

  const memberContact =
    organisation._id !== user._id &&
    (!isContact ? (
      <span onClick={() => postContact()}>
        <MemberAddCircle />
      </span>
    ) : (
      isContact.approved && (
        <MessageCircleLink
          to={`/messaging/${organisation._id}/${organisation.name}`}
        />
      )
    ));

  return (
    <>
      <Wrapper.Modal>
        <Wrapper.Header>
          <OrganisationCircle />
          <TextCenterBox text={organisation.name} />
          {memberContact}
          <DiscusstionCircleLink
            to={`/discussion/organisation/${organisation._id}/${organisation.name}`}
            color='white'
          />
          <LocationCircleLink lat={organisation.lat} lng={organisation.lng} />
          <ShareCircleLink to={`/share/organisation/${organisation._id}`} />
          <CloseCircleLink />
        </Wrapper.Header>
        {organisation.activities && organisationActivities}
        {membersJoined}
        <Wrapper.Body>
          <ManageDescription description={organisation.description} />
          <ManageLanguages languages={organisation.languages} />
          <ManageInterests interests={organisation.interests} />
          <ManageHelp help={organisation.help} />
          {isLoading && <Loader />}
        </Wrapper.Body>
      </Wrapper.Modal>
    </>
  );
};

export default Organization;
