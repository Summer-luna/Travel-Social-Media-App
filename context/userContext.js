import { createContext, useContext, useEffect, useState } from "react";
import { TrackAuthStateChange } from "../utils/firebase.util";
import { useRouter } from "next/router";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const AuthUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    TrackAuthStateChange(setCurrentUser);
  }, []);

  const value = { currentUser, setCurrentUser };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
