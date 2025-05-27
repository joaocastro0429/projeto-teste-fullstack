import { Router } from 'express';
import * as tasksController from '../controllers/TaskController';
import {authMiddleware} from '../middleware/auth'

const router = Router();
router.use(authMiddleware) // Apply authentication middleware to all routes


router.get('/tasks', tasksController.getTasksAll);
router.post('/tasks', tasksController.createTask);
router.put('/tasks/:id', tasksController.updateTasks);
router.delete('/tasks/:id', tasksController.deleteTask);

export default router;
