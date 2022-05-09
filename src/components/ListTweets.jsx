import React, { useEffect, useRef } from "react";
import { TweetsContext } from "../App";
import TweetCard from "./TweetCard";

function ListTweets() {
  const { tweetArr, moreLoad, endOfList } = React.useContext(TweetsContext);
  const [element, setElement] = React.useState(null);
  const observer = React.useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0]
      if(first.isIntersecting) {
        loader.current();
      }
    }, { threshold: 1 })
  );

    const loader = useRef(moreLoad);

  React.useEffect(() => {
    const currenElement = element;
    const currentObserver = observer.current;

    if (currenElement) {
      currentObserver.observe(currenElement);
    }
    return () => {
      if (currenElement) {
        currentObserver.unobserve(currenElement);
      }
    };
  }, [element]);

  useEffect(() => {
    loader.current = moreLoad;
  }, [moreLoad])



  return (
    <div>
      
      <div className="tweet-container" >
        {tweetArr.map((tweet, index) => (
          <TweetCard key={tweet.id} tweetObj={tweet} />
        ))}
        {
          !endOfList &&
        <div className="pagination" ref={setElement}></div>
        }
      </div>
    </div>
  );
}

export default ListTweets;
