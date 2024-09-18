import React from 'react';

function NavBar() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <img
            src="https://i.pinimg.com/originals/2a/df/74/2adf7403c9f7b54c0342e7ab94b586fa.png"
            alt="Logo de la tienda de carros"
            className="h-8 w-8"
          />
          <a href="/" className="text-xl font-semibold text-gray-800 hover:text-gray-600 transition duration-300">Tienda de Carros</a>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/productos" className="text-gray-600 hover:text-gray-800 transition duration-300">Home</a>
            </li>
            <li>
              <a href="/register" className="text-gray-600 hover:text-gray-800 transition duration-300">Registrar Vehículo</a>
            </li>
            <li>
              <a href="/login" className="text-gray-600 hover:text-gray-800 transition duration-300">Login</a>
            </li>
            <li>
              <a href="/product" className="text-gray-600 hover:text-gray-800 transition duration-300">Product</a>
            </li>
            <li>
              <a href="/register" className="text-gray-600 hover:text-gray-800 transition duration-300">Register</a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800 transition duration-300">Salir</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
