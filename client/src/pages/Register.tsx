import { useState } from 'react';
import React from 'react';
import Footer from '../components/Footer';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      if (!username || !password || !email) {
        alert('Todos los campos son requeridos.');
        return;
      }
  
      const userData = { username, password, email };
  
      try {
        const response = await fetch('http://localhost:5000/api/users/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
  
        if (response.ok) {
          alert('Registrado exitosamente');
          setUsername('');
          setPassword('');
          setEmail('');
          window.location.href = '/home';
        } else {
          const errorData = await response.json();
          alert('Error al registrar: ' + errorData.message);
        }
      } catch (error) {
        alert('Hubo un problema en el registro');
      }
    };
  
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
        <form
          className="form-background p-8 rounded-lg shadow-lg border-2 border-white max-w-lg w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-green-400">
            Registro de Usuarios
          </h2>
          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2" htmlFor="marca">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="marca"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="👦"
              className="w-full p-3 rounded-md text-black focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2" htmlFor="modelo">
              Password
            </label>
            <input
              type="password"
              id="modelo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md text-black focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold text-white mb-2" htmlFor="year">
              Email
            </label>
            <input
              type="email"
              id="year"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md text-black focus:bg-white focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300"
          >
            Registrar Usuario
          </button>
        </form>
      </div>
    );
  };

export default Register;