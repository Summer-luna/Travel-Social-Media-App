import axios from "axios";
import { getPublicPosts } from "../utils/firebase.util";

const Test = () => {
  const test = async () => {
    const docs = await getPublicPosts();
    console.log(docs);
  };
  return (
    <div>
      <button className="bg-primary-color" onClick={test}>
        Test
      </button>
    </div>
  );
};

export default Test;
