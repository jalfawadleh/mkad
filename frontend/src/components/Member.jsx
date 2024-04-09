import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import ManageName from "./common/ManageName.jsx";
import ManageDescription from "./common/ManageDescription.jsx";
import ManageLanguages from "./common/ManageLanguages.jsx";
import ManageInterests from "./common/ManageInterests.jsx";
import ManageHelp from "./common/ManageHelp.jsx";
import ManageHidden from "./common/ManageHidden.jsx";
import ManageLocation from "./common/ManageLocation.jsx";

import {
  AvatarMember,
  BoxCenterText,
  IconCircleClose,
  IconLoading,
  LinkButtoneBack,
} from "./common/LinkItems.jsx";
import Wrappers from "./common/Wrappers.jsx";

function Member() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [member, setMember] = useState({
    _id: id,
    name: "",
    description: "",
    languages: [],
    interests: [],
    helpOffered: [],
    helpNeeded: [],
  });

  useEffect(() => {
    async function getMember() {
      setIsLoading(true);
      await axios
        .get(`/members/${id}`)
        .then((res) => setMember(res.data))
        .then(() => setIsLoading(false))
        .catch((error) => {
          error?.response?.data?.message &&
            toast.error(error?.response.data.message);
          error?.response?.status > 499 && toast.error("Something went wrong");
        });
    }

    getMember();
  }, [id]);

  return (
    <>
      <Wrappers.Modal>
        {/* icon itemName closeButton */}
        <Wrappers.Header>
          <AvatarMember name={member.name} />
          <BoxCenterText text={member.name} />
          <IconCircleClose />
        </Wrappers.Header>

        <Wrappers.Body>
          <ManageName name={member.name} />
          <ManageDescription description={member.description} />
          <ManageLanguages languages={member.languages} />
          <ManageInterests interests={member.interests} />
          <ManageHelp help={member.help} />
          <ManageHidden hidden={member.hidden} />
          <ManageLocation location={member.location} />
          {isLoading && <IconLoading />}
        </Wrappers.Body>

        <Wrappers.Footer>
          <LinkButtoneBack />
        </Wrappers.Footer>
      </Wrappers.Modal>
    </>
  );
}

export default Member;
