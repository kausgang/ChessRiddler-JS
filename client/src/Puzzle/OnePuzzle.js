import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import { Chess } from "chess.js";
import Stack from "@mui/material/Stack";
import OnePuzzleBoard from "./OnePuzzleBoard";

function OnePuzzle(props) {
  //   const [fen, setFen] = useState("start");
  //   const [fens, setFens] = useState([]);
  //   const [bestmove, setBestmove] = useState("");
  //   const [moveplayed, setMovePlayed] = useState("");
  const [orientation, setOrientation] = useState("white");
  const [game, setGame] = useState(new Chess());
  const [draggable, setDraggable] = useState(true);

  const onSetFen = (fen) => {
    // console.log("fen=", fen);
    game.load(fen);
    // setFen(fen);
    props.onePuzzle.fen = fen;
    setDraggable(false);
  };

  useEffect(() => {
    // game.reset();
    game.load(props.onePuzzle.fen);
    // console.log(game);

    //check orientation
    // let color = props.onePuzzle.fen.split(" ")[1];
    // console.log(color);
    // color === "w" ? setOrientation("white") : setOrientation("black");
  }, [props.onePuzzle.fen]);

  useEffect(() => {
    // game.reset();
    game.load(props.onePuzzle.fen);
    // console.log(game);

    //check orientation
    let color = props.onePuzzle.fen.split(" ")[1];
    console.log(color);
    color === "w" ? setOrientation("white") : setOrientation("black");
  }, []);

  return (
    //   <Stack direction="row" spacing={2}>
    <OnePuzzleBoard
      fen={props.onePuzzle.fen}
      orientation={orientation}
      game={game}
      onSetFen={onSetFen}
      bestmove={props.onePuzzle.bestmove}
      draggable={draggable}
    />
  );

  {
    /* </Stack>; */
  }
}

export default OnePuzzle;
