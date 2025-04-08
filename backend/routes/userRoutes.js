import express from 'express';
import { getProfessionals } from '../controllers/authController.js'; 

const router = express.Router();

router.get('/professionals', getProfessionals);

export default router;
