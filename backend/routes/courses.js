import express from 'express';
import Course from '../models/Course.js';
import { authenticate, authorize } from '../utils/authMiddleware.js';

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses
router.get('/', authenticate, async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/courses
// @desc    Create new course (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  const { courseID, name, credits, startDate } = req.body;

  try {
    const newCourse = new Course({
      courseID,
      name,
      credits,
      startDate
    });

    const course = await newCourse.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router; 