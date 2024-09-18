import { Router } from 'express';
import { createPerson, getPerson, updatePerson, deletePerson } from '../controllers/Person.controller';

const router = Router();

// Rutas de personas
router.post('/', createPerson);
router.get('/:id', getPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

export default router;