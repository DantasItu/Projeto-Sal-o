import Appointment from '../models/Appointment.js';

export const createAppointment = async (req, res) => {
  try {
    const { client, professional, service, date, time } = req.body;

    const appointment = await Appointment.create({
      client,
      professional,
      service,
      date,
      time
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar agendamento', error: err.message });
  }
};

export const getAppointmentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.find({
      $or: [
        { client: userId },
        { professional: userId }
      ]
    }).populate('client professional service');

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar agendamentos', error: err.message });
  }
};
