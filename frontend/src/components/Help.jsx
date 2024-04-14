import {
  BoxCenterText,
  IconCircleClose,
  IconCircleHelp,
  LinkButtoneBack,
} from "./common/LinkItems";
import Wrappers from "./common/Wrappers.jsx";

function Help() {
  return (
    <Wrappers.Modal>
      <Wrappers.Header>
        <IconCircleHelp />
        <BoxCenterText text='Help' />
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

export default Help;
