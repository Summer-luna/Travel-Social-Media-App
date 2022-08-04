import SignInUpForm from "../../components/auth/signup-form";
import RightPanel from "../../components/auth/right-panel";
import { useState } from "react";
import LeftPanel from "../../components/auth/left-panel";
import SigninForm from "../../components/auth/signin-form";

const AuthenticationPage = () => {
  const [mode, setMode] = useState("signin");

  let beforeContentStyle;
  let formContainerStyle;

  if (mode === "signup") {
    beforeContentStyle =
      "lg:before:translate-x-full lg:before:right-1/2 before:translate-y-[115%] before:-right-[30%]";
    formContainerStyle = "lg:left-1/4 bottom-[45%]";
  }

  if (mode === "signin") {
    beforeContentStyle = "before:-right-[30%]";
    formContainerStyle = "lg:left-3/4 bottom-0";
  }

  return (
    <div
      className={`
      content-gradient content-transition relative mt-20 flex h-[800px] w-full flex-col justify-center overflow-hidden
      before:absolute before:bottom-[65%] before:z-40 before:h-375 before:w-375
      lg:before:-top-[10%] lg:before:right-[48%] lg:before:h-500 lg:before:w-500 lg:before:-translate-y-1/2 
      ${beforeContentStyle} 
      `}
    >
      <div
        className={`form-container-transition absolute z-30 grid h-full w-full grid-cols-1 items-end lg:top-1/2 lg:w-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:items-center ${formContainerStyle}`}
      >
        <SigninForm mode={mode} />
        <SignInUpForm mode={mode} />
      </div>
      <div className="absolute top-0 left-0 grid grid-rows-2 space-y-5 text-white lg:grid-cols-2">
        <LeftPanel setMode={setMode} mode={mode} />
        <RightPanel setMode={setMode} mode={mode} />
      </div>
    </div>
  );
};

export default AuthenticationPage;
