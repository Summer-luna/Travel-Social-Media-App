import SignInUpForm from "../../components/auth/signup-form";
import RightPanel from "../../components/auth/right-panel";
import { useState } from "react";
import LeftPanel from "../../components/auth/left-panel";
import SigninForm from "../../components/auth/signin-form";

const AuthenticationPage = () => {
  const [mode, setMode] = useState("signin");

  return (
    <div
      className={`
      content-gradient content-transition relative mt-20 flex h-[800px] w-full flex-col justify-center overflow-hidden
      before:absolute before:bottom-[65%] before:z-40 before:h-375 before:w-375
      lg:before:-top-[10%] lg:before:right-[48%] lg:before:h-500 lg:before:w-500 lg:before:-translate-y-1/2 
      ${
        mode === "signup"
          ? "before:-right-[30%] before:translate-y-[115%] lg:before:right-1/2 lg:before:translate-x-full"
          : "before:-right-[30%]"
      } 
      `}
    >
      <div
        className={`form-container-transition absolute z-30 grid h-full w-full grid-cols-1 items-end lg:top-1/2 lg:w-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:items-center ${
          mode === "signup"
            ? "bottom-[45%] lg:left-1/4"
            : "bottom-0 lg:left-3/4"
        }`}
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
