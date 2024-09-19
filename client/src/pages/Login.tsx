import React, { useState } from 'react';
import Footer from '../components/Footer';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = { username, password };

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = '/home';
      } else {
        const error = await response.json();
        setMessage(error.message || 'Credenciales inválidas. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMessage('Error al iniciar sesión. Intenta nuevamente.');
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full border border-emerald-500" // Añadido borde
			 >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Iniciar Sesión</h2>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-900 transition-colors duration-300"
          >
            Entrar
          </button>

          {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
        </form>
      </div>
    </>
  );
};

export default Login;
