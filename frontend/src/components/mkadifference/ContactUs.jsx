import { LinkButtoneBack } from "../common/LinkItems.jsx";
import Wrappers from "../common/Wrappers.jsx";
import {
  TextCenterBox,
  CloseCircleLink,
  HelpCircle,
} from "../common/Icons.jsx";

function ContactUs() {
  return (
    <Wrappers.Modal>
      <Wrappers.Header>
        <HelpCircle />
        <TextCenterBox text='Help' />
        <CloseCircleLink />
      </Wrappers.Header>

      <Wrappers.Body>
        <div className='m-1 p-1'>Contact us at mkadifference@proton.me</div>
      </Wrappers.Body>

      <Wrappers.Footer>
        <LinkButtoneBack />
      </Wrappers.Footer>
    </Wrappers.Modal>
  );
}

export default ContactUs;
