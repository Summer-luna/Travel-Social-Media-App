import Posts from "../../data/posts";
import PostsGrid from "../posts/postsGrid";

const MyPosts = () => {
  return (
    <>
      <section>
        <div className="py-8 text-3xl font-bold">My Posts</div>
        <PostsGrid posts={Posts.posts} />
      </section>
    </>
  );
};

export default MyPosts;
