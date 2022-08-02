import FormInput from "../ui/formInput";
import SocialMedia from "./social-media";

const LoginForm = ({ type, mode }) => {
  let text;
  let btnText;
  let inputRender;
  let style;
  let changeStyle;

  if (type === "signin") {
    text = "Sign in";
    btnText = "login";
    if (mode === "signin") {
      style = "z-20";
    }
    if (mode === "signup") {
      style = "z-10 opacity-0";
    }
  }

  if (type === "signup") {
    text = "Sign up";
    btnText = "sign up";
    inputRender = <FormInput icon="fa-solid fa-user" type="text" />;
    if (mode === "signin") {
      style = "z-10 opacity-0";
    }
    if (mode === "signup") {
      style = "z-20";
    }
  }

  return (
    <form
      className={`col-start-1 col-end-2 row-start-1 row-start-2 flex flex-col items-center justify-center font-poppins ${style} ${changeStyle}`}
    >
      <div className="mb-3 text-4xl font-bold text-[#444]">{text}</div>
      <FormInput icon="fa-solid fa-envelope" type="email" />
      <FormInput icon="fa-solid fa-lock" type="password" />
      {inputRender}
      <button className="my-4 h-12 w-40 cursor-pointer rounded-3xl bg-primary-color font-semibold uppercase text-white outline-0 transition duration-500 hover:bg-primary-hover-color">
        {btnText}
      </button>
      <SocialMedia text={text} />
    </form>
  );
};

export default LoginForm;
