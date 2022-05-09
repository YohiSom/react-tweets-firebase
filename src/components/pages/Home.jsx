import InputTweets from "../InputTweets";
import ListTweets from "../ListTweets";


import React from "react";

function Home({ addTweet, isPending, tweets }) {
  return (
    <div>
      <InputTweets addTweet={addTweet} isPending={isPending} />
      <ListTweets tweets={tweets} />
    </div>
  );
}

export default Home;
