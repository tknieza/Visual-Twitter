import React, { useState } from "react";
import { Box, Image, Button, Card, Text, Heading } from "rebass";
import { Label, Input } from "@rebass/forms";
import "./App.css";

const App = () => {
  const [tweets, setTweets] = useState([]);

  const fetchTweets = querry => {
    const cheerio = require("cheerio");

    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = `https://twitter.com/search?q=${querry}&src=typd&f=image`; // site doesn’t send Access-Control-*
    let tweets = [];

    fetch(proxyurl + url, {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    })
      .then(response => response.text())
      .then(contents => {
        // Loading in the response HTML from url
        const $ = cheerio.load(contents);

        const tweetElements = $(".tweet");

        tweetElements.toArray().forEach((item, index) => {
          tweets.push({
            name: item.attribs["data-name"],
            screenName: item.attribs["data-screen-name"],
            userId: item.attribs["data-user-id"],
            permaLink: item.attribs["data-permalink-path"],
            images: $("img", item)
              .toArray()
              .map(item => {
                return item.attribs.src;
              })
          });
        });
      })
      .catch(() =>
        console.log(`Can’t access ${url} response. Blocked by browser?`)
      )
      .finally(() => {
        console.log(tweets, "Tweets");
        setTweets(tweets);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const querry = event.target[0].value;
    fetchTweets(querry);
  };

  return (
    <div className="App">
      <div>
        <Box
          as="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 768,
            mx: "auto",
            px: 3,
            py: 4
          }}
        >
          <Heading fontSize={[5, 6]} color="primary">
            Visual Twitter
          </Heading>
          <Box
            sx={{
              margin: "1rem 0"
            }}
          >
            <Label htmlFor="search">Search</Label>
            <Input type="text" id="search" name="search" />
          </Box>

          <Button type="submit" variant="contained">
            Button
          </Button>
        </Box>
        {tweets.length > 0 &&
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
          ))}
      </div>
    </div>
  );
};

export default App;
