import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import Wrappers from "./common/Wrappers";
import {
  Button,
  CloseCircleLink,
  InviteCircle,
  TextCenterBox,
} from "./common/Icons";

/**
 * Share component.
 *
 * @returns {React.ReactElement}
 */
const Invite = () => {
  const [link, setLink] = useState("");

  const getLink = async () => {
    await axios
      .get("/invites/invitelink")
      .then((res) => setLink(res.data))
      .catch(() => toast.error("Something went wrong"));
  };

  useEffect(() => {
    getLink();
  }, []);

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <InviteCircle />
          <TextCenterBox text={"Invite Link"} />
          <CloseCircleLink />
        </Wrappers.Header>
        <Wrappers.Body>
          <div className='d-flex justify-content-start'>
            <span onClick={() => navigator.clipboard.writeText(link)}>
              <Button>Copy Link</Button>
            </span>
          </div>
          <div className='d-block m-1 p-1'>{link}</div>
        </Wrappers.Body>
      </Wrappers.Modal>
    </>
  );
};

export default Invite;
