var express = require('express');
var router = express.Router();
var middleware = require("../Middleware/auth");

const teacherController = require("../dbController/teacherController")
const schoolController = require("../dbController/schoolController")
const classController = require("../dbController/classController")
const studentController = require("../dbController/studentController")
const subjectcontroller = require("../dbController/subjectcontroller")


router.post('/addTeacher', teacherController.addTeacher);
router.get('/getTeacher/:id', teacherController.getTeacher);
router.get('/deleteTeacher/:id', teacherController.deleteTeacher);
router.post('/updateTeacher', teacherController.updateTeacher);
router.post('/teacherLogin', teacherController.login);
router.get("/fetchTeacher", middleware.TokenVerify, teacherController.fetchData);

router.post('/addSchool', schoolController.addSchool);
router.get('/getSchool/:id', schoolController.getSchool);
router.get('/deleteSchool/:id', schoolController.deleteSchool);
router.post('/updateSchool', schoolController.updateSchool);

router.post('/addclass', classController.addClass);
router.get('/getclass/:id', classController.getClass);
router.get('/deleteClass/:id', classController.deleteClass);
router.post('/updateClass', classController.updateClass);

router.post('/addStudent', studentController.addStudent);
router.get('/getStudent/:id', studentController.getStudent);
router.get('/deletStudent/:id', studentController.deleteStudent);
router.post('/updateStudent', studentController.updateStudent);
router.post('/studentLogin', studentController.login);
router.get("/fetchstudent", middleware.TokenVerify, studentController.fetchData);


router.post('/addSubject', subjectcontroller.addSubject);
router.get('/getSubject/:id', subjectcontroller.getSubject);
router.get('/deleteSubject/:id', subjectcontroller.deleteSubject);
router.post('/updateSubject', subjectcontroller.updateSubject);

module.exports = router;
