import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const AddNewPostButton = () => {
  return (
    <Link href="/posts/newPost">
      <button className="fixed right-60 bottom-20 h-20 w-20 rounded-full bg-primary-hover-color">
        <FontAwesomeIcon icon="fa-solid fa-plus" color="white" size="2xl" />
      </button>
    </Link>
  );
};

export default AddNewPostButton;
