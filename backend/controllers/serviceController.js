import Service from '../models/Service.js';

export const createService = async (req, res) => {
  try {
    const { name, duration, price } = req.body;
    const newService = await Service.create({ name, duration, price });
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar serviço', error: err.message });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar serviços', error: err.message });
  }
};
