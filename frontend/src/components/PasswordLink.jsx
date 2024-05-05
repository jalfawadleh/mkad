import Wrappers from "./common/Wrappers";
import { useParams } from "react-router-dom";
import {
  Button,
  CloseCircleLink,
  ShareCircle,
  TextCenterBox,
} from "./common/Icons";

/**
 * Share component.
 *
 * @returns {React.ReactElement}
 */
const PasswordLink = () => {
  const { id } = useParams();

  const passwordLink = "link -" + id;

  return (
    <>
      <Wrappers.Modal>
        <Wrappers.Header>
          <ShareCircle />
          <TextCenterBox text={"Reset Password Link"} />
          <CloseCircleLink />
        </Wrappers.Header>
        <Wrappers.Body>
          <div className='d-flex justify-content-around'>
            <div className='nav-item p-0 m-1 rounded-circle'>
              <span onClick={() => navigator.clipboard.writeText(passwordLink)}>
                <Button>Copy</Button>
              </span>
            </div>
          </div>
        </Wrappers.Body>
      </Wrappers.Modal>
    </>
  );
};

export default PasswordLink;
