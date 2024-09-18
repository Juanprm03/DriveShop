import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser,login } from '../controllers/User.controller';
import   { isAuthenticated } from '../middleware/middleware';
import { log } from 'console';
const router = Router();

// Rutas de usuarios
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', login);
export default router;