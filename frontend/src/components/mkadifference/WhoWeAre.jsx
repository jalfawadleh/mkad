import { TextCenterBox, LinkButtoneBack } from "../common/LinkItems.jsx";
import Wrappers from "../common/Wrappers.jsx";
import { CloseCircleLink, HelpCircle } from "../common/Icons.jsx";

function WhoWeAre() {
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

export default WhoWeAre;
