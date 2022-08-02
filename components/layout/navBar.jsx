import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <ul className="flex flex-col h-full justify-around md:flex-row md:items-center md:justify-end items-start">
        <li className="ml-16 hover:text-blue-600 duration-500 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="ml-16 hover:text-blue-600 duration-500 cursor-pointer">
          <Link href="/explore">Explore</Link>
        </li>
        <Link href="/auth">
          <button className="text-lg bg-primary-color ml-16 py-2 px-5 rounded-2xl text-white tracking-wider cursor-pointer hover:bg-blue-600 ">
            Login
          </button>
        </Link>
      </ul>
    </>
  );
};

export default NavBar;
