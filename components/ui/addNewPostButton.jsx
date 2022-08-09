import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddNewPostButton = () => {
  const buttonHandler = () => {
    console.log("added new post!");
  };
  return (
    <button
      className="fixed right-60 bottom-20 h-20 w-20 rounded-full bg-primary-hover-color"
      onClick={buttonHandler}
    >
      <FontAwesomeIcon icon="fa-solid fa-plus" color="white" size="2xl" />
    </button>
  );
};

export default AddNewPostButton;
