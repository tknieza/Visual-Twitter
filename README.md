# Visual Twitter

Twitter based Web app that retrieves queried images of latest tweets

## Table of Contents

- [Installation](#installation)
- [Support](#support)
- [Contributing](#contributing)
- [Todo](#todo)

## Installation

Download project directory, install required dependencies and run the project:

```sh
git clone https://github.com/tknieza/Visual-Twitter.git
cd Visual-Twitter
npm i
npm run start
```

## Support

Please [open an issue](https://github.com/tknieza/visual-twitter/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/fraction/readme-boilerplate/compare/).

## Todo

- [x] Find best solution to scrape tweets
  - How many records per export?
  - Requests / per hour / per IP?
  - What dependecies to use?
- [ ] Serialize scrapped data into defined objects
  - This includes: title, image and tweet urls, etc.
- [ ] Visualize output
- [ ] Make a design for the front-end
