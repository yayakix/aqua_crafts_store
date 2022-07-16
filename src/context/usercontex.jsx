import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocument,
} from "../firebase/firebase";
// context
export const UserContext = createContext({
  setCurrUser: () => null,
  currUser: null,
});
// provider
export const UserProvider = ({children}) => {
    const [currUser, setCurrUser] = useState(null);
    const value = {currUser, setCurrUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user)
            if(user){
                createUserDocument(user)
            }
            setCurrUser(user)
        })
            return unsubscribe;

    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}