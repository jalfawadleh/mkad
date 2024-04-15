import {
  TextCenterBox,
  IconCircleClose,
  IconCircleHelp,
  LinkButtoneBack,
} from "../common/LinkItems.jsx";
import Wrappers from "../common/Wrappers.jsx";

function Updates() {
  return (
    <Wrappers.Modal>
      <Wrappers.Header>
        <IconCircleHelp />
        <TextCenterBox text='Help' />
        <IconCircleClose />
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

export default Updates;
