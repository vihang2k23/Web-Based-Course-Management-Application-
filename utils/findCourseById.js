import Course from '../models/Course.js';

export async function findCourseById(idParam) {
  const id = Number(idParam);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return Course.findByPk(id);
}
