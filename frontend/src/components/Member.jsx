import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

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

  const [item, setItem] = useState({
    _id: id,
    name: "",
    description: "",
    languages: [],
    interests: [],
    helpOffered: [],
    helpNeeded: [],
  });

  const { name, description } = item;

  useEffect(() => {
    async function getMember() {
      setIsLoading(true);
      try {
        await axios.get(`/members/${id}`).then((res) => {
          setItem(res.data);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        error?.response?.data?.message &&
          toast.error(error?.response.data.message);
        error?.response?.status > 499 && toast.error("Something went wrong");
      }
    }
    getMember();
  }, [id]);

  return (
    <>
      <Wrappers.Modal>
        {/* icon itemName closeButton */}
        <Wrappers.Header>
          <AvatarMember name={name} />
          <BoxCenterText text={name} />
          <IconCircleClose />
        </Wrappers.Header>

        <Wrappers.Body>
          {description && (
            <>
              <div className='d-flex justify-content-wrap p-2 m-1'>
                {description}
              </div>
              <hr className='m-1' />
            </>
          )}

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
