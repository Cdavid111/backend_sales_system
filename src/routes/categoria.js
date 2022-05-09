import routerx from 'express-promise-router';
import categoriaController from '../controllers/categoriaController';

const router = routerx();

router.get('/list', categoriaController.list);
router.post('/add', categoriaController.add);
router.put('/update', categoriaController.update);
router.delete('/remove/:id', categoriaController.remove);
router.put('/activate', categoriaController.activate);
router.put('/deactivate', categoriaController.deactivate);

export default router;