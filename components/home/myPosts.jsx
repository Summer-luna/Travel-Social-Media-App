import Posts from "../../data/posts";
import PostsGrid from "../posts/postsGrid";

const MyPosts = () => {
  console.log(Posts.posts);
  return (
    <>
      <section>
        <div className="text-3xl font-bold py-8">My Posts</div>
        <PostsGrid posts={Posts.posts} />
      </section>
    </>
  );
};

export default MyPosts;
