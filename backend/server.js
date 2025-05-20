import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import auth from './routes/auth.js';
import students from './routes/students.js';
import courses from './routes/courses.js';
import enrollments from './routes/enrollments.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

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