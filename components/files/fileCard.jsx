import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import prettyBytes from "pretty-bytes";

const FileCard = ({ filename, filesize, status, progress }) => {
  console.log(progress);
  return (
    <div className="mt-2 flex h-16 w-full flex-row space-x-5 rounded-md bg-indigo-100 p-4">
      <div className="text-center">
        <FontAwesomeIcon
          icon="fa-solid fa-file-lines"
          size="2x"
          className="text-primary-color"
        />
      </div>
      <div className="flex w-full flex-col">
        <div className="mb-1 flex items-center justify-between text-sm">
          <div>
            {filename} • {status}
          </div>
          {status === "uploading" ? (
            <div>{`${progress}%`}</div>
          ) : (
            <FontAwesomeIcon
              icon="fa-solid fa-check"
              className="text-primary-color"
              size="lg"
            />
          )}
        </div>
        {status === "uploading" ? (
          <div className="h-2 w-full rounded-lg bg-white">
            <div
              className={`h-full rounded-lg bg-primary-color`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        ) : (
          <div className="text-[10px] tracking-wider">
            {filesize && prettyBytes(filesize)}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileCard;
