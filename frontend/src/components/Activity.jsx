import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import Loader from "./common/Loader.jsx";
import { Button, Card, Col, Modal, Row, Stack } from "react-bootstrap";

import ListItems from "./common/ListItems.jsx";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";
import { FaFlag } from "react-icons/fa";

const Activity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState({
    name: "",
    description: "",
    notes: [],
    languages: [],
    interests: [],
    helpOffered: [],
    helpNeeded: [],
    createdBy: [],
  });

  const {
    name,
    startOn,
    endOn,
    description,
    notes,
    languages,
    interests,
    helpOffered,
    helpNeeded,
    createdBy,
  } = activity;

  const [isLoading, setIsLoading] = useState(false);

  const getActivity = async (id) => {
    setIsLoading(true);
    try {
      await axios
        .get(`/activities/${id}`)
        .then((res) => setActivity(res.data))
        .then(() => setIsLoading(false));
    } catch (error) {
      error?.response?.data?.message &&
        toast.error(error?.response.data.message);
      error?.response?.status > 499 && toast.error("Something went wrong");
    }
  };

  const closeActivity = () => {
    navigate(-1);
  };

  useEffect(() => {
    getActivity(id);
  }, [id]);

  return (
    <>
      <Modal animation={false} show={true} onHide={closeActivity}>
        <Modal.Body>
          <Stack direction='horizontal' gap={1} className='p-0 m-1'>
            <div className='h3'>
              {name && <FaFlag />}
              <span className='m-0 ps-1'>{name}</span>
            </div>
            <div className='h4 ms-auto'>
              {createdBy?.name && (
                <LinkContainer to={"/member/" + createdBy?._id}>
                  <span role='button'>
                    <img
                      className='p-0 m-1'
                      height='35px'
                      width='35px'
                      src={
                        "https://api.multiavatar.com/" +
                        createdBy?.name +
                        ".png"
                      }
                      alt='Profile Photo'
                    />
                    <span className='m-0 ps-1'>{createdBy?.name}</span>
                  </span>
                </LinkContainer>
              )}
            </div>
          </Stack>

          <Stack direction='horizontal' gap={1} className='p-0 m-2'>
            <span className='p-0 '>Start:</span>
            <span className='ms-auto text-center'>
              <div>{moment(startOn).format("DD MMMM YYYY")}</div>
              <div>{moment(startOn).format("h:mm:ss a")}</div>
            </span>
            <span className='p-0 ms-auto'>End:</span>
            <span className='p-1 ms-auto text-center'>
              <div>{moment(endOn).format("MMMM DD YYYY")}</div>
              <div>{moment(endOn).format("h:mm:ss a")}</div>
            </span>
          </Stack>

          {description && <div className='p-2 mb-3 bold'>{description}</div>}

          <ListItems
            edit={false}
            message='Languages'
            type='languages'
            title='language'
            items={languages}
            setParent={setActivity}
          />

          <ListItems
            edit={false}
            message='Related Interests and hobbies'
            type='interests'
            title='interest'
            items={interests}
            setParent={setActivity}
          />

          <ListItems
            edit={false}
            message='Notes'
            type='notes'
            title='note'
            items={notes}
            setParent={setActivity}
          />

          <ListItems
            edit={false}
            message='Offering Help With'
            type='helpOffered'
            title='Help Offered'
            items={helpOffered}
            setParent={setActivity}
          />

          <ListItems
            edit={false}
            message='Need Help With'
            type='helpNeeded'
            title='Help Needed'
            items={helpNeeded}
            setParent={setActivity}
          />

          <Row>
            <Col className='text-center'>
              <LinkContainer to={".."}>
                <Card.Link>
                  <Button variant='success' type='button' className='w-100'>
                    Close
                  </Button>
                </Card.Link>
              </LinkContainer>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {isLoading && <Loader />}
    </>
  );
};

export default Activity;
