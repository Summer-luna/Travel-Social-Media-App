import Image from "next/image";
import Link from "next/link";

const PostItem = ({ id, post }) => {
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
    <Link href={`/posts/${id}`}>
      <li className="cursor-pointer shadow-md">
        <div className="relative">{renderContent}</div>
        <div className="px-4 pt-4 text-xl font-bold">{post.title}</div>
        <button className="px-4 py-5 text-sm uppercase">Learn More</button>
      </li>
    </Link>
  );
};

export default PostItem;
