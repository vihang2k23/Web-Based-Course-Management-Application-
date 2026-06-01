import { Op } from 'sequelize';
import Course from '../models/Course.js';
import { setFlash } from '../middleware/flash.js';
import { validateCourse } from '../utils/validateCourse.js';
import { findCourseById } from '../utils/findCourseById.js';

const PAGE_SIZE = 5;

// GET /courses - show course list
export async function index(req, res) {
  try {
    const search = (req.query.search || '').trim();
    const requestedPage = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const where = search ? { name: { [Op.like]: `%${search}%` } } : {};

    const count = await Course.count({ where });
    const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
    const currentPage = Math.min(requestedPage, totalPages);

    const courses = await Course.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: PAGE_SIZE,
      offset: (currentPage - 1) * PAGE_SIZE,
    });

    res.render('courses/index', {
      title: 'Courses',
      courses,
      search,
      currentPage,
      totalPages,
      totalCount: count,
      pageSize: PAGE_SIZE,
    });
  } catch (err) {
    console.error('Error loading courses:', err);
    res.status(500).send('Unable to load courses.');
  }
}

// GET /courses/new
export function newForm(req, res) {
  res.render('courses/new', {
    title: 'Add Course',
    errors: [],
    course: { name: '', duration: '', fees: '' },
  });
}

// POST /courses - add new course
export async function store(req, res) {
  const { errors, course } = validateCourse(req.body);

  if (errors.length > 0) {
    return res.render('courses/new', { title: 'Add Course', errors, course });
  }

  try {
    await Course.create({
      name: course.name,
      duration: course.duration,
      fees: Number(course.fees),
    });
    setFlash(req, 'success', 'Course added.');
    res.redirect('/courses');
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).send('Unable to create course.');
  }
}

// GET /courses/:id/edit
export async function editForm(req, res) {
  try {
    const existing = await findCourseById(req.params.id);

    if (!existing) {
      return res.status(404).render('courses/not-found', { title: 'Course Not Found' });
    }

    res.render('courses/edit', {
      title: 'Edit Course',
      errors: [],
      course: {
        id: existing.id,
        name: existing.name,
        duration: existing.duration,
        fees: existing.fees,
      },
    });
  } catch (err) {
    console.error('Error loading course:', err);
    res.status(500).send('Unable to load course.');
  }
}

// POST /courses/:id - update course
export async function update(req, res) {
  try {
    const existing = await findCourseById(req.params.id);

    if (!existing) {
      return res.status(404).render('courses/not-found', { title: 'Course Not Found' });
    }

    const { errors, course } = validateCourse(req.body);

    if (errors.length > 0) {
      return res.render('courses/edit', {
        title: 'Edit Course',
        errors,
        course: { id: existing.id, ...course },
      });
    }

    await existing.update({
      name: course.name,
      duration: course.duration,
      fees: Number(course.fees),
    });

    setFlash(req, 'success', 'Course updated.');
    res.redirect('/courses');
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).send('Unable to update course.');
  }
}

// POST /courses/:id/delete
export async function destroy(req, res) {
  try {
    const existing = await findCourseById(req.params.id);

    if (!existing) {
      return res.status(404).render('courses/not-found', { title: 'Course Not Found' });
    }

    await existing.destroy();
    setFlash(req, 'success', 'Course deleted.');
    res.redirect('/courses');
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).send('Unable to delete course.');
  }
}
