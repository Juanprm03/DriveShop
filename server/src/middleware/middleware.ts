import { Request, Response, NextFunction } from 'express';

// Middleware para verificar si el usuario está autenticado
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // Verifica si la sesión existe y tiene un objeto de usuario
    if (req.session && (req.session as any).user) {
        next(); // Si la sesión está activa, continúa al siguiente middleware o manejador de ruta
    } else {
        res.status(401).json({ message: 'No autenticado' }); // Si no hay sesión, devuelve un error
    }
};