import express from 'express';
import { createAppointment, getAppointmentsByUser } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/user/:userId', getAppointmentsByUser);

export default router;
