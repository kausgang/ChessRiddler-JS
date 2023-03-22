import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Play from "./Play/Play";
import ShowPuzzle from "./Puzzle/ShowPuzzle";
import Stack from "@mui/material/Stack";
import RandomPuzzle from "./Puzzle/RandomPuzzle";
import ShowGames from "./Games/ShowGames";
import OnePuzzle from "./Puzzle/OnePuzzle";
import SingleGame from "./Games/SingleGame";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// function shuffleArray(d) {
//   for (var c = d.length - 1; c > 0; c--) {
//     var b = Math.floor(Math.random() * (c + 1));
//     var a = d[c];
//     d[c] = d[b];
//     d[b] = a;
//   }
//   return d;
// }

function App(props) {
  //   const router = createBrowserRouter([
  //     {
  //       path: "/",
  //       element: <div>Hello world!</div>,
  //     },
  //   ]);

  const [games, setGames] = useState([]);
  const [puzzle, setPuzzle] = useState([]);
  const [randomPuzzle, setRandomPuzzle] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [onePuzzle, setOnePuzzle] = useState({
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    moveplayed: "",
    bestmove: "",
  });
  const [pgn, setPgn] = useState("");

  const onTabChange = (index, lastIndex, e) => {
    // console.log("index=", index, "lastIndex=", lastIndex);

    setTabIndex(index);

    //show games
    if (e.target.innerHTML === "Games") {
      fetch(props.gamesURL)
        .then((res) => res.json())
        .then((data) => {
          console.log("data=", data);

          // randomize the puzzles
          // shuffleArray(data);
          setGames(data);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
          alert(error);
        });
    }

    //show puzzles
    if (e.target.innerHTML === "Puzzles") {
      fetch(props.puzzleURL)
        .then((res) => res.json())
        .then((data) => {
          setPuzzle(data);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
          alert(error);
        });
    }
    //solve puzzle
    if (e.target.innerHTML === "Solve") {
      fetch(props.randomPuzzleURL)
        .then((res) => res.json())
        .then((data) => {
          console.log("data=", data);

          // randomize the puzzles
          // shuffleArray(data);
          setRandomPuzzle(data);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
          alert(error);
        });
    }
  };

  const onSelectGame = (pgn) => {
    setTabIndex(4);
    // console.log(pgn);
    setPgn(pgn);
  };

  const onSelectPuzzle = (fen, moveplayed, bestmove) => {
    setTabIndex(5);
    setOnePuzzle({ fen, moveplayed, bestmove });
  };

  return (
    // <Stack alignItems="center">
    // <div>
    <Tabs
      onSelect={onTabChange}
      selectedIndex={tabIndex}
      // onSelect={(index) => setTabIndex(index)}
    >
      <TabList>
        <Tab>Play</Tab>
        <Tab>Games</Tab>
        <Tab>Puzzles</Tab>
        <Tab>Solve</Tab>
        <Tab>1-Game</Tab>
        <Tab>1-Puzzle</Tab>
      </TabList>

      <TabPanel>
        <Play analyzeURL={props.analyzeURL} />
      </TabPanel>
      <TabPanel>
        <ShowGames games={games} onSelectGame={onSelectGame} />
      </TabPanel>
      <TabPanel>
        <ShowPuzzle puzzle={puzzle} onSelectPuzzle={onSelectPuzzle} />
      </TabPanel>
      <TabPanel>
        <RandomPuzzle puzzle={randomPuzzle} />
      </TabPanel>
      <TabPanel>
        <SingleGame
          pgn={pgn}
          // fen={"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}
        />
      </TabPanel>
      <TabPanel>
        <OnePuzzle onePuzzle={onePuzzle} />
      </TabPanel>
    </Tabs>
    // </div>
    // </Stack>
  );
}

export default App;
