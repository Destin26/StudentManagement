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
  console.log("request made to teahcers table");
  pool.query("SELECT id,username,email FROM teachers", (err, result) => {
    if (err) {
      console.log(err);
      res.json({ teachers: "" });
    }
    res.json({ teachers: result.rows });
  });
});

module.exports = router;
