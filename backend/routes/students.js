import express from 'express';
import Student from '../models/Student.js';
import { authenticate, authorize } from '../utils/authMiddleware.js';

const router = express.Router();

// @route   GET /api/students
// @desc    Get all students (admin only)
router.get('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const students = await Student.find().populate('user', 'username');
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/students/:id
// @desc    Get student by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    // Students can only view their own details
    if (req.user.role === 'student' && !req.user.student.equals(student._id)) {
      return res.status(403).json({ msg: 'Unauthorized access' });
    }

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/students
// @desc    Create new student (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  const { studentID, name, dob, major } = req.body;

  try {
    const newStudent = new Student({
      studentID,
      name,
      dob,
      major
    });

    const student = await newStudent.save();
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router; 