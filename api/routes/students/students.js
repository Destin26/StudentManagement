const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Pool = require("pg").Pool;
const cookieparser = require("cookie-parser");
const Student = require("./models/students.model");
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
    "SELECT id,firstname,lastname,guardianname,phone FROM students WHERE classid = $1",
    [req.query.classid],
    (err, result) => {
      if (err) console.log(err);
      res.json({
        students: result.rows,
      });
    }
  );
});

router.post('/addv2', (req, res) => {
  console.log(req.body.studentObject)
  if (req.body !== null) {
    const newStudent = req.body.studentObject;
    Student.query().insert({
      firstname: newStudent.firstName,
      lastname: newStudent.lastName,
      phone: newStudent.phoneNumber,
      email: newStudent.email,
      classid: newStudent.class,
      guardianname: newStudent.guardianName,
      dob: newStudent.dob,
      gender: newStudent.gender,
      guardianphone: newStudent.guardianPhone
    }).then(success => {
      res.json({
        success: true
      })
    })
  }
})


router.post("/add", (req, res) => {

  if (req.body !== null) {
    const newStudent = req.body.studentObject;
    pool.query(
      "INSERT INTO students (firstname,lastname,gender,email,guardianname,phone,dob,classid) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
      [
        newStudent.firstName,
        newStudent.lastName,
        newStudent.gender,
        newStudent.email,
        newStudent.guardianName,
        newStudent.phoneNumber,
        newStudent.dob,
        newStudent.class,
      ],
      (err, result) => {
        if (err) {
          return res.json({
            success: false,
          });
        } else if (result.rowCount > 0) {
          return res.json({
            success: true,
          });
        }
      }
    );
  }
});

router.post('/test', (req, res) => {
  Student.query().then(data => {
    res.json(data)
  })
})

module.exports = router;