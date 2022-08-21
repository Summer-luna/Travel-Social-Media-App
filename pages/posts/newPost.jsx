import { useState, useEffect } from "react";
import FileCard from "../../components/files/fileCard";
import { createPostsDocument, fileUpload } from "../../utils/firebase.util";
import { getDownloadURL } from "firebase/storage";
import FileUploadContainer from "../../components/files/fileUploadContainer";
import axios from "axios";
import SearchResultCard from "../../components/files/searchResultCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";

const NewPost = () => {
  const [formFields, setFormFields] = useState({
    title: "",
    destination: "",
    destinationCoordinates: {},
    departing: "",
    postStatus: "",
    image: "",
  });

  const [searchResults, setSearchResults] = useState(null);
  const [search, setSearch] = useState(true);
  const [file, setFile] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileProgressStatus, setFileProgressStatus] = useState(null);

  const { currentUser } = useUser();
  const router = useRouter();

  // making request to search city, state
  useEffect(() => {
    const timeId =
      search &&
      setTimeout(() => {
        formFields.destination &&
          axios
            .post("/api/search", { destination: formFields.destination })
            .then((res) => setSearchResults(res.data.searchResults));
      }, 1000);

    return () => clearTimeout(timeId);
  }, [formFields.destination]);

  useEffect(() => {
    getUnsplashPicture();
  }, [formFields.destination]);

  const getUnsplashPicture = async () => {
    // if user not upload image, pull random one from unsplash
    if (formFields.image === "" && formFields.destination !== "") {
      const res = await axios.post("/api/searchPicture", {
        searchTerm: formFields.destination,
      });
      setFormFields((prevState) => {
        return {
          ...prevState,
          image: res.data,
        };
      });
    }
  };

  // display search results
  const renderContent =
    searchResults &&
    searchResults.map((searchResult) => {
      if (searchResults.indexOf(searchResult) === searchResults.length - 1) {
        return (
          <SearchResultCard
            key={searchResult.id}
            searchResult={searchResult}
            style="rounded-b-lg"
          />
        );
      }
      return (
        <SearchResultCard key={searchResult.id} searchResult={searchResult} />
      );
    });

  // get form input data
  const formInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setSearch(true);
    setFormFields((preValue) => ({ ...preValue, [name]: value }));
  };

  const destinationSelectedHandler = (e) => {
    setSearch(false);
    const searchResult = searchResults.filter((result) => {
      return result.id === e.target.id;
    });
    console.log(searchResult[0]);
    setFormFields((prevState) => {
      return {
        ...prevState,
        destination: e.target.textContent,
        destinationCoordinates: searchResult[0].coordinates,
      };
    });
    setSearchResults(null);
  };

  // upload image to firebase
  const imageUploadHandler = (e) => {
    const file = e.target.files[0];
    console.log(e.target);
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
          setFormFields((prevState) => {
            return {
              ...prevState,
              image: downloadURL,
            };
          });
          console.log("File available at", downloadURL);
        });
      }
    );
    setFile(file);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await createPostsDocument(currentUser, formFields);
      await router.push("/posts");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="mt-28 rounded-lg border px-48 font-poppins"
      onSubmit={formSubmitHandler}
    >
      <div>
        <div className="my-10 text-xl font-medium">Travel data</div>
        <div className="mb-5 flex w-3/4 flex-col">
          <div className="mb-5 flex w-3/4 flex-col">
            <label htmlFor="title" className="input-label">
              title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formFields.title}
              className="input-field"
              required
              onChange={formInputChangeHandler}
            />
          </div>
          <div className="my-5 w-3/4">
            <div className=" flex flex-col">
              <label htmlFor="destination" className="input-label">
                Destination Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formFields.destination}
                  name="destination"
                  id="destination"
                  className={`input-field ${
                    !formFields.destination && "rounded-lg"
                  }`}
                  required
                  onChange={formInputChangeHandler}
                />
                <FontAwesomeIcon
                  icon="fa-solid fa-magnifying-glass"
                  className="absolute right-5 top-4 text-primary-color"
                  size="lg"
                />
              </div>
            </div>
            <div onClick={destinationSelectedHandler}>{renderContent}</div>
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
            <label htmlFor="departing" className="input-label">
              Departing Date
            </label>
            <input
              type="date"
              name="departing"
              id="departing"
              className="input-field"
              value={formFields.departing}
              onChange={formInputChangeHandler}
              required
            />
          </div>
          <div className="mt-5">
            <div className="input-label mb-2">
              Do you want other user see your post?
            </div>
            <div className="flex flex-row space-x-10">
              <div className="flex space-x-2">
                <label htmlFor="public">Yes</label>
                <input
                  type="radio"
                  value="yes"
                  id="public"
                  name="postStatus"
                  onChange={formInputChangeHandler}
                />
              </div>
              <div className="flex space-x-2">
                <label htmlFor="private">No</label>
                <input
                  type="radio"
                  value="no"
                  id="private"
                  name="postStatus"
                  onChange={formInputChangeHandler}
                />
              </div>
            </div>
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
