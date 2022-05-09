import routerx from 'express-promise-router';
import usuarioController from '../controllers/usuarioController';

const router = routerx();

router.post('/add', usuarioController.add);
router.get('/list', usuarioController.list);
router.get('/query', usuarioController.query);
router.put('/update', usuarioController.update);
router.put('/activate', usuarioController.activate);
router.put('/deactivate', usuarioController.deactivate);
router.post('/login',usuarioController.login);


export default router;