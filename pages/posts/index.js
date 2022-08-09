import { useState } from "react";
import FileCard from "../../components/files/fileCard";
import { fileUpload } from "../../utils/firebase.util";
import { getDownloadURL } from "firebase/storage";
import FileUploadContainer from "../../components/files/fileUploadContainer";

const NewPost = () => {
  const [formFields, setFormFields] = useState({
    title: "",
  });

  const [file, setFile] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileProgressStatus, setFileProgressStatus] = useState(null);

  const imageUploadHandler = (e) => {
    const file = e.target.files[0];
    const uploadTask = fileUpload(file.name, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadProgress(Math.floor(progress));

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            setFileProgressStatus("uploading");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileProgressStatus("uploaded");
          console.log("File available at", downloadURL);
        });
      }
    );
    setFile(file);
  };

  const formInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields((preValue) => ({ ...preValue, [name]: value }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  //console.log(fileProgress);
  //console.log(file);
  //console.log(formFields);
  //console.log(fileUploadProgress);

  return (
    <form
      className="mt-28 rounded-lg border px-48 font-poppins"
      onSubmit={formSubmitHandler}
    >
      <div>
        <div className="my-10 text-xl font-medium">Travel data</div>
        <div className="mb-5 flex w-3/4 flex-col">
          <div className="mb-5 flex w-3/4 flex-col">
            <label
              htmlFor="title"
              className="capitalize tracking-wide text-gray-700 after:ml-2 after:text-red-500 after:content-['＊']"
            >
              title
            </label>
            <input
              type="text"
              name="title"
              value={formFields.title}
              className="rounded-lg border p-3 text-[#333] outline-0"
              id="title"
              required
              onChange={formInputChangeHandler}
            />
          </div>
          <FileUploadContainer imageUploadHandler={imageUploadHandler} />
          {file && (
            <FileCard
              filename={file.name}
              status={fileProgressStatus}
              progress={`${fileUploadProgress}`}
              filesize={file.size}
            />
          )}
          <div className="mt-5 flex w-3/4 flex-col">
            <label
              htmlFor="destination"
              className="capitalize tracking-wide text-gray-700 after:ml-2 after:text-red-500 after:content-['＊']"
            >
              Destination Location
            </label>
            <input
              type="text"
              name="destination"
              className="rounded-lg border p-3 text-[#333] outline-0"
              id="destination"
              required
            />
          </div>
          <div className="mt-5 flex w-3/4 flex-col">
            <label
              htmlFor="departing"
              className="capitalize tracking-wide text-gray-700 after:ml-2 after:text-red-500 after:content-['＊']"
            >
              Departing Date
            </label>
            <input
              type="date"
              name="departing"
              className="rounded-lg border p-3 text-[#333] outline-0"
              id="departing"
              required
            />
          </div>
        </div>
      </div>
      <div className="w-full text-center">
        <button className="btn-primary btn-large">Save</button>
      </div>
      {/*<div className="text-xl font-medium">Lodging data</div>
      <div className="text-xl font-medium">Flight data</div>
      <div className="text-xl font-medium">Notes</div>*/}
    </form>
  );
};

export default NewPost;
