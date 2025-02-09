require('dotenv').config();
const connectDB = require('../config/db');
const Student = require('../models/Student');
const Course = require('../models/Course');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await Student.deleteMany();
  await Course.deleteMany();
  await User.deleteMany();

  // Create Admin
  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('admin123', salt);
  const adminUser = await User.create({
    username: 'admin',
    password: adminPassword,
    role: 'admin'
  });

  // Create Sample Students
  const student1 = await Student.create({
    studentID: 'S1001',
    name: 'John Doe',
    dob: new Date('2000-01-15'),
    major: 'Computer Science'
  });

  const studentUser = await User.create({
    username: 'S1001',
    password: await bcrypt.hash('Student123', salt),
    student: student1._id
  });

  // Create Sample Courses
  await Course.create([
    {
      courseID: 'CSC101',
      name: 'Introduction to Programming',
      credits: 3,
      startDate: new Date('2024-09-01')
    },
    {
      courseID: 'MAT201',
      name: 'Calculus I',
      credits: 4,
      startDate: new Date('2024-09-01')
    }
  ]);

  console.log('Database seeded successfully');
  process.exit();
};

seedData(); 