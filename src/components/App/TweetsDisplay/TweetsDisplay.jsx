import React from "react";
import { Box } from "rebass";
import Tweet from "./Tweet";

const TweetsDisplay = ({ tweets }) => (
  <Box>
    {tweets === null ||
      (tweets.length > 0 &&
        tweets.map((tweet, index) => (
          <Tweet key={index} tweet={tweet} index={index} />
        )))}
  </Box>
);

export default TweetsDisplay;
