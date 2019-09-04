import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
