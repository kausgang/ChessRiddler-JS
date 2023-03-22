import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import Stack from "@mui/material/Stack";

function OnePuzzleBoard(props) {
  const onDrop = ({ sourceSquare, targetSquare }) => {
    // if (!props.gameStated) props.onSetGameStarted(true);

    // let fen = props.game.fen();

    props.game.load(props.fen);

    try {
      props.game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });

      let newmove = props.game.history()[0];
      console.log(newmove);

      props.game.undo();
      props.game.move(props.bestmove);
      let bestmove_lan = props.game.history()[0];
      console.log(bestmove_lan);

      if (newmove === bestmove_lan) {
        alert("Great!! Best Move found");
        props.onSetFen(props.game.fen());
      } else {
        alert("Bestmove was " + props.game.history());
        props.onSetFen(props.game.fen());
      }

      // props.onSetFen(props.game.fen()); //fen holds the position reached after dropping this piece

      // let newmove = props.game.history({ verbose: true })[0].lan;
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

export default OnePuzzleBoard;
