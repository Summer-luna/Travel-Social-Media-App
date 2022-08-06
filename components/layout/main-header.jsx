import NavBar from "./navBar";
import { useState } from "react";
import HamburgerBtn from "./hamburgerBtn";
import classes from "./hamburgerBtn.module.css";
import Link from "next/link";

const MainHeader = () => {
  const [open, setOpen] = useState(false);

  const openNavbar = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="mt-20 flex items-center justify-between">
      <div className="text-2xl font-bold uppercase text-blue-600">
        <Link href="/">Traveler</Link>
      </div>
      <div
        className={`ease z-10 cursor-pointer transition duration-700 md:hidden ${
          open ? classes.open : "mr-2"
        }`}
        onClick={openNavbar}
      >
        <HamburgerBtn />
      </div>
      <nav
        className={`absolute right-0 top-0 z-0 flex h-screen w-3/4 w-1/2 items-center justify-center bg-amber-100 text-lg tracking-wider ${
          open ? "translate-x-0" : "translate-x-full"
        } transition duration-700 ease-in-out md:static md:block md:h-full md:translate-x-0 md:bg-white md:transition-none`}
      >
        <NavBar />
      </nav>
    </div>
  );
};

export default MainHeader;
