import Image from "next/image";

const PostItem = ({ post }) => {
  return (
    <li className="cursor-pointer shadow-md">
      <div className="relative">
        <Image
          src={post.image}
          alt={post.title}
          height={300}
          width={500}
          className="z-10"
        />
      </div>
      <div className="px-4 pt-4 text-xl font-bold">{post.title}</div>
      <div className="px-4 py-4 text-base">{post.description}</div>
      <button className="px-4 py-5 text-sm uppercase">Learn More</button>
    </li>
  );
};

export default PostItem;
