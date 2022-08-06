import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const AuthUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
