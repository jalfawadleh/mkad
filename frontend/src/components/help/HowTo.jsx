import { LinkButtoneBack } from "../common/LinkItems.jsx";
import Wrappers, { SectionForm } from "../common/Wrappers.jsx";
import {
  AvatarCustomLink,
  CloseCircleLink,
  HelpCircle,
  HomeCircle,
  HomeCircleLink,
  TextCenterBox,
} from "../common/Icons.jsx";
import { useContext } from "react";
import { UserContext } from "../../store.js";

function HowTo() {
  const { user } = useContext(UserContext);
  return (
    <Wrappers.Modal>
      <Wrappers.Header>
        <HelpCircle />
        <TextCenterBox text='Help' />
        <CloseCircleLink />
      </Wrappers.Header>

      <Wrappers.Body>
        <SectionForm>
          <h4>To Update Profile details</h4>
          <div className='d-block'>
            click on <HomeCircleLink to='/' /> then on
            <AvatarCustomLink name={user.name} to='/profile' />
            then on Edit
          </div>
          <hr />

          <h4>To Update Account details</h4>
          <div className='d-block'>
            click on <HomeCircleLink to='/' /> then on
            <AvatarCustomLink name={user.name} to='/profile' />
            then on Account
          </div>
        </SectionForm>
      </Wrappers.Body>

      <Wrappers.Footer>
        <LinkButtoneBack />
      </Wrappers.Footer>
    </Wrappers.Modal>
  );
}

export default HowTo;
