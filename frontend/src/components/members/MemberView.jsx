import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import { LinkContainer } from "react-router-bootstrap";
import { Card, Col, Row, Button, Modal } from "react-bootstrap";
import Loader from "../common/Loader.jsx";

import ListItems from "../common/ListItems.jsx";

function MemberView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [member, setMember] = useState({
    _id: id,
    name: "",
    description: "",
    languages: [],
    help: [],
    interests: [],
  });

  const { name, description, languages, help, interests } = member;

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
          <Modal.Title className='text-center w-100'>{name}</Modal.Title>
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
            message='Help offered or needed '
            type='help'
            title='Help'
            items={help}
            setParent={setMember}
          />

          <ListItems
            edit={false}
            message='Related interests and hobbies'
            type='interests'
            title='interest'
            items={interests}
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

export default MemberView;
