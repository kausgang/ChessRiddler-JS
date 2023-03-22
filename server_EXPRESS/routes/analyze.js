var express = require("express");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();

let engine_analysis_time = 1000;
let blunder_threshold = 100; // in centipawn value
// hold analysis here
let analysis = { advice: [] };

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

  res.send("done");
});

module.exports = router;
