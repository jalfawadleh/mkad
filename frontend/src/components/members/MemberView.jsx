import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

import { Card, Col, Row, Button, Form, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Loader from "../utils/Loader.jsx";
import ListItems from "../common/ListItems.jsx";

function MemberView() {
  const { id } = useParams();

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

  return (
    <>
      <Row className='justify-content-center'>
        <Col
          xs={12}
          sm={8}
          lg={6}
          className='overflow-scroll'
          style={{ maxHeight: window.innerHeight - 100 }}
        >
          <Card>
            <Form>
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>

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
                        <Button
                          variant='success'
                          type='button'
                          className='w-100'
                        >
                          Close
                        </Button>
                      </Card.Link>
                    </LinkContainer>
                  </Col>
                </Row>
              </Card.Body>
            </Form>
          </Card>
        </Col>
      </Row>
      {isLoading && <Loader />}
    </>
  );
}

export default MemberView;
