import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/database.js';
import './models/Course.js';
import courseRoutes from './routes/courses.js';
import { flashToLocals } from './middleware/flash.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

// EJS + static files + forms + flash messages
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'course-management-dev-secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flashToLocals);

app.use('/courses', courseRoutes);
app.get('/', (req, res) => res.redirect('/courses'));

// Connect DB, then start server
try {
  await sequelize.authenticate();
  await sequelize.sync();

  const server = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is in use. Stop the other server and try again.`);
      process.exit(1);
    }
    throw err;
  });
} catch (err) {
  console.error('Unable to start:', err.message);
  process.exit(1);
}
