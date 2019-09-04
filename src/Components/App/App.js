import React, { useState } from "react";
import { Box, Image, Button, Card, Text, Heading } from "rebass";
import Search from "../Search";
import fetchTweets from "../../Api/FetchTweets";

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
      {tweets === null ||
        (tweets.length > 0 &&
          tweets.map((tweet, index) => (
            <Box
              key={index}
              sx={{
                maxWidth: 768,
                mx: "auto",
                px: 3,
                py: 4
              }}
            >
              <Card>
                <Button
                  variant="outline"
                  sx={{
                    width: "100%",
                    margin: "1rem 0"
                  }}
                  onClick={() =>
                    window.open(
                      `https://twitter.com${tweet.permaLink}`,
                      "_blank"
                    )
                  }
                >
                  <Image
                    src={tweet.images[0]}
                    key={index}
                    sx={{
                      borderRadius: 9999
                    }}
                  />
                  <Text
                    sx={{
                      marginBottom: "1rem"
                    }}
                  >
                    {tweet.name}
                  </Text>
                  <Text fontSize={11}>{tweet.permaLink}</Text>
                </Button>
                {tweet.images.map(
                  (image, index) =>
                    !image.includes("profile_image") &&
                    !image.includes("emoji") &&
                    !image.includes("hashflags") && (
                      <Image src={image} key={index} />
                    )
                )}
              </Card>
            </Box>
          )))}
    </Box>
  );
};

export default App;
