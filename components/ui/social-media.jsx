import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase.util";

const SignInWithGoogle = async () => {
  const { user } = await signInWithGooglePopup();
  try {
    await createUserDocumentFromAuth(user);
  } catch (err) {
    console.log("error:" + err);
  }
};

const SocialMedia = ({ text }) => {
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
        <div className="cursor-pointer hover:text-primary-hover-color">
          <FontAwesomeIcon icon="fa-brands fa-facebook" />
        </div>
        <div className="cursor-pointer hover:text-primary-hover-color">
          <FontAwesomeIcon icon="fa-brands fa-github" />
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
