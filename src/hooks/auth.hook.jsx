import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Add your Firebase credentials
firebase.initializeApp({
  apiKey: "AIzaSyCdM6_c0eb__H_M69gwyHaJgl2vEWEoCGU",
  authDomain: "wizeline-react-cert.firebaseapp.com",
  databaseURL: "https://wizeline-react-cert.firebaseio.com",
  projectId: "wizeline-react-cert",
  storageBucket: "wizeline-react-cert.appspot.com",
  messagingSenderId: "795946640964",
  appId: "1:795946640964:web:1b73ad3f422a54ec70fe11"
});

const UserProvider = createContext();
const provider = new firebase.auth.GoogleAuthProvider();
const firestore = firebase.firestore();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <UserProvider.Provider value={auth}>{children}</UserProvider.Provider>;
}

export const useAuth = () => {
  return useContext(UserProvider);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const loginSession = async (email, password) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
      const usr = await getUserDocument(response.user.uid)
      setUser(usr);
      return usr;
  };

  const registerUser = async (email, password, displayName) => {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    setUser(await generateUserDocument(response, { displayName, darkMode: response.user.darkMode || false, favoriteList: response.user.favoriteList || [] }));
    return user;
  };

  const logoutSession = async () => {
    await firebase
      .auth()
      .signOut();
    setUser(null);
  };

  const signUpWithGoogle = async () => {
    const response = await firebase
    .auth()
    .signInWithPopup(provider);
    const usr = await getUserDocument(response.user.uid)
    setUser(usr);
    return usr;
  };

  const generateUserDocument = async (obj, additionalData) => {
    if (!obj) return;
    const userRef = firestore.doc(`users/${obj.user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, photoURL } = obj.user;
      try {
        await userRef.set({
          displayName: additionalData.displayName,
          email,
          photoURL,
          darkMode: additionalData.darkMode,
          favoriteList: additionalData.favoriteList,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(obj.user.uid);
  };

  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

  const updateUser = async (uid, additionalData) => {
    firestore.doc(`users/${uid}`).update({
      displayName: additionalData.displayName || user.displayName,
      darkMode: additionalData.darkMode || user.darkMode || false,
      favoriteList: additionalData.favoriteList || user.favoriteList || []
    });
    const usr = await getUserDocument(uid)
    setUser(usr);
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    loginSession,
    registerUser,
    logoutSession,
    generateUserDocument,
    signUpWithGoogle,
    updateUser
  };
}