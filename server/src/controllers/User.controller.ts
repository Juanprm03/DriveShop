import { Request, Response } from 'express';
import User from '../models/User.model';
import bcrypt from 'bcryptjs';

declare module 'express-session' {
    interface SessionData {
      user: {
        id: string;
        email: string;
      };
    }
  };

// Crear un nuevo usuario
const createUser = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email, password });
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(500).send({ error: 'Error creating user', details: error });
    }
};

// Obtener todos los usuarios
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching users' });
  }
};

// Obtener un usuario por ID
const getUserById = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send({ error: 'User not found' });
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ error: 'Error fetching user' });
    }
};


// Actualizar un usuario por ID
const updateUser = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, { username, email, password }, { new: true });
      if (!user) return res.status(404).send({ error: 'User not found' });
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ error: 'Error updating user' });
    }
  };

// Eliminar un usuario por ID
const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).send({ error: 'User not found' });
      res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Error deleting user' });
    }
  };

// Inicio de sesión
const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }

    // Guardar sesión del usuario
    if (req.session) {
        req.session.user = {
          id: user._id.toString(),
          email: user.email,
        };
      } else {
        return res.status(500).json({ message: 'Session not initialized' });
      }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Exportación de las constantes
export { createUser, getAllUsers, getUserById, updateUser, deleteUser, login };