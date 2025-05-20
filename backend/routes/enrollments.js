import express from 'express';
import Enrollment from '../models/Enrollment.js';
import { authenticate, authorize } from '../utils/authMiddleware.js';

const router = express.Router();

// @route   POST /api/enrollments
// @desc    Enroll student in course (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const newEnrollment = new Enrollment({
      student: studentId,
      course: courseId
    });

    const enrollment = await newEnrollment.save();
    res.json(enrollment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/enrollments/me
// @desc    Get logged-in student's enrollments
router.get('/me', authenticate, authorize('student'), async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.student })
      .populate('course', 'courseID name credits startDate');
      
    res.json(enrollments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router; 