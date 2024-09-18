import { Request, Response } from 'express';
import  Auto  from '../models/Auto.model';

// Crear un nuevo carro
const createAuto = async (req: Request, res: Response) => {
  try {
    const auto = new Auto(req.body);
    await auto.save();
    res.status(201).send(auto);
  } catch (error) {
    res.status(500).send({ error: 'Error creating car', details: error });
  }
};

// Obtener todos los carros
const getAllAutos = async (req: Request, res: Response) => {
  try {
    const autos = await Auto.find().populate('owner');
    res.status(200).json(autos);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching cars' });
  }
};

// Obtener un carro por ID
const getAutoById = async (req: Request, res: Response) => {
  try {
    const auto = await Auto.findById(req.params.id).populate('owner');
    if (!auto) return res.status(404).send({ error: 'Car not found' });
    res.status(200).send(auto);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching car' });
  }
};

// Actualizar un carro por ID
const updateAuto = async (req: Request, res: Response) => {
  try {
    const auto = await Auto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!auto) return res.status(404).send({ error: 'Car not found' });
    res.status(200).send(auto);
  } catch (error) {
    res.status(500).send({ error: 'Error updating car' });
  }
};

// Eliminar un carro por ID
const deleteAuto = async (req: Request, res: Response) => {
  try {
    const auto = await Auto.findByIdAndDelete(req.params.id);
    if (!auto) return res.status(404).send({ error: 'Car not found' });
    res.status(200).send({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting car' });
  }
};

export { createAuto, getAllAutos, getAutoById, updateAuto, deleteAuto}