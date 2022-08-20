import Link from "next/link";
import { useUser } from "../../context/userContext";
import { useEffect, useState } from "react";
import { getUserDocument, signOutCurrentUser } from "../../utils/firebase.util";

const NavBar = () => {
  const { currentUser } = useUser();
  const [user, setUser] = useState(null);

  // get user's display name
  useEffect(() => {
    if (currentUser) {
      getUserDocument(currentUser).then((data) => setUser(data));
    }

    return setUser(null);
  }, [currentUser]);

  const signOutHandler = async () => await signOutCurrentUser();

  return (
    <>
      <ul className="flex h-full flex-col items-start justify-around md:flex-row md:items-center md:justify-end">
        <li className="ml-16 cursor-pointer duration-500 hover:text-blue-600">
          <Link href="/">Home</Link>
        </li>
        <li className="ml-16 cursor-pointer duration-500 hover:text-blue-600">
          <Link href="/posts">My Posts</Link>
        </li>
        <li className="ml-16 cursor-pointer duration-500 hover:text-blue-600">
          <Link href="/explore">Explore</Link>
        </li>
        {user && (
          <li className="ml-16 cursor-pointer duration-500 hover:text-blue-600">
            {user.displayName}
          </li>
        )}
        {currentUser ? (
          <button
            className="ml-16 cursor-pointer rounded-2xl bg-primary-color py-2 px-5 text-lg tracking-wider text-white hover:bg-blue-600"
            onClick={signOutHandler}
          >
            Logout
          </button>
        ) : (
          <Link href="/auth">
            <button className="ml-16 cursor-pointer rounded-2xl bg-primary-color py-2 px-5 text-lg tracking-wider text-white hover:bg-blue-600 ">
              Login
            </button>
          </Link>
        )}
      </ul>
    </>
  );
};

export default NavBar;
