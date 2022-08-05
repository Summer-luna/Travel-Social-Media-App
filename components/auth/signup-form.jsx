import FormInput from "../ui/formInput";
import SocialMedia from "../ui/social-media";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  SignUpWithEmailAndPassword,
} from "../../utils/firebase.util";
import Router from "next/router";

const SignInUpForm = ({ mode }) => {
  let style = mode === "signup" ? "z-20" : "z-10 opacity-0";

  const defaultFormFields = {
    username: "",
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);

  const formInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const { username, email, password } = formFields;
    const { user } = await createAuthUserWithEmailAndPassword(email, password);
    try {
      await createUserDocumentFromAuth(user, { displayName: username });
    } catch (err) {
      console.log("error:" + err);
    }
    await Router.push("/");
  };

  return (
    <form
      className={`col-start-1 col-end-2 row-start-1 row-start-2 flex flex-col items-center justify-center font-poppins ${style}`}
      onSubmit={formSubmitHandler}
    >
      <div className="mb-3 text-4xl font-bold text-[#444]">Sign up</div>
      <FormInput
        icon="fa-solid fa-user"
        type="username"
        formInputChangeHandler={formInputChangeHandler}
        value={formFields.username}
      />
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
      <button className="btn-primary btn-large my-4">Sign up</button>
      <SocialMedia text="Sign up" />
    </form>
  );
};

export default SignInUpForm;
