import PostItem from "./postItem";
import Link from "next/link";

const PostsGrid = (props) => {
  const { posts } = props;

  const renderContent =
    posts &&
    posts.map((post) => {
      return <PostItem id={post.id} post={post.data} key={post.id} />;
    });

  return (
    <ul className="grid grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3">
      {renderContent}
    </ul>
  );
};

export default PostsGrid;
