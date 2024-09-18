import { Router } from 'express';
import { createAuto, getAllAutos, getAutoById, updateAuto, deleteAuto } from '../controllers/Auto.controller';
import   { isAuthenticated } from '../middleware/middleware';
const router = Router();

// Rutas de Autos
router.post('/', createAuto);
router.get('/',getAllAutos);
router.get('/:id',getAutoById);
router.put('/:id', updateAuto);
router.delete('/:id', deleteAuto);

export default router;