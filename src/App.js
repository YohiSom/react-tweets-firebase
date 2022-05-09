import React, { useState, useEffect, createContext } from "react";
import './css/index.css'
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "./components/pages/Profile";
import NotFound from "./components/pages/NotFound";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  query,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { db, auth } from "./firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const TweetsContext = createContext();

function ContainerHtml() {
  const [tweetArr, setTweetArr] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [userName, setUserName] = useState(null);
  const [tweetInput, setTweetInput] = useState("");
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [lastDoc, setLastDoc] = useState([]);
  const [endOfList, setEndOfList] = useState(false);
  let tweetsCollectionRef = collection(db, "tweets");
  const queryOnLoad = query(
    tweetsCollectionRef,
    orderBy("date", "desc"),
    limit(7)
  );
  const queryLoadMore = query(
    tweetsCollectionRef,
    orderBy("date", "desc"),
    limit(7),
    startAfter(lastDoc)
  );

  const sortByDate = (array) => {
    return array.sort(
      (d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime()
    );
  };

  const profileAdd = (profileName) => {
    setUserName(profileName);
    localStorage.setItem("userName", profileName);
    // console.log(auth.currentUser.uid);
    let userNameRef = doc(db, "users", auth.currentUser.uid);
    const newUser = {
      userName: profileName,
    };

    setDoc(userNameRef, newUser, { merge: true });
  };

  const addImg = (imgFile) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + imgFile.name);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, imgFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((imgUrl) => {
        let userNameRef = doc(db, "users", auth.currentUser.uid);
        setDoc(userNameRef, { imgUrl }, { merge: true });
      });
    });
  };

  const tweetsAdd = (tweetInput) => {
    // setIsPending(true);
    // const savedName = localStorage.getItem("userName", userName);
    const tweetDate = new Date().toISOString();
    // const id = uuidv4();
    const newTweet = {
      content: tweetInput,
      date: tweetDate,
      uid: auth.currentUser.uid,
    };
    setIsPending(true);
    addDoc(tweetsCollectionRef, newTweet);
  };

  const loadTweets = (query) => {
    setIsPending(true);
    onSnapshot(query, (snapshot) => {
      if (snapshot.docs.length) {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        const page = snapshot.docs[snapshot.docs.length - 1];
        setIsPending(false);
        setLastDoc(page);
        setTweetArr([...tweetArr, ...results]);
      } else {
        setEndOfList(true);
        setIsPending(false);
      }
    });
  };

  const moreLoad = () => {
    loadTweets(queryLoadMore);
  };

  useEffect(() => {
    loadTweets(queryOnLoad);
  }, []);

 

  return (
    
    <div>
      
      <TweetsContext.Provider
        value={{
          tweetsAdd,
          setIsPending,
          isPending,
          tweetInput,
          setTweetInput,
          tweetArr,
          isAuth,
          setIsAuth,
          moreLoad,
          endOfList,
        }}
      >
        
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                !isAuth ? <Navigate to="./login" /> : <Home isAuth={isAuth} />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile addName={profileAdd} addImg={addImg} isAuth={isAuth} />
              }
            />
            <Route
              path="/login"
              element={<Login setIsAuth={setIsAuth} isAuth={isAuth} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TweetsContext.Provider>
    </div>
  );
}

export default ContainerHtml;
