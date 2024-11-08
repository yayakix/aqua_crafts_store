import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocument,
} from "../firebase/firebase";
// context
export const UserContext = createContext({
  currUser: null,
  setCurrUser: () => null,
});
// provider
export const UserProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocument(user);
        setCurrUser(user);
      }
    });
    return unsubscribe;
  }, []);
  console.log("cuurruser", currUser);

  const value = { currUser, setCurrUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
