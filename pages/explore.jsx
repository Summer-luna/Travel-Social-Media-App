import { useEffect, useState } from "react";
import { getPublicPosts } from "../utils/firebase.util";
import Loading from "../components/ui/loading";
import PostsGrid from "../components/posts/postsGrid";
import { useUser } from "../context/userContext";
import { useRouter } from "next/router";

const Explore = () => {
  const [posts, setPosts] = useState(null);
  const { currentUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    currentUser && getPublicPosts(currentUser).then((posts) => setPosts(posts));
  }, []);

  // check if there is a user, if not nav to auth page
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

  if (!posts) return <Loading />;

  return (
    <div>
      <div>Explore Others Posts</div>
      <PostsGrid posts={posts} />
    </div>
  );
};

export default Explore;
