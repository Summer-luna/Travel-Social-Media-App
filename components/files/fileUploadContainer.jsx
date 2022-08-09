import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FileUploadContainer = ({ imageUploadHandler }) => {
  return (
    <div className="mb-2 flex w-full flex-col">
      <label htmlFor="file" className="capitalize tracking-wide text-gray-700">
        cover photo
      </label>
      <div className="relative flex h-40 flex-col items-center justify-center border-2 border-dashed text-sm text-gray-500">
        <FontAwesomeIcon
          icon="fa-solid fa-image"
          size="3x"
          className="mb-3 text-primary-color"
        />
        <p className="mb-1">
          <span className="text-primary-color">Upload a file</span> or drag and
          drop
        </p>
        <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
        <input
          type="file"
          name="file"
          className="absolute h-full w-full rounded-lg p-3 text-[#333] opacity-0 outline-0 file:border-0 file:bg-transparent file:text-primary-color"
          id="file"
          onChange={imageUploadHandler}
        />
      </div>
    </div>
  );
};

export default FileUploadContainer;
