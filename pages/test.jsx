import axios from "axios";
import { getPublicPosts } from "../utils/firebase.util";
import { useEffect, useState } from "react";

const Test = () => {
  const [data, setDate] = useState(null);

  useEffect(() => {
    console.log("side effect");
  }, []);

  console.log("page render");

  return (
    <div className="flex justify-between">
      <button
        className="bg-primary-color"
        onClick={() => {
          setDate("posts");
        }}
      >
        posts
      </button>
      <button
        className="bg-primary-color"
        onClick={() => {
          setDate("users");
        }}
      >
        users
      </button>
      <button
        className="bg-primary-color"
        onClick={() => {
          setDate("comments");
        }}
      >
        comments
      </button>
    </div>
  );
};

export default Test;
