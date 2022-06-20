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
  console.log("request made to marks table");
  pool.query("SELECT * FROM marks", (err, result) => {
    if (err) console.log(err);
    res.json({
      marks: result.rows.map((row) => row),
    });
  });
});
router.post("/subject", (req, res) => {
  const filter = req.body.filter;
  console.log(filter.subject, filter.exam, filter.class);
  pool.query(
    "select students.firstname,mark from marks join students on students.id = marks.studentid join subjects on subjects.id = marks.subjectid  join exams on exams.id = marks.examid join classes on classes.id = students.classid where subjects.id = $1 and marks.examid = $2 and students.classid = $3",
    [filter.subject, filter.exam, filter.class],
    (err, result) => {
      if (err) console.log(err);
      console.log(result);
      res.json({
        marks: result.rows.map((row) => row),
      });
    }
  );
});

module.exports = router;
