// import logo from "./logo.svg";
import "./App.css";
import Board from "./Board";
import { Chess } from "chess.js";
import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import MoveTable from "./MoveTable";
import EngineLevel from "./EngineLevel";
import Status from "./Status";
import Button from "@mui/material/Button";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
import Grid from "@mui/material/Unstable_Grid2";
import axios from "axios";
// import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { v4 as uuidv4 } from "uuid";
import ShowMoves from "./ShowMoves";
import Advice from "./Advice";
import Stack from "@mui/material/Stack";
import BlunderThreshold from "./BlunderThreshold";
import EvaluationDepth from "./EvaluationDepth";

// var engine = new Worker("stockfish.js");
// const MySwal = withReactContent(Swal);

function Play(props) {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState("start");
  const [orientation, setOrientation] = useState("white");
  // const [engineMove, setEngineMove] = useState("");
  // const [sideToMove, setSideToMove] = useState("w");
  const [gameStarted, setGameStarted] = useState(false);

  // const [moves, setMoves] = useState("");
  const [moves, setMoves] = useState({});
  const [cp, setCp] = useState();
  const [depth, setDepth] = useState(15);
  const [advice, setAdvice] = useState([]);
  const [loadfen, setLoadfen] = useState(false);
  const [evaluationDepth, setEvaluationDepth] = useState(10);
  const [blunderThreshold, setBlunderThreshold] = useState(100);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [pgn, setPgn] = useState("");
  const [history, setHistory] = useState([]);
  const [draggable, setDraggable] = useState(true);
  const [isGameOver, setIsGameOver] = useState("");

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setPlayAs = (event, playas) => {
    event.target.disabled = "true";
    setOrientation(playas);
    //if "play as black" is clicked - start the game
    changeSideToMove("w");
    // disable the black button after it has been clicked once
    event.target.disabled = "true";
  };

  const changeSideToMove = (side) => {
    // setSideToMove(side);

    let fen = game.fen();

    var engine = new Worker("stockfish.js");

    engine.postMessage("position fen " + fen);
    engine.postMessage("go depth " + depth);

    engine.onmessage = function (line) {
      let cp_value = 0.5;

      let last_line = line.data.match("info depth " + depth);

      let best_move = line.data.match(/bestmove\s+(\S+)/);
      let mate = 0,
        mate_in = 0;

      if (last_line !== null) {
        let cp_substr_start = last_line.input.indexOf("cp") + 3;
        let cp_substr_end = last_line.input.indexOf("nodes") - 1;
        if (cp_substr_start === 2) {
          //cp was not returned, mate was found
          mate = last_line.input.indexOf("score") + 6;
          mate_in = last_line.input.substring(mate, cp_substr_end);
          // console.log(mate_in);
        }

        cp_value = last_line.input.substring(cp_substr_start, cp_substr_end);

        // if (cp_value.isNaN()) {

        if (cp_substr_start !== 2)
          //cp was not returned, mate was found
          orientation === "white"
            ? setCp(-cp_value / 100)
            : setCp(cp_value / 100);
        else setCp(mate_in);
      }

      try {
        if (best_move[1] !== null) game.move(best_move[1]);
        setFen(game.fen());
        updateMoves();

        // terminate the worker as the best move has been found
        engine.terminate();
      } catch (err) {}

      // check for gameover
      if (game.isCheckmate()) {
        alert("Checkmate!");
      }
      if (game.isDraw()) {
        alert("Draw!");
      }
      if (game.isStalemate()) {
        alert("Stalemate!");
      }
    };
  };

  const onsetDepth = (newDepth) => {
    setDepth(newDepth);
  };
  const updateCp = (cp_value) => {
    setCp(cp_value);
  };

  const updateMoves = () => {
    // setMoves(game.pgn({ maxWidth: 10, newline: "\n" }));
    let pgn = game.pgn();
    let lastmove = game.history()[game.history().length - 1];
    let fen = game.fen();
    setMoves({ pgn, lastmove, fen });
  };

  const onSetGameStarted = (isGamgstarted) => {
    setGameStarted(isGamgstarted);
  };

  const onSetFen = (fen) => {
    game.load(fen);
    setLoadfen(!loadfen);
  };

  const onsetBlunderThresold = (blunderThreshold) => {
    setBlunderThreshold(blunderThreshold);
  };

  const onsetEvaluationDepth = (evaluationDepth) =>
    setEvaluationDepth(evaluationDepth);

  const onGameover = () => {
    setGameover(true);
    setDraggable(false);
    setIsGameOver("gameover");
    //if game ended before making any move  disable "play as black" button
    setGameStarted(true);
    setPgn(game.pgn());
    setHistory(game.history());
  };

  const onAnalyze = () => {
    if (!gameover) {
      alert("end the game first");
      return 1;
    }
    setAdvice([]);

    // game.pgn()===""?return 0:alert("Play a game");
    if (game.pgn() === "" || game.pgn() === null) alert("Play a game");
    else {
      // open modal
      handleOpen();

      setAnalysisComplete(false);

      // create uuid for the game
      let uuid = uuidv4();
      axios
        // .post("http://localhost:5000/analyze", {
        .post(props.analyzeURL, {
          uuid,
          // pgn: game.pgn(),
          // history: game.history(),
          pgn,
          history,
          blunderThreshold,
        })
        .then(function (response) {
          handleClose();
          // console.log(response);
          alert("Analysis successful");

          // console.log(response.data);
          setAnalysisComplete(true);
          setAdvice(response.data.advice);
        })
        .catch(function (error) {
          console.log(error);
          alert("server down");
          handleClose();
        });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Analyzising Game
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            5 seconds per move
          </Typography>

          <LinearProgress />
        </Box>
      </Modal>

      <Stack direction="row" spacing={4} ml={2}>
        <div>
          <Stack direction="row" spacing={2}>
            <EngineLevel onsetDepth={onsetDepth} />
            <EvaluationDepth onsetEvaluationDepth={onsetEvaluationDepth} />
            <BlunderThreshold onsetBlunderThresold={onsetBlunderThresold} />
          </Stack>
          <hr />
          <Status cp_value={cp} game={game} />
          <hr />

          <ShowMoves moves={moves} setFen={onSetFen} gameover={gameover} />
        </div>
        <div>
          <Board
            // onLegalMove={onLegalMove}
            orientation={orientation}
            game={game}
            position={fen}
            changeSideToMove={changeSideToMove}
            cp={cp}
            updateCp={updateCp}
            depth={depth}
            updateMoves={updateMoves}
            gameStarted={gameStarted}
            onSetGameStarted={onSetGameStarted}
            loadfen={loadfen}
            evaluationDepth={evaluationDepth}
            draggable={draggable}
          />
          <ToggleButtonGroup
            color="primary"
            value={orientation}
            exclusive
            onChange={setPlayAs}
            disabled={gameStarted ? true : false}
          >
            <ToggleButton value="black">Play as Black</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            color="primary"
            value={isGameOver}
            exclusive
            onChange={onGameover}
          >
            <ToggleButton value="gameover">End Game</ToggleButton>
          </ToggleButtonGroup>
          <Button
            variant="contained"
            onClick={onAnalyze}
            disabled={analysisComplete ? true : false}
          >
            Create Puzzle
          </Button>
          <Advice advice={advice} analysisComplete={analysisComplete} />
        </div>
      </Stack>
    </Box>
  );
}

export default Play;
