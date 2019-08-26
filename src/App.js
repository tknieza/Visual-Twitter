import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tweets: []
    };
  }

  fetchTweets(querry) {
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

        // TODO: Figure out how to serialize stuff's content
        // console.log($(".AdaptiveMedia", $(".tweet")).toArray());

        // Getting all tweets containing an image
        tweets = $("img", $(".AdaptiveMedia", $(".tweet")));
      })
      .catch(() =>
        console.log("Can’t access " + url + " response. Blocked by browser?")
      )
      .finally(() => {
        console.log(
          tweets.toArray().map(item => {
            return item.attribs.src;
          })
        );
      });
  }

  render() {
    return (
      <div className="App">
        {/* Surface level testing */ this.fetchTweets("death grips")}
        <h1>Visual Twitter</h1>
      </div>
    );
  }
}

export default App;
