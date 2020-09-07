var express = require('express');
var router = express.Router();
const teacherController = require("../dbController/teacherController")
const schoolController = require("../dbController/schoolController")
const classController = require("../dbController/classController")
const studentController = require("../dbController/studentController")
const subjectcontroller = require("../dbController/subjectcontroller")


router.post('/addTeacher', teacherController.addTeacher);
router.post('/addSchool', schoolController.addSchool);
router.get('/getSchool/:id', schoolController.getSchool);

router.post('/addclass', classController.addClass);
router.post('/addStudent', studentController.addStudent);
router.get('/getStudent/:id', studentController.getSchool);

router.post('/addSubject', subjectcontroller.addSubject);

module.exports = router;
