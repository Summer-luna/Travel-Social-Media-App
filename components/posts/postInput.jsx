import { IoBed } from "react-icons/io5";
import { capitalize } from "lodash/string";
import { MdFlight } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa";

const PostInput = ({ keyPressHandler, iconName, name, placeholder }) => {
  const getIconByName = (iconName) => {
    switch (iconName) {
      case "IoBed":
        return <IoBed className="text-xl text-form-icon-color" />;
      case "MdFlight":
        return <MdFlight className="text-xl text-form-icon-color" />;
      case "FaSuitcase":
        return <FaSuitcase className="text-xl text-form-icon-color" />;
      default:
        return;
    }
  };

  const icon = getIconByName(iconName);

  return (
    <div
      className="my-2.5 mr-5 grid h-14 w-full max-w-sm grid-cols-8 items-center rounded-[55px] bg-form-input-color px-2"
      onKeyUp={keyPressHandler}
    >
      <span className="col-span-1 ml-3 text-center">{icon}</span>
      <input
        type="text"
        name={name}
        placeholder={capitalize(`${placeholder}`)}
        className="placeholder: color-[#aaa] col-span-6 w-full border-0 bg-transparent font-semibold leading-4 text-[#333] outline-0 placeholder:font-medium"
      />
    </div>
  );
};

export default PostInput;
