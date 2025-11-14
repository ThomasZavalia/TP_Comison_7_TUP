import express from 'express';
import * as clientController from '../controllers/clientController.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = express.Router();

// GET / - Obtener todos los clientes
router.get('/', clientController.getAll);

// GET /:id - Obtener un cliente por ID
router.get('/:id', clientController.getById);

// POST / - Crear un nuevo cliente (requiere autenticación)
router.post('/', authRequired, clientController.create);

// PUT /:id - Actualizar un cliente (requiere autenticación)
router.put('/:id', authRequired, clientController.update);

// DELETE /:id - Eliminar un cliente (requiere autenticación)
router.delete('/:id', authRequired, clientController.delete_client);

export default router;
