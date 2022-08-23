import PostItem from "./postItem";

const PostsGrid = (props) => {
  const { posts } = props;

  const postListsRenderContent =
    posts &&
    posts.map((post) => {
      return <PostItem id={post.id} post={post.data} key={post.id} />;
    });

  const sortedRenderContent = postListsRenderContent.sort((a, b) => {
    const aDate = Date.parse(a.props.post.departing);
    const bDate = Date.parse(b.props.post.departing);

    return bDate - aDate;
  });

  return (
    <ul className="grid grid-flow-row gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedRenderContent}
    </ul>
  );
};

export default PostsGrid;
