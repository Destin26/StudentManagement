const express = require("express");
const router = express.Router();
const cookieparser = require("cookie-parser");
const Marks = require("./models/marks.model");

router.use(express.json());
router.use(cookieparser());

router.post('/subjectv2', async (req, res) => {
  const filter = req.body.filter;
  const mark = await Marks.query().select('students.firstname', 'mark')
    .join('subjects', 'subjects.id', 'marks.subjectid').where('subjects.id', filter.subject)
    .join('exams', 'exams.id', 'marks.examid').where('exams.id', filter.exam)
    .join('students', 'students.id', 'marks.studentid')
    .join('classes', 'classes.id', 'students.classid').where('classes.id', filter.class)

  res.json({
    marks: mark
  })
})

module.exports = router;
