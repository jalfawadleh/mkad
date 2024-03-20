import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import { LinkContainer } from "react-router-bootstrap";
import { Card, Col, Row, Button, Modal, Stack } from "react-bootstrap";
import Loader from "./common/Loader.jsx";

import ListItems from "./common/ListItems.jsx";

function Member() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const { name, description, languages, interests, helpOffered, helpNeeded } =
    member;

  useEffect(() => {
    async function getMember() {
      setIsLoading(true);
      try {
        await axios.get(`/members/${id}`).then((res) => {
          setMember(res.data);
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
      <Modal animation={false} show={true} onHide={closeActivity}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center w-100'>
            <Stack direction='horizontal' gap={1}>
              <div className='h3'>
                {name && (
                  <img
                    className='p-0 m-1'
                    height='35px'
                    width='35px'
                    src={"https://api.multiavatar.com/" + name + ".png"}
                    alt='Profile Photo'
                  />
                )}
                <span className='m-0 ps-1'>{name}</span>
              </div>
            </Stack>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='p-2 mb-3'>{description}</div>
          <ListItems
            edit={false}
            message='Languages'
            type='languages'
            title='language'
            items={languages}
            setParent={setMember}
          />

          <ListItems
            edit={false}
            message='Interests and Hobbies'
            type='interests'
            title='interest'
            items={interests}
            setParent={setMember}
          />

          <ListItems
            edit={false}
            message='Offering Help With'
            type='helpOffered'
            title='Help Offered'
            items={helpOffered}
            setParent={setMember}
          />

          <ListItems
            edit={false}
            message='Need Help With'
            type='helpNeeded'
            title='Help Needed'
            items={helpNeeded}
            setParent={setMember}
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
}

export default Member;
