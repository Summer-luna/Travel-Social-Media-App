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

  const compareTodayDateWithDepartingDate = () => {
    const today = new Date();
    const departingDate = new Date(post.departing);
    return departingDate.getTime() < today.getTime();
  };

  return (
    <Link href={`/posts/${id}`}>
      <li
        className={`cursor-pointer shadow-md ${
          compareTodayDateWithDepartingDate() ? "grayscale" : ""
        }`}
      >
        <div className="relative">{renderContent}</div>
        <div className="mt-4 flex items-center justify-between px-4">
          <div className=" text-xl font-bold">{post.title}</div>
          <div>{post.departing}</div>
        </div>
        <button className="px-4 py-5 text-sm uppercase">Learn More</button>
      </li>
    </Link>
  );
};

export default PostItem;
