import Image from "next/image";

const Logo = () => {
  return (
    <>
      <Image
        src="/images/Traveler-logo.png"
        alt="traveler logo"
        width={150}
        height={150}
      />
    </>
  );
};

export default Logo;
