import Logo from "./logo";
import NavBar from "./navBar";
import { useState } from "react";
import HamburgerBtn from "./hamburgerBtn";
import classes from "./hamburgerBtn.module.css";

const MainHeader = () => {
  const [open, setOpen] = useState(false);

  const openNavbar = () => {
    setOpen((prevState) => !prevState);
  };

  const openHamburger = open ? classes.open : "mr-2";
  const hideNavbar = open ? "translate-x-0" : "translate-x-full";

  return (
    <div className="flex items-center justify-between">
      <div>
        <Logo />
      </div>
      <div
        className={`md:hidden transition ease duration-700 z-10 cursor-pointer ${openHamburger}`}
        onClick={openNavbar}
      >
        <HamburgerBtn />
      </div>
      <nav
        className={`w-3/4 text-lg bg-amber-100 tracking-wider h-screen w-1/2 absolute right-0 top-0 flex justify-center items-center z-0 ${hideNavbar} transition ease-in-out duration-700 md:block md:static md:h-full md:translate-x-0 md:bg-white md:transition-none`}
      >
        <NavBar />
      </nav>
    </div>
  );
};

export default MainHeader;
