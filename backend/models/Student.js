import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  studentID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  major: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Student = mongoose.model('Student', StudentSchema);
export default Student; 