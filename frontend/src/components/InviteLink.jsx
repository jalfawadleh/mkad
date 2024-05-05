import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import QRCode from "qrcode.react";

import Wrappers from "./common/Wrappers";
import {
  Button,
  CloseCircleLink,
  InviteCircle,
  TextCenterBox,
} from "./common/Icons";

/**
 * Invitation component.
 *
 * @returns {React.ReactElement}
 */
const InviteLink = () => {
  const [link, setLink] = useState("");

  useEffect(() => {
    const getLink = async () => {
      await axios
        .get("/invites/invitelink")
        .then((res) =>
          setLink(
            res.data ? "https://demo.mkadifference.com/join/" + res.data : ""
          )
        )
        .catch((error) => toast.error(error));
    };
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
            ""
          )}
        </Wrappers.Body>
      </Wrappers.Modal>
    </>
  );
};

export default InviteLink;
