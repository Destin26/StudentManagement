const express = require("express");
const router = express.Router();
const cookieparser = require("cookie-parser");
const Student = require("./models/students.model");


router.use(express.json());
router.use(cookieparser());


router.get('/v2', async (req, res) => {
  console.log(req.query.classid)
  const students = await Student.query()
    .select('students.id', 'firstname', 'lastname', 'guardianname', 'phone', 'email')
    .join('classes', 'students.classid', 'classes.id')
    .where('students.classid', req.query.classid)

  res.json({
    students: students
  })

})

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


module.exports = router;
