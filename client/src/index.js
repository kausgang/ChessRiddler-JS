import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const analyzeURL = "http://localhost:5000/analyze";
const gamesURL = "http://localhost:5000/games";
const puzzleURL = "http://localhost:5000/puzzle";
const randomPuzzleURL = "http://localhost:5000/randompuzzle";

root.render(
  // <React.StrictMode>

  <App
    analyzeURL={analyzeURL}
    gamesURL={gamesURL}
    puzzleURL={puzzleURL}
    randomPuzzleURL={randomPuzzleURL}
  />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
