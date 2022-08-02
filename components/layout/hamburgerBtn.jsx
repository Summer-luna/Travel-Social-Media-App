import classes from "./hamburgerBtn.module.css";

const HamburgerBtn = () => {
  return (
    <>
      <div
        className={`bg-black h-1 w-9 relative ${classes.openOne} transition ease duration-700`}
      ></div>
      <div
        className={`bg-black h-1 w-9 relative translate-y-1 ${classes.openTwo} transition ease duration-700`}
      ></div>
      <div
        className={`bg-black h-1 w-9 relative translate-y-2 ${classes.openThree} transition ease duration-700`}
      ></div>
    </>
  );
};

export default HamburgerBtn;
