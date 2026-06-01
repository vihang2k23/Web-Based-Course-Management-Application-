import { Router } from 'express';
                                                                                                                    import * as courseController from '../controllers/CourseController.js';

const router = Router();

router.get('/', courseController.index);
router.get('/new', courseController.newForm);
router.post('/', courseController.store);
router.get('/:id/edit', courseController.editForm);
router.post('/:id/delete', courseController.destroy);
router.post('/:id', courseController.update);

export default router;
                                                    