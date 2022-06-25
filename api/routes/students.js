const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Pool = require("pg").Pool;
const cookieparser = require("cookie-parser");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "StudentSchool1",
  password: "0000",
  port: 5432,
});

router.use(express.json());
router.use(cookieparser());

router.get("", (req, res) => {
  console.log("request made to student table");
  pool.query(
    "SELECT id,firstname,lastname,classid,guardianname,phone FROM students WHERE classid = $1",
    [req.query.classid],
    (err, result) => {
      if (err) console.log(err);
      res.json({
        students: result.rows.map((row) => row),
      });
    }
  );
});

router.post("/add", (req, res) => {
  console.log("Add response" + req);
});

module.exports = router;
