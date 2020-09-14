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

  const loginSession = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then( async (response) => {
        setUser(await getUserDocument(response.user.uid));
        return user;
      });
  };

  const registerUser = (email, password, displayName) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        generateUserDocument(response, { displayName });
        setUser(response.user);
        return response.user;
      });
  };

  const logoutSession = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  const sendPasswordResetEmail = email => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        return true;
      });
  };

  const signInWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(provider);
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
    sendPasswordResetEmail,
    confirmPasswordReset,
    generateUserDocument,
    signInWithGoogle
  };
}