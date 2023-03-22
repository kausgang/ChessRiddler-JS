import React, { useState, useEffect } from "react";
import Board from "./Board";
import Button from "@mui/material/Button";
import { Chess } from "chess.js";
import Stack from "@mui/material/Stack";

function RandomPuzzle(props) {
  const [fen, setFen] = useState("start");
  //   const [fens, setFens] = useState([]);
  const [bestmove, setBestmove] = useState("");
  const [moveplayed, setMovePlayed] = useState("");
  const [orientation, setOrientation] = useState("white");
  const [game, setGame] = useState(new Chess());
  const [draggable, setDraggable] = useState(true);

  // useEffect(() => {
  //   console.log(props.puzzle);
  //   // setPuzzles(props.puzzle);
  //   // props.puzzle.forEach((element) => {
  //   //   setFens(...fens, element[1]);
  //   // });

  //   // setTimeout(() => {
  //   //   console.log(fens);
  //   // }, 4000);
  // }, [props.puzzle]);

  const newPuzzle = () => {
    setDraggable(true);
    //select a random puzzle
    const randomElement =
      props.puzzle[Math.floor(Math.random() * props.puzzle.length)];

    // console.log(randomElement);

    setFen(randomElement[1]);
    setBestmove(randomElement[3]);
    setMovePlayed(randomElement[2]);

    //check orientation
    let color = randomElement[1].split(" ")[1];
    color === "w" ? setOrientation("white") : setOrientation("black");
  };

  const onSetFen = (fen) => {
    // console.log("fen=", fen);
    // game.load(fen);
    setFen(fen);
    setDraggable(false);
  };
  return (
    // <div>
    <Stack direction="row" spacing={2}>
      <Board
        fen={fen}
        orientation={orientation}
        game={game}
        onSetFen={onSetFen}
        bestmove={bestmove}
        draggable={draggable}
      />
      <Button variant="contained" onClick={newPuzzle}>
        New Puzzle
      </Button>
    </Stack>
    // </div>
  );
}

export default RandomPuzzle;
