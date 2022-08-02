import PostItem from "./postItem";

const PostsGrid = (props) => {
  const { posts } = props;

  const renderContent = posts.map((post) => {
    return <PostItem key={post.id} post={post} />;
  });
  return (
    <ul className="grid grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3">
      {renderContent}
    </ul>
  );
};

export default PostsGrid;
