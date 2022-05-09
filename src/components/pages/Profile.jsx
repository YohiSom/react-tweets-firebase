import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ addName, profileName, addImg }) {
  const [_profileName, setProfileName] = useState(profileName);
  const [profileImg, setProfileImg] = useState(null);
  const [profileImgURL, setprofileImgURL] = useState("");
  const [imgSaved, setImgSaved] = useState("")
  let history = useNavigate();
  const onNameChange = (e) => {
    setProfileName(e.target.value);
  };
  const onProfileImg = (e) => {
    setProfileImg(e.target.files[0]);
    setprofileImgURL(URL.createObjectURL(e.target.files[0]))
  };

  const onProfileClick = () => {
    addName(_profileName);
    setProfileName("");
    history("/");
  };

  const onUploadImage = () => {
    addImg(profileImg);
    setImgSaved("Image Saved! Don't forget to add a profile name!")

  };

  return (
    <div>
      <div className="profile-container">
        <div className="profile">
          <div className="profile-title">Profile</div>
          <label className="label">User Name</label>
          <textarea
            className="profile-text"
            value={_profileName}
            onChange={onNameChange}
            placeholder="write your name"
          ></textarea>
        </div>
        <div className="profile-btn-container">
          <button
            className="profile-btn"
            onClick={onProfileClick}
            disabled={_profileName ? false : true}
          >
            Save
          </button>
          
        </div>
      </div>
      <div className="img-container">
        <img className="profile-image" src={profileImgURL} />
        <input
          type="file"
          accept="image/*"
          title=" "
          id="img"
          className="input-img"
          // value={profileImg}
          onChange={onProfileImg}
        ></input>
        <button className="img-button" onClick={onUploadImage} disabled={profileImg ? false : true}>
          Save Profile Picture
        </button>
        <p className="img-saved">{imgSaved}</p>
      </div>
    </div>
  );
}

export default Profile;
