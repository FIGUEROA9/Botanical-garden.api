import { Router } from 'express';
import * as treeController from '../controllers/tree.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas de árboles requieren autenticación
router.use(authMiddleware);

router.get('/', treeController.getAll);
router.get('/:id', treeController.getById);
router.post('/', treeController.create);
router.patch('/:id', treeController.update);
router.delete('/:id', treeController.remove);

export default router;
