import { LinkButtoneBack } from "../common/LinkItems.jsx";
import Wrappers, { SectionForm } from "../common/Wrappers.jsx";
import {
  AvatarCustomLink,
  CloseCircleLink,
  HelpCircle,
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
          <div className='d-inline-block m-2 text-primary'>
            Profile location is the map starting point
          </div>
          <hr />
          <div className='d-inline-block m-2 text-primary'>
            To Update profile details
          </div>
          <div className='d-inline-block m-1'>
            Name, Discription, Languages, Interests, Help Offered, help needed,
            Darkmode, Hide profile, Location
          </div>
          <div className='d-inline-block m-2'>
            <HomeCircleLink to='/' /> ={">"}
            <AvatarCustomLink name={user.name} to='/profile' />={">"}
            <div className='mx-1 p-2 d-inline border border-primary rounded-pill'>
              Edit
            </div>
          </div>
          <hr />
          <div className='d-inline-block m-2 text-primary'>
            To update Username, Password
          </div>

          <div className='d-inline-block'>
            <HomeCircleLink to='/' /> ={">"}
            <AvatarCustomLink name={user.name} to='/profile' />={">"}
            <div className='mx-1 p-2 d-inline border border-primary rounded-pill'>
              Account
            </div>
          </div>
          <hr />
        </SectionForm>
      </Wrappers.Body>

      <Wrappers.Footer>
        <LinkButtoneBack />
      </Wrappers.Footer>
    </Wrappers.Modal>
  );
}

export default HowTo;
