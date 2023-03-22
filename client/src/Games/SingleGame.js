import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import Stack from "@mui/material/Stack";
import ArrowKeysReact from "arrow-keys-react";
import { Chess } from "chess.js";
import Button from "@mui/material/Button";

function SingleGame(props) {
  const [game, setGame] = useState(new Chess());
  const [moves, setMoves] = useState([]);
  const [fen, setFen] = useState(
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  );
  // const [fens, setFens] = useState([]);
  const [currentHalfMove, setCurrentHalfMove] = useState(0);
  const [orientation, setOrientation] = useState(true);

  useEffect(() => {
    //load the pgn
    game.loadPgn(props.pgn);
    setMoves(game.history());
    // make every move and collect fen
    game.reset();
    // moves.forEach((element) => {
    //   console.log(element);
    //   try {
    //     game.move(element);
    //     console.log(game.fen());
    //     setFens((fens) => [...fens, game.fen()]);
    //   } catch {
    //     console.log("error");
    //   }
    // });
  }, [props.pgn]);

  ArrowKeysReact.config({
    left: () => {
      if (currentHalfMove > 0) {
        setCurrentHalfMove((currentHalfMove) => currentHalfMove - 1);
        game.undo();
        setFen(game.fen());
      }
    },
    right: () => {
      if (currentHalfMove < moves.length) {
        setCurrentHalfMove((currentHalfMove) => currentHalfMove + 1);
        game.move(moves[currentHalfMove]);

        setFen(game.fen());
      }
    },
  });

  const flipBoard = () => setOrientation(!orientation);

  return (
    <div {...ArrowKeysReact.events} tabIndex="1">
      <Button variant="contained" sx={{ ml: 55, mb: 2 }} onClick={flipBoard}>
        Flip Board
      </Button>
      <br />
      <Stack sx={{ ml: 35 }} direction={"row"} spacing={2}>
        <Chessboard
          width={450}
          position={fen}
          //   onDrop={onDrop}
          // onLegalMove={props.onLegalMove(game)}
          draggable={false}
          orientation={orientation ? "white" : "black"}
          transitionDuration={0}
          boardStyle={{
            borderRadius: "5px",
            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
          }}
        />
        {/* <hr /> */}

        {/* <hr /> */}
        <div>{props.pgn}</div>
      </Stack>
    </div>
  );
}

export default SingleGame;
