import Image from "next/image";

const PostItem = ({ post }) => {
  return (
    <li className="shadow-md cursor-pointer">
      <Image src={post.image} alt={post.title} height={300} width={500} />
      <div className="text-xl font-bold px-4 pt-4">{post.title}</div>
      <div className="text-base px-4 py-4">{post.description}</div>
      <button className="uppercase text-sm px-4 py-5">Learn More</button>
    </li>
  );
};

export default PostItem;
