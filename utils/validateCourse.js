// validation for add and edit forms
export function validateCourse(body = {}) {
  const errors = [];
  const name = (body.name || '').trim();
  const duration = (body.duration || '').trim();
  const feesRaw = (body.fees ?? '').toString().trim();

  if (!name) {
    errors.push('Course name is required.');
  } else if (name.length > 255) {
    errors.push('Course name must be 255 characters or less.');
  }

  if (!duration) {
    errors.push('Course duration is required.');
  } else if (duration.length > 100) {
    errors.push('Course duration must be 100 characters or less.');
  }

  if (!feesRaw) {
    errors.push('Course fees is required.');
  } else if (Number.isNaN(Number(feesRaw)) || Number(feesRaw) < 0) {
    errors.push('Course fees must be a valid number.');
  }

  return {
    errors,
    course: { name, duration, fees: feesRaw },
  };
}
