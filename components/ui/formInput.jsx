import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize } from "lodash/string";

const FormInput = ({ icon, type }) => {
  return (
    <div className="my-2.5 grid h-14 w-full max-w-sm grid-cols-8 items-center rounded-[55px] bg-form-input-color px-2">
      <span className="col-span-1 text-center">
        <FontAwesomeIcon icon={icon} className="text-lg text-form-icon-color" />
      </span>
      <input
        type={type}
        name={type}
        placeholder={capitalize(type)}
        className="placeholder: color-[#aaa] col-span-7 w-full border-0 bg-transparent font-semibold leading-4 text-[#333] outline-0 placeholder:font-medium"
        required
      />
    </div>
  );
};

export default FormInput;
