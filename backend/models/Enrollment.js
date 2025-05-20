import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  enrollmentDate: { type: Date, default: Date.now }
});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema); 
export default Enrollment;