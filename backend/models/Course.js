import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  courseID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  credits: { type: Number, required: true },
  startDate: { type: Date, required: true }
});

const Course = mongoose.model('Course', CourseSchema); 
export default Course;