import LoginForm from "../../components/auth/login-form";
import SidePanel from "../../components/auth/side-panel";
import { useState } from "react";

const AuthenticationPage = () => {
  const [mode, setMode] = useState("signin");

  let beforeContentStyle;
  let formContainerStyle;

  if (mode === "signup") {
    beforeContentStyle =
      "lg:before:translate-x-full lg:before:right-1/2 before:translate-y-[115%] before:right-2/3";
    formContainerStyle = "lg:left-1/4 bottom-[45%]";
  }

  if (mode === "signin") {
    formContainerStyle = "lg:left-3/4 bottom-0";
  }

  return (
    <div
      className={`relative mt-20 flex h-[800px] w-full flex-col justify-center overflow-hidden before:absolute before:bottom-[65%] before:-left-2/3 before:z-40 before:h-[1500px] before:w-[1500px] before:rounded-full before:bg-primary-hover-color before:from-sky-500 before:to-indigo-500 before:content-[''] lg:before:-top-[10%] lg:before:right-[48%] lg:before:h-[2000px] lg:before:w-[2000px] lg:before:-translate-y-1/2 lg:before:bg-gradient-to-br ${beforeContentStyle} before:transition-all before:duration-[1800ms] before:ease-in-out`}
    >
      <div
        className={`transition- absolute z-30 grid h-full w-full grid-cols-1 items-end delay-700 duration-1000 ease-in-out lg:top-1/2 lg:w-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 ${formContainerStyle}`}
      >
        <LoginForm type="signin" mode={mode} />
        <LoginForm type="signup" mode={mode} />
      </div>
      <div className="absolute top-0 left-0 grid grid-rows-2 space-y-5 text-white lg:grid-cols-2">
        <SidePanel setMode={setMode} mode={mode} />
      </div>
    </div>
  );
};

export default AuthenticationPage;
