require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const auth = require('./routes/auth');
const students = require('./routes/students');
const courses = require('./routes/courses');
const enrollments = require('./routes/enrollments');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', auth);
app.use('/api/students', students);
app.use('/api/courses', courses);
app.use('/api/enrollments', enrollments);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 