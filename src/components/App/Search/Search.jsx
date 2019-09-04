import React from "react";
import { Label, Input } from "@rebass/forms";
import { Box, Button, Flex } from "rebass";

const getQuerry = event => {
  event.preventDefault();
  return event.target[0].value;
};

const SearchBox = ({ setTweets, fetchTweets }) => {
  return (
    <Box
      as="form"
      onSubmit={async event => {
        const querry = getQuerry(event);
        const tweets = await fetchTweets(querry);
        setTweets(tweets);
      }}
      sx={{
        maxWidth: 768,
        mx: "auto",
        px: 3,
        py: 2
      }}
    >
      <Flex
        sx={{
          flexWrap: "wrap"
        }}
      >
        <Box
          sx={{
            flexGrow: 999999,
            marginRight: 2
          }}
        >
          <Box>
            <Label htmlFor="search">Search</Label>
            <Input type="text" id="search" name="search" />
          </Box>
        </Box>
        <Box
          sx={{
            padding: "19px 0 0 0",
            flexGrow: 1
          }}
        >
          <Button type="submit" variant="contained" height={35}>
            Submit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default SearchBox;
