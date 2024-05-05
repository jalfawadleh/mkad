import Wrappers from "./common/Wrappers";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";
import {
  Button,
  CloseCircleLink,
  ShareCircle,
  TextCenterBox,
} from "./common/Icons";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

/**
 * Share component.
 *
 * @returns {React.ReactElement}
 */
const Share = () => {
  const { type, id } = useParams();

  const shareUrl = `https://demo.mkadifference.com/${
    type == "activity" ? "activities" : type + "s"
  }/${id}`;
  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <ShareCircle />
          <TextCenterBox text={"Share"} />
          <CloseCircleLink />
        </Wrappers.Header>
        <Wrappers.Body>
          <div className='d-flex justify-content-around p-2 mb-2 border-primary border-bottom'>
            <div
              className='nav-item p-0 m-1 rounded-pill'
              // style={{ boxShadow: "0 0 5px 5px aqua" }}
            >
              <TwitterShareButton
                url={shareUrl}
                quote={"MKaDifference "}
                hashtag={"#MKaDifference"}
              >
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
            </div>

            <div className='nav-item p-0 m-1 rounded-pill'>
              <RedditShareButton
                url={shareUrl}
                quote={"MKaDifference "}
                hashtag={"#MKaDifference"}
              >
                <RedditIcon size={40} round={true} />
              </RedditShareButton>
            </div>

            <div className='nav-item p-0 m-1 rounded-pill'>
              <LinkedinShareButton
                url={shareUrl}
                quote={"MKaDifference "}
                hashtag={"#MKaDifference"}
              >
                <LinkedinIcon size={40} round={true} />
              </LinkedinShareButton>
            </div>

            <div className='nav-item p-0 m-1 rounded-pill'>
              <FacebookShareButton
                url={shareUrl}
                quote={"MKaDifference "}
                hashtag={"#MKaDifference"}
              >
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
            </div>

            <div className='nav-item p-0 m-1 rounded-pill'>
              <EmailShareButton
                url={shareUrl}
                quote={"MKaDifference "}
                hashtag={"#MKaDifference"}
              >
                <EmailIcon size={40} round={true} />
              </EmailShareButton>
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            <div
              className='d-inline p-auto m-auto'
              onClick={() => navigator.clipboard.writeText(shareUrl)}
            >
              <Button>Copy</Button>
            </div>
            <div className='d-inline p-auto m-auto'>
              Or use the QR code directly
            </div>
            <div className='p-auto m-2'>
              <QRCode value={shareUrl} renderAs='canvas' />
            </div>
          </div>
        </Wrappers.Body>
      </Wrappers.Modal>
    </>
  );
};

export default Share;
