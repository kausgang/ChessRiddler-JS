import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import Stack from "@mui/material/Stack";

function Board(props) {
  // const [history, setHistory] = useState([]);
  // const [pgn, setPgn] = useState("");

  // let depth = props.evaluationDepth;

  useEffect(() => {
    if (props.fen === "start")
      props.game.load(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      );
    else props.game.load(props.fen);
  }, [props.fen]);

  // const calculate_cp = (fen) => {
  //   let compare = 0;
  //   // let engine = props.engine;

  //   var engine = new Worker("stockfish.js");

  //   // check which side to move
  //   let game_history = props.game.history({ verbose: true });
  //   // console.log(game_history);
  //   let sideToMove = game_history[game_history.length - 1].color;
  //   // console.log(sideToMove);

  //   if (sideToMove === "b") {
  //     compare = 1;
  //   } else compare = -1;

  //   // let depth = 10;
  //   engine.postMessage("position fen " + fen);
  //   // engine.postMessage("go movetime 1000");
  //   engine.postMessage("go depth " + depth);

  //   engine.onmessage = function (line) {
  //     // console.log(line.data);

  //     let last_line = line.data.match("info depth " + depth);

  //     let mate = 0,
  //       mate_in = 0;

  //     if (last_line !== null) {
  //       // console.log(last_line.input);
  //       let cp_substr_start = last_line.input.indexOf("cp") + 3;
  //       let cp_substr_end = last_line.input.indexOf("nodes") - 1;

  //       if (cp_substr_start === 2) {
  //         //cp was not returned, mate was found
  //         mate = last_line.input.indexOf("score") + 6;
  //         mate_in = last_line.input.substring(mate, cp_substr_end);
  //         // console.log(mate_in);
  //       }

  //       let cp_value = last_line.input.substring(
  //         cp_substr_start,
  //         cp_substr_end
  //       );

  //       // let final_cp = (cp_value / 100) * compare;
  //       // props.updateCp(final_cp);

  //       let final_cp = 0;
  //       if (cp_substr_start !== 2)
  //         //cp was not returned, mate was found
  //         final_cp = (cp_value / 100) * compare;
  //       else final_cp = mate_in;
  //       props.updateCp(final_cp);

  //       // console.log(final_cp);

  //       engine.terminate();

  //       props.updateMoves();

  //       // continue the game by changing side to move
  //       sideToMove === "w"
  //         ? props.changeSideToMove("b")
  //         : props.changeSideToMove("w");
  //     }
  //   };
  // };

  const onDrop = ({ sourceSquare, targetSquare }) => {
    // if (!props.gameStated) props.onSetGameStarted(true);

    // let fen = props.game.fen();

    try {
      props.game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });

      props.onSetFen(props.game.fen()); //fen holds the position reached after dropping this piece

      let newmove = props.game.history({ verbose: true })[0].lan;

      if (newmove === props.bestmove) alert("Great!! Best Move found");
      else {
        props.game.undo();
        props.game.move(props.bestmove);
        props.onSetFen(props.game.fen());
        alert("Bestmove was " + props.game.history());
      }
    } catch (error) {
      console.log("illigal move");
    }
  };
  return (
    <>
      <Stack sx={{ ml: 35 }}>
        <Chessboard
          width={450}
          position={props.fen}
          onDrop={onDrop}
          // onLegalMove={props.onLegalMove(game)}
          draggable={props.draggable}
          orientation={props.orientation}
          boardStyle={{
            borderRadius: "5px",
            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
          }}
        />
      </Stack>
    </>
  );
}

export default Board;
