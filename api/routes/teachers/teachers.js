const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Pool = require("pg").Pool;
const cookieparser = require("cookie-parser");
const Teachers = require("./models/teachers.model");

router.use(express.json());
router.use(cookieparser());


router.get('/v2', async (req, res) => {
  try {

    const teachers = await Teachers.query()
      .select('id', 'username', 'email');
    res.json({
      teachers: teachers
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;
