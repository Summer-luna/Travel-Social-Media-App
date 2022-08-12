import Image from "next/image";

const PostItem = ({ post }) => {
  console.log(post);
  const renderContent = post.image ? (
    <Image
      src={post.image}
      alt={post.title}
      height={300}
      width={500}
      className="z-10"
    />
  ) : (
    ""
  );
  return (
    <li className="cursor-pointer shadow-md">
      <div className="relative">{renderContent}</div>
      <div className="px-4 pt-4 text-xl font-bold">{post.title}</div>
      <button className="px-4 py-5 text-sm uppercase">Learn More</button>
    </li>
  );
};

export default PostItem;
