import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createUserDocumentFromAuth,
  signInWithGithubPopup,
  signInWithGooglePopup,
  signInWithFacebook,
} from "../../utils/firebase.util";
import { useUser } from "../../context/userContext";

const SocialMedia = ({ text }) => {
  // user context
  const { setCurrentUser } = useUser();

  const SignInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const SignInWithGithub = async () => {
    try {
      await signInWithGithubPopup();
    } catch (err) {
      if (err.code === "auth/account-exists-with-different-credential") {
        alert("account exists with different credential");
      }
    }
  };

  const SignInWithFacebook = async () => {
    try {
      await signInWithFacebook();
    } catch (err) {
      if (err.code === "auth/account-exists-with-different-credential") {
        alert("account exists with different credential");
      }
    }
  };
  return (
    <div>
      <div className="py-3">Or {text} with social platforms</div>
      <div className="flex justify-center gap-5 text-2xl">
        <div
          className="cursor-pointer hover:text-primary-hover-color"
          onClick={SignInWithGoogle}
        >
          <FontAwesomeIcon icon="fa-brands fa-google" />
        </div>
        <div
          className="cursor-pointer hover:text-primary-hover-color"
          onClick={SignInWithFacebook}
        >
          <FontAwesomeIcon icon="fa-brands fa-facebook" />
        </div>
        <div
          className="cursor-pointer hover:text-primary-hover-color"
          onClick={SignInWithGithub}
        >
          <FontAwesomeIcon icon="fa-brands fa-github" />
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
