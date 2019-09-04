const fetchTweets = async querry => {
  const cheerio = require("cheerio");

  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const url = `https://twitter.com/search?q=${querry}&src=typd&f=image`; // site doesn’t send Access-Control-*

  return await fetch(proxyurl + url, {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  })
    .then(response => response.text())
    .then(contents => {
      // Loading in response HTML from url
      const $ = cheerio.load(contents);

      // Getting all tweets in the page
      const tweetElements = $(".tweet");

      // Serializing tweetElements into something readable
      return tweetElements.toArray().map(item => {
        return {
          name: item.attribs["data-name"],
          screenName: item.attribs["data-screen-name"],
          userId: item.attribs["data-user-id"],
          permaLink: item.attribs["data-permalink-path"],
          id: item.attribs["data-tweet-id"],
          images: $("img", item)
            .toArray()
            .map(item => {
              return item.attribs.src;
            })
        };
      });
    })
    .catch(() => {
      console.log(`Can’t access ${url} response. Blocked by browser?`);
      return null;
    });
};

export default fetchTweets;
