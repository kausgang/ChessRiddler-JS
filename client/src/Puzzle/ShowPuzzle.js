import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

function ShowPuzzle(props) {
  const [rows, setRows] = useState([]);

  const onClickPuzzle = (e) => {
    // e.preventDefault();
    let fen = e.target.dataset.fen,
      moveplayed = e.target.dataset.moveplayed,
      bestmove = e.target.dataset.bestmove;
    // console.log(e.target);
    console.log("fen=", fen, "moveplayed=", moveplayed, "bestmove=", bestmove);
    props.onSelectPuzzle(fen, moveplayed, bestmove);
  };

  useEffect(() => {
    setRows(
      props.puzzle.map((element) => (
        <li key={element[0]} onClick={onClickPuzzle}>
          <Button
            variant="text"
            data-fen={element[1]}
            data-moveplayed={element[2]}
            data-bestmove={element[3]}
          >
            {element[1]}
          </Button>

          <hr />
        </li>
      ))
    );
  }, [props.puzzle]);

  if (props.puzzle.length === 0) return <div>No Puzzle Found</div>;
  else return <ul style={{ listStyleType: "none" }}>{rows}</ul>;
}

export default ShowPuzzle;
