import React, { useState } from "react";
import "./App.css";
import { Button, TextField, Container } from "@material-ui/core";

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
      <Container>
        <h1>Visual Twitter</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-with-placeholder"
            label="Search"
            margin="dense"
          />
          <Button type="submit" variant="contained">
            Button
          </Button>
        </form>
        {tweets.length > 0 &&
          tweets.map((tweet, index) => (
            <div key={index}>
              <p>{tweet.permaLink}</p>
              {tweet.images.length > 0 &&
                tweet.images.map((image, index) => (
                  <img src={image} alt="tweetImage" key={index} />
                ))}
            </div>
          ))}
      </Container>
    </div>
  );
};

export default App;
