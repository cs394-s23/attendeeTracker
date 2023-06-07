// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, update, runTransaction, push, set, connectDatabaseEmulator } from "firebase/database";
import { useCallback, useEffect, useState } from "react";

import { v4 as uuid } from 'uuid';

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
  signInWithRedirect
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "api key",
  authDomain: "onsite-ca39b.firebaseapp.com",
  projectId: "onsite-ca39b",
  storageBucket: "onsite-ca39b.appspot.com",
  messagingSenderId: "830241005429",
  appId: "1:830241005429:web:e2cc5cedb632d432e6bd3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

export const db = getDatabase(app);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  useEffect(
    () =>
      onValue(
        ref(db, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );
  return [data, error];
};
const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};


export const pushDb = (data, path) => {
  const newPostKey = uuid().slice(0, 8)
  data.key = newPostKey;;

  var key = set(ref(db, path + newPostKey), data);
};

export const setDb = (data, path) => {
  set(ref(db, path), data);
}

export const pushUsertoDb = (email, path) => {

  var key = set(ref(db, path), email);
};


export const updateLikes = (postId, like) => {
  const postRef = ref(db, '/Recipes/' + postId);
  // console.log('here', postRef)
  runTransaction(postRef, (post) => {
    if (post) {
      if (like) {
        post.like_count++;
      }
      else {
        post.like_count--;
      }
    }
    return post;
  });
}

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );
  return [updateData, result];
};
export const signInWithGoogle = () => {
  signInWithRedirect(getAuth(), new GoogleAuthProvider());
  // window.location.reload(false);
};

const firebaseSignOut = () => {
  signOut(getAuth());
  window.location.reload();
};

export { firebaseSignOut as signOut };

export const useUserState = () => useAuthState(getAuth());


export const useAuthState = () => {
  const [user, setUser] = useState();
  useEffect(() => onAuthStateChanged(getAuth(), setUser));
  var authData = getAuth();

  if (authData.currentUser) {
    console.log("Authenticated user with uid:", authData.currentUser);
  }
  return [user];
};
