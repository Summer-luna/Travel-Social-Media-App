import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserDocumentFromAuth,
  getUserDocument,
  TrackAuthStateChange,
} from "../utils/firebase.util";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const AuthUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = TrackAuthStateChange(async (currentUser) => {
      if (currentUser) {
        await createUserDocumentFromAuth(currentUser);
      }
      setCurrentUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
