import Image from "next/image";
import spinner from "../../public/images/Spinner-1s-200px.svg";

const Loading = () => {
  return (
    <div className="m-auto h-[200px] w-[200px]">
      <Image src={spinner} width={200} height={200} alt={spinner} />
    </div>
  );
};

export default Loading;
