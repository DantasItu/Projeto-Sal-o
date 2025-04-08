import express from 'express';
import { createService, getAllServices } from '../controllers/serviceController.js';

const router = express.Router();

router.post('/', createService);
router.get('/', getAllServices);

export default router;
