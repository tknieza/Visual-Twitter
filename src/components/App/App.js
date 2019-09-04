import React, { useState } from "react";
import { Box, Heading } from "rebass";
import Search from "./Search";
import TweetsDisplay from "./TweetsDisplay";
import fetchTweets from "../../api/FetchTweets";

const App = () => {
  const [tweets, setTweets] = useState([]);

  return (
    <Box>
      <Heading
        fontSize={[5, 6]}
        color="primary"
        sx={{
          maxWidth: 768,
          mx: "auto",
          p: 3,
          textAlign: "center"
        }}
      >
        Visual Twitter
      </Heading>
      <Search setTweets={setTweets} fetchTweets={fetchTweets} />
      <TweetsDisplay tweets={tweets} />
    </Box>
  );
};

export default App;
