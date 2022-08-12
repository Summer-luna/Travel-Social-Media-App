import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";
import AddNewPostButton from "../../components/ui/addNewPostButton";
import PostsGrid from "../../components/posts/postsGrid";
import { getAllPosts } from "../../utils/firebase.util";
import Loading from "../../components/ui/loading";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const timer =
      !currentUser &&
      setTimeout(() => {
        router.push("/auth");
      }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentUser]);

  useEffect(() => {
    getPosts();
  }, [currentUser]);

  const getPosts = async () => {
    if (currentUser) {
      const posts = await getAllPosts(currentUser);
      setPosts(posts);
    }
  };

  if (!currentUser) return <Loading />;
  if (!posts) return <Loading />;

  return (
    <>
      <section>
        <div className="py-8 text-3xl font-bold">My Posts</div>
        <PostsGrid posts={posts} />
      </section>
      <AddNewPostButton />
    </>
  );
};

export default MyPosts;
