import React from "react";
import "./App.css";
import { Button, TextField, Container } from "@material-ui/core";

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
        console.log(`Can’t access ${url} response. Blocked by browser?`)
      )
      .finally(() => {
        this.setState({
          tweets: tweets.toArray().map(item => {
            return item.attribs.src;
          })
        });
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    const querry = event.target[0].value;
    this.fetchTweets(querry);
  };

  render() {
    return (
      <div className="App">
        <Container>
          <h1>Visual Twitter</h1>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="standard-with-placeholder"
              label="Search"
              margin="dense"
            />
            <Button type="submit" variant="contained">
              Button
            </Button>
          </form>
          {this.state.tweets.length > 0 &&
            this.state.tweets.map(tweet => (
              <img src={tweet} alt="tweet" key={tweet.id}></img>
            ))}
        </Container>
      </div>
    );
  }
}

export default App;
