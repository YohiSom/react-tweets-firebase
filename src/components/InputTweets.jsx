import React from "react";
import { TweetsContext } from "../App";

function InputTweets() {
  const { tweetsAdd, id, isPending, tweetInput, setTweetInput } =
    React.useContext(TweetsContext);
  const isButtonDisabled = !tweetInput || tweetInput.length > 140 || isPending;
  const tweetOnchange = (e) => {
    setTweetInput(e.target.value);
  };


  const onClick = () => {
    // setIsPending(true);
    tweetsAdd(tweetInput, id);
    // setIsPending(false);
    setTweetInput("");
  };

  return (
    <div className="nav-container">
      
      <div className="text-area">
        <textarea
          className="input-area"
          placeholder="What do you have in mind..."
          value={tweetInput}
          onChange={tweetOnchange}
        ></textarea>
        <div className="button-container">
          {tweetInput.length > 140 && (
            <div className="max-char-container">
              <div className="max-char">
                The tweet can't contain more than 140 chars.{" "}
              </div>
            </div>
          )}
          {isPending && <div className="loader"></div>}
          <button
            className={`nav-button ${isButtonDisabled ? "btn-disable" : ""}`}
            onClick={onClick}
            disabled={isButtonDisabled}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputTweets;
