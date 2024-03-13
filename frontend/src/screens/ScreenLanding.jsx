import { useEffect } from "react";
import PureCounter from "@srexi/purecounterjs";

import LandingLogin from "../components/landing/LandingLogin";
import LandingHeader from "../components/landing/LandingHeader";
import LandingAboutUs from "../components/landing/LandingAboutUs";
import LandingFAQ from "../components/landing/LandingFAQ";

const ScreenLanding = () => {
  useEffect(() => {
    new PureCounter();
  }, []);

  return (
    <>
      <LandingHeader />
      <LandingLogin />
      <LandingAboutUs />
      <LandingFAQ />
    </>
  );
};
export default ScreenLanding;
