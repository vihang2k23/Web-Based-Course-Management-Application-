# Web-Based Course Management Application

A CRUD web app to manage courses. Built with **Node.js**, **Express**, **EJS**, **Bootstrap**, **Sequelize**, and **MySQL**.

## Features

- **Create** a course (name, duration, fees — all required)
- **List** all courses with Edit and Delete actions
- **Update** an existing course
- **Delete** a course (with confirmation)
- **Search** courses by name
- **Pagination** (5 courses per page)
- **Flash messages** after create, update, delete
- Server-side and client-side (Bootstrap) validation
- Bootstrap UI on all pages

## Tech stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js (ES modules) |
| Server | Express 5 |
| Views | EJS |
| Styling | Bootstrap 5 (CDN) + `public/css/style.css` |
| ORM | Sequelize |
| Database | MySQL |

## Project structure

```
├── app.js                 # Entry point, middleware, DB startup
├── config/database.js     # Sequelize connection
├── models/Course.js         # Course model
├── controllers/courseController.js
├── routes/courses.js
├── views/
│   ├── partials/          # header, footer, form, errors
│   └── courses/           # index, new, edit, not-found
├── public/css/style.css
├── scripts/init-db.sql
└── .env                   # Local config (not committed)
```

## Prerequisites

- Node.js 18+
- MySQL Server (or MySQL Workbench connection)
- npm

## Installation

1. Clone or open the project folder.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp .env.example .env
   ```

4. Edit `.env` to match your MySQL Workbench connection:

   ```env
   PORT=3000
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=course_management
   SESSION_SECRET=your_random_secret_string
   ```

5. Create the database (once):

   ```bash
   mysql -h 127.0.0.1 -P 3306 -u your_mysql_user -p < scripts/init-db.sql
   ```

   Or run `scripts/init-db.sql` in MySQL Workbench.

## Run the application

```bash
npm start
```

Development (auto-restart on file changes):

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

> **Important:** After changing routes or controllers, restart the server (`Ctrl+C`, then `npm start` again). If port 3000 is in use, stop the old process first.

## Routes

| Method | URL | Action |
|--------|-----|--------|
| GET | `/` | Redirect to course list |
| GET | `/courses` | List courses (optional `?search=` and `?page=`) |
| GET | `/courses/new` | Add course form |
| POST | `/courses` | Create course |
| GET | `/courses/:id/edit` | Edit course form |
| POST | `/courses/:id` | Update course |
| POST | `/courses/:id/delete` | Delete course |

## Manual test checklist

Before submitting the assignment, verify:

- [ ] Add course with all fields → appears in list
- [ ] Submit add/edit form without required fields → error messages shown
- [ ] Edit course → list shows updated values
- [ ] Delete course → row removed from list
- [ ] Restart server → data still in MySQL (`SELECT * FROM courses;`)
- [ ] Invalid edit URL (e.g. `/courses/99999/edit`) → “Course not found” page

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `Cannot GET /courses/3/edit` or delete not working | Old server still running. Press `Ctrl+C`, run `npm start` again |
| `Port 3000 is already in use` | Stop other Node process: `pkill -f "node app.js"` or change `PORT` in `.env` |
| Database connection error | Check `.env` host, port, user, password; test in MySQL Workbench |
| Empty course list | Add a course via **Add Course** on the home page |

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start server |
| `npm run dev` | Start with nodemon (auto-reload) |

## License

ISC
