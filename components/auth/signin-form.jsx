import FormInput from "../ui/formInput";
import SocialMedia from "../ui/social-media";

const SigninForm = ({ mode }) => {
  let style = mode === "signin" ? "z-20" : "z-10 opacity-0";

  return (
    <form
      className={`col-start-1 col-end-2 row-start-1 row-start-2 flex flex-col items-center justify-center font-poppins ${style}`}
    >
      <div className="mb-3 text-4xl font-bold text-[#444]">Sign in</div>
      <FormInput icon="fa-solid fa-envelope" type="email" />
      <FormInput icon="fa-solid fa-lock" type="password" />
      <button className="btn-primary btn-large my-4">login</button>
      <SocialMedia text="Sign in" />
    </form>
  );
};

export default SigninForm;
