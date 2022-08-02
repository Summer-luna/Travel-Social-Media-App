import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialMedia = ({ text }) => {
  return (
    <div>
      <div className="py-3">Or {text} with social platforms</div>
      <div className="flex justify-center gap-5 text-2xl">
        <div className="cursor-pointer hover:text-primary-hover-color">
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
