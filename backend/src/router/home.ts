import { Router } from 'express';

const router = Router();

router.get('/', (req, resp) => {
    req;
    resp.end('Bienvenido a la página de Robots');
});

export default router;
