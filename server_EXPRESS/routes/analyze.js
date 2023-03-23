var express = require("express");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const { Chess } = require("chess.js");
var stockfish = require("stockfish");

let engine_analysis_time = 1000;
let blunder_threshold = 100; // in centipawn value
// hold analysis here
let analysis = { advice: [] };
let engine = stockfish();

router.post("/", function (req, res, next) {
  game = {
    uuid: "",
    pgn: "",
    moves_san: [],
    moves_uci: [],
    fen: ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"],
    score: [],
    bestmove: [],
  };

  //  read the pgn sent by client
  incoming_data = req.body;

  uuid = incoming_data.uuid;
  pgn = incoming_data.pgn;
  history = incoming_data.history;
  blunder_threshold = incoming_data.blunderThreshold;

  // console.log(pgn, history, blunder_threshold);

  //  insert into game table
  data = [new Date().toLocaleString(), pgn];

  let db = new sqlite3.Database("public/DB/DB.db");
  db.run(
    `INSERT INTO game (date_played,pgn) VALUES (?,?)`,
    data,
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
  db.close();

  //  input pgn sent by client into the chess object
  let chess = new Chess();
  chess.load_pgn(pgn);

  //  update the move and pgn inormation of the game dictionary
  game.uuid = uuid;
  game.pgn = pgn;
  game.moves_san = history;
  // # construct analysis dictionary
  analysis.uuid = game.uuid;
  analysis.analyzed_on = new Date().toLocaleString();
  analysis.pgn = game.pgn;
  analysis.cp_lost = [];
  analysis.move_number_on_cp_lost = [];
  analysis.move_on_cp_lost = [];
  analysis.fen_on_cp_lost = [];
  analysis.bestmove_on_cp_lost = [];
  analysis.advice = [];

  // //  get details about the game from pgn file
  //   for move in gameFromPGN.mainline_moves():

  //       # make the move
  //       board.push(move)
  //       # update game objects's fen and moves_uci list

  //       game["fen"].append(board.fen())
  //       game["moves_uci"].append(move.uci())

  // get fen from pgn file
  chess.reset();
  game.moves_san.forEach((element) => {
    // console.log(element);
    chess.move(element);
    game.fen.push(chess.fen());
  });

  // console.log(game);

  // analyze_game(engine, game, res);

  // find bestmoves
  for (let i = 0; i < game.fen.length; i++) {
    setTimeout(() => {
      console.log(i);
    }, (engine_analysis_time + 500) * i);
  }
  // res.send("done");
});

const analyze_game = (engine, game, res) => {
  //   for fen in game["fen"]:
  // # board.legal_moves
  // stockfish.set_fen_position(fen)
  // bestmove = stockfish.get_best_move_time(engine_analysis_time)
  // game["bestmove"].append(bestmove)
  // # score = stockfish.get_evaluation()["value"]
  // # game["score"].append(score/100)
  // score = stockfish.get_evaluation()
  // game["score"].append(score)
  // game.fen.forEach((element) => {
  //   console.log(element);
  //   engine.postMessage("position fen " + element);
  //   engine.postMessage("go movetime " + 5000);
  //   engine.onmessage = function (line) {
  //     console.log(line);
  //   };
  // });
};
module.exports = router;
