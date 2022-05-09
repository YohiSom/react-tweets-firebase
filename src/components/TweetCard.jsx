import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const TweetCard = ({ tweetObj }) => {
  const { uid, date, content } = tweetObj;
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    findUserData(uid);
  }, [uid]);

  const findUserData = async (uid) => {
    let userNameRef = doc(db, "users", uid);
    return getDoc(userNameRef).then(function (doc) {
      if (doc.exists) {
        let userData = doc.data();
        setUserName(userData.userName);
        userData.imgUrl && setUserImg(userData.imgUrl);
      }
    });
  };

  return (
    <div className="tweet">
      <div className="name-date">
        <div className="img-name-container">
         <img src={userImg} onError={(e) => {
    e.target.onerror = null; e.target.src="https://romancebooks.co.il/wp-content/uploads/2019/06/default-user-image.png"; e.target.style = 'height: 23px'}} />
          <div className="username">{userName}</div>
        </div>
        <div>{date}</div>
      </div>
      <div>{content}</div>
    </div>
  );
};
export default TweetCard;
