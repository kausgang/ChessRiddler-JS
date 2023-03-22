var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const sqlite3 = require("sqlite3").verbose();

var cors = require("cors");
const { Chess } = require("chess.js");
var engine = require("stockfish");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var analyze = require("./routes/analyze");
var games = require("./routes/games");

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.locals.engine = engine();

// create the database and tables
let db = new sqlite3.Database("public/DB/DB.db");
db.run(
  "CREATE TABLE IF NOT EXISTS puzzle(ID INTEGER PRIMARY KEY AUTOINCREMENT,fen,move_played,bestmove)"
);
db.run(
  "CREATE TABLE IF NOT EXISTS game(ID INTEGER PRIMARY KEY AUTOINCREMENT,date_played,pgn)"
);
db.close();

//routes
app.use("/analyze", analyze);
app.use("/games", games);

module.exports = app;
