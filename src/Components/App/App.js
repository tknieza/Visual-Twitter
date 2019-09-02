import React, { useState } from "react";
import { Box, Image } from "rebass";
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
        <h1>Visual Twitter</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" />
          <button type="submit" variant="contained">
            Button
          </button>
        </form>
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
              <p>{tweet.permaLink}</p>
              {tweet.images.length > 0 &&
                tweet.images.map((image, index) =>
                  index === 0 ? (
                    <Image
                      src={image}
                      key={index}
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 9999
                      }}
                    />
                  ) : (
                    <Image src={image} key={index} />
                  )
                )}
            </Box>
          ))}
      </div>
    </div>
  );
};

export default App;
