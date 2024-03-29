import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import { Modal } from "react-bootstrap";
import Loader from "./common/Loader.jsx";

import ListItems from "./common/ListItems.jsx";
import {
  AvatarMember,
  BoxCenterText,
  IconCircleClose,
  LinkButtoneBack,
} from "./common/LinkItems.jsx";

function Member() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const { name, description, languages, interests, helpOffered, helpNeeded } =
    item;

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

  const closeActivity = () => {
    navigate(-1);
  };

  return (
    <>
      <Modal show={!isLoading} onHide={closeActivity} centered>
        <div className='bg-black p-1'>
          {/* icon itemName closeButton */}
          <div className='d-flex justify-content-between m-1 p-1'>
            <AvatarMember name={name} />
            <BoxCenterText text={name} />
            <IconCircleClose />
          </div>
          <hr className='my-1' />

          {description && (
            <>
              <div className='d-flex justify-content-wrap p-2 m-1'>
                {description}
              </div>
              <hr className='m-1' />
            </>
          )}

          <ListItems
            message='Interests'
            type='interests'
            title='interest'
            items={interests}
            setParent={setItem}
          />

          <ListItems
            message='Offer'
            type='helpOffered'
            title='Help Offered'
            items={helpOffered}
            setParent={setItem}
          />
          <ListItems
            message='Want'
            type='helpNeeded'
            title='Help Needed'
            items={helpNeeded}
            setParent={setItem}
          />

          <ListItems
            message='Languages'
            type='languages'
            title='language'
            items={languages}
            setParent={setItem}
          />

          <div className='d-flex justify-content-between m-1 p-1'>
            <LinkButtoneBack />
          </div>
          {isLoading && <Loader />}
        </div>
      </Modal>
    </>
  );
}

export default Member;
