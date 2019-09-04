import React from "react";
import { Box, Card, Button, Image, Text } from "rebass";

const Tweet = ({ tweet, index, ...otherProps }) => (
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
          window.open(`https://twitter.com${tweet.permaLink}`, "_blank")
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
          !image.includes("hashflags") && <Image src={image} key={index} />
      )}
    </Card>
  </Box>
);

export default Tweet;
