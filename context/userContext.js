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
    TrackAuthStateChange((currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
      } else {
        setCurrentUser(null);
        //console.log("user logged out", currentUser);
      }
    });
  }, []);

  const value = { currentUser, setCurrentUser };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
