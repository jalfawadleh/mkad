import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";
import Loader from "../utils/Loader.jsx";

import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import ListItems from "../common/ListItems.jsx";

const ActivityView = () => {
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
        <Modal.Header closeButton>
          <Modal.Title className='text-center w-100'>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='p-2 mb-3 bold'>Created By: {createdBy?.name}</div>
          <div>Show on the map</div>
          <div className='p-2 mb-3'>{description}</div>

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
            message='Related Interests and hobbies'
            type='interests'
            title='interest'
            items={interests}
            setParent={setActivity}
          />
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
            message='Help Offered'
            type='helpOffered'
            title='Help Offered'
            items={helpOffered}
            setParent={setActivity}
          />
          <ListItems
            edit={false}
            message='Help Needed'
            type='helpNeeded'
            title='Help Needed'
            items={helpNeeded}
            setParent={setActivity}
          />

          <Row>
            <Col className='text-center'>
              <Card.Link>
                <Button
                  variant='success'
                  type='button'
                  className='w-100'
                  onClick={closeActivity}
                >
                  Close
                </Button>
              </Card.Link>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      {isLoading && <Loader />}
    </>
  );
};

export default ActivityView;
