import Image from "next/image";
import spinner from "../../public/images/Spinner-1s-200px.svg";

const Loading = () => {
  return (
    <div>
      <div className="text-center text-3xl font-bold">Loading...</div>
      <Image src={spinner} layout="fill" alt={spinner} />
    </div>
  );
};

export default Loading;
