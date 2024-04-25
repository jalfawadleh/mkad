import Wrappers from "./common/Wrappers";
import { useParams } from "react-router-dom";
import { CloseCircleLink, TextCenterBox } from "./common/Icons";

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

  const shareUrl =
    "https://demo.mkadifference.com/" + type === "member"
      ? "members"
      : type === "organisation"
      ? "organisations"
      : "events" + id;
  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <TextCenterBox text={"Share to invite people"} />
          <CloseCircleLink />
        </Wrappers.Header>
        <Wrappers.Body>
          <div className='d-flex justify-content-around'>
            <div
              className='nav-item p-0 m-1 rounded-pill'
              // style={{ boxShadow: "0 0 5px 5px aqua" }}
            >
              <TwitterShareButton
                url={shareUrl}
                quote={"MKaDifference " + name}
                hashtag={"#MKaDifference"}
              >
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
            </div>

            <div className='nav-item p-0 m-1 rounded-pill'>
              <RedditShareButton
                url={shareUrl}
                quote={"MKaDifference " + name}
                hashtag={"#MKaDifference"}
              >
                <RedditIcon size={40} round={true} />
              </RedditShareButton>
            </div>

            <div className='nav-item p-0 m-1 rounded-pill'>
              <LinkedinShareButton
                url={shareUrl}
                quote={"MKaDifference " + name}
                hashtag={"#MKaDifference"}
              >
                <LinkedinIcon size={40} round={true} />
              </LinkedinShareButton>
            </div>

            <div className='nav-item p-0 m-1 rounded-pill'>
              <FacebookShareButton
                url={shareUrl}
                quote={"MKaDifference " + name}
                hashtag={"#MKaDifference"}
              >
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
            </div>

            <div className='nav-item p-0 m-1 rounded-pill'>
              <EmailShareButton
                url={shareUrl}
                quote={"MKaDifference " + name}
                hashtag={"#MKaDifference"}
              >
                <EmailIcon size={40} round={true} />
              </EmailShareButton>
            </div>
          </div>
        </Wrappers.Body>
      </Wrappers.Modal>
    </>
  );
};

export default Share;
