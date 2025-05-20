import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student'], default: 'student' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

const User = mongoose.model('User', UserSchema);
export default User; 