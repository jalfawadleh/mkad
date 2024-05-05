import Wrappers from "./common/Wrappers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";

import {
  Button,
  CloseCircleLink,
  InviteCircle,
  TextCenterBox,
} from "./common/Icons";

/**
 * Password reset component
 *
 * @returns {React.ReactElement}
 */
const PasswordLink = () => {
  const { id } = useParams();
  const [link, setLink] = useState("");

  useEffect(() => {
    const getInviteLink = async () => {
      await axios
        .get("/invites/passwordlink/" + id)
        .then((res) =>
          setLink(
            res.data
              ? "https://mkadifference.com/resetpassword/" + res.data
              : ""
          )
        )
        .catch((error) => toast.error(error));
    };
    getInviteLink();
  }, [id]);

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <InviteCircle />
          <TextCenterBox text={"Reset Password Link"} />
          <CloseCircleLink />
        </Wrappers.Header>
        <Wrappers.Body>
          {link ? (
            <>
              <div className='d-flex justify-content-start'>
                <div onClick={() => navigator.clipboard.writeText(link)}>
                  <Button>Copy</Button>
                </div>
                <span className='my-auto py-auto'> the link and send it</span>
              </div>
              <div className='d-flex justify-content-between'>
                <div className='my-auto py-auto'>
                  Use the QR code directly is better.
                </div>

                <QRCode
                  height='300px'
                  width='300px'
                  value={link}
                  renderAs='canvas'
                />
              </div>
            </>
          ) : (
            "Something is wrong Please try again later."
          )}
        </Wrappers.Body>
      </Wrappers.Modal>
    </>
  );
};

export default PasswordLink;
