import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserRoutes from './routes/user';
import PersonRoutes from './routes/person';
import AutoRoutes from './routes/auto';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

// Configuración de la sesión con MongoStore
app.use(session({
    secret: process.env.SESSION_SECRET_KEY!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 Hora
    },
    store: MongoStore.create({
    mongoUrl: process.env.ATLAS_URI,
    }),
  }));
  
// Rutas
app.get('/', (req, res) => {
    res.send('Welcome to the CRUD API!');
  });
  
app.use('/api/users', UserRoutes);
app.use('/api/persons', PersonRoutes);
app.use('/api/autos', AutoRoutes);



// Conexión a la base de datos de MongoDB
mongoose.connect(process.env.ATLAS_URI!)
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

  
// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));