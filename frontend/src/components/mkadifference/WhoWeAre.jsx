import Wrappers from "../common/Wrappers.jsx";
import {
  TextCenterBox,
  CloseCircleLink,
  HelpCircle,
} from "../common/Icons.jsx";
import AboutUs from "./AboutUs.jsx";

function WhoWeAre() {
  return (
    <Wrappers.Modal>
      <Wrappers.Header>
        <HelpCircle />
        <TextCenterBox text='MkADifference - Who We Are' />
        <CloseCircleLink />
      </Wrappers.Header>

      <Wrappers.Body>
        <AboutUs />
      </Wrappers.Body>
    </Wrappers.Modal>
  );
}

export default WhoWeAre;
