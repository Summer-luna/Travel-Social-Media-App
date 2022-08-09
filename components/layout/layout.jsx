import MainHeader from "./main-header";
import AddNewPostButton from "../ui/addNewPostButton";

const Layout = (props) => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      <AddNewPostButton />
    </>
  );
};

export default Layout;
