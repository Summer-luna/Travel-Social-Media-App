import { useEffect, useState } from "react";
import { getPublicPosts } from "../utils/firebase.util";
import Loading from "../components/ui/loading";
import PostsGrid from "../components/posts/postsGrid";
import { useUser } from "../context/userContext";

const Explore = () => {
  const [posts, setPosts] = useState(null);
  const { currentUser } = useUser();

  useEffect(() => {
    currentUser && getPublicPosts(currentUser).then((posts) => setPosts(posts));
  }, []);

  if (!posts) return <Loading />;

  return (
    <div>
      <div>Explore Others Posts</div>
      <PostsGrid posts={posts} />
    </div>
  );
};

export default Explore;
