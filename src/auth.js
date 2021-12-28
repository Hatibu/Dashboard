import React, { useState, useEffect, useContext, createContext } from "react";
import {
  signInWithEmailAndPassword,
  auth,
  onAuthStateChanged,
  signOut,
} from "./firebase";

const authContext = createContext();

// provider that enclose your app for access of auth to all components
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response.user);
        alert(`logged in as : ${response.user.email}`);
        return response.user;
      })
      .catch((error) => {
        const errorMessage = JSON.stringify(error.message);
        const problem = errorMessage.slice(23, errorMessage.length - 3);
        alert(`Can not log in because: ${problem}`);
      });
  };

  const signout = () => {
    return signOut(auth).then(() => {
      setUser(false);
    });
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signout,
  };
}
