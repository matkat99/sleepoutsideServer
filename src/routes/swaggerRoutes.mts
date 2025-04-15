import  { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swaggerDesign.json' with { type: 'json' }; 

const router: Router = Router();

// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default router;