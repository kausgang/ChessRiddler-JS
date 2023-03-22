var express = require("express");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();

/* GET home page. */
router.get("/", function (req, res, next) {
  let db = new sqlite3.Database("public/DB/DB.db");

  let sql = `SELECT * FROM game`;

  let data;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    // rows.forEach((row) => {
    //   console.log(row);
    //   data.push(row);
    // });

    // res.send(JSON.stringify(rows));
    res.send(rows);
  });
});

module.exports = router;
