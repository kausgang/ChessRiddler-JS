import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

function ShowGames(props) {
  const [rows, setRows] = useState([]);

  const onClickGame = (e) => {
    // e.preventDefault();
    let pgn = e.target.dataset.pgn;
    // moveplayed = e.target.dataset.moveplayed,
    // bestmove = e.target.dataset.bestmove;
    // console.log(e.target);
    console.log("pgn=", pgn);
    // console.log("e=", e);
    props.onSelectGame(pgn);
  };

  useEffect(() => {
    setRows(
      props.games.map((element) => (
        <li key={element[0]} onClick={onClickGame}>
          <Button
            variant="text"
            data-pgn={element[2]}
            // data-moveplayed={element[2]}
            // data-bestmove={element[3]}
          >
            {element[1]}
          </Button>

          <hr />
        </li>
      ))
    );
  }, [props.games]);

  if (props.games.length === 0) return <div>No Puzzle Found</div>;
  else return <ul style={{ listStyleType: "none" }}>{rows}</ul>;
}

export default ShowGames;
