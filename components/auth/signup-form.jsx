import FormInput from "../ui/formInput";
import SocialMedia from "../ui/social-media";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase.util";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";

const SignInUpForm = ({ mode }) => {
  const defaultFormFields = {
    username: "",
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { setCurrentUser } = useUser();
  const router = useRouter();

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

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, {
        displayName: username,
      });
      await router.push("/");
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          alert("Email already in use");
          break;
        case "auth/weak-password":
          alert("Password should be at least 6 characters");
          break;
        default:
          console.log("error:" + err);
      }
    }
  };

  return (
    <form
      className={`col-start-1 col-end-2 row-start-1 row-start-2 flex flex-col items-center justify-center font-poppins ${
        mode === "signup" ? "z-20" : "z-10 opacity-0"
      }`}
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
