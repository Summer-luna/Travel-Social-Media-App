import FormInput from "../ui/formInput";
import SocialMedia from "../ui/social-media";
import { SignInWithEmailAndPassword } from "../../utils/firebase.util";
import { useState } from "react";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";

const SigninForm = ({ mode }) => {
  const defaultFormFields = {
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { setCurrentUser } = useUser();
  const router = useRouter();

  const cleanFormField = () => {
    setFormFields(defaultFormFields);
  };

  const formInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // sign in with email and password
  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formFields;
    try {
      await SignInWithEmailAndPassword(email, password);
      cleanFormField();
      await router.push("/");
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("User password is incorrect.");
          break;
        case "auth/user-not-found":
          alert("User email is not found.");
          break;
        default:
          console.log(err);
      }
    }
  };

  return (
    <form
      className={`col-start-1 col-end-2 row-start-1 row-start-2 flex flex-col items-center justify-center font-poppins ${
        mode === "signin" ? "z-20" : "z-10 opacity-0"
      }`}
      onSubmit={submitHandler}
    >
      <div className="mb-3 text-4xl font-bold text-[#444]">Sign in</div>
      <FormInput
        icon="fa-solid fa-envelope"
        type="email"
        formInputChangeHandler={formInputChangeHandler}
        value={formFields.email}
      />
      <FormInput
        icon="fa-solid fa-lock"
        type="password"
        formInputChangeHandler={formInputChangeHandler}
        value={formFields.password}
      />
      <button className="btn-primary btn-large my-4">login</button>
      <SocialMedia text="Sign in" />
    </form>
  );
};

export default SigninForm;
