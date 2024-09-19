import React from 'react';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { AiOutlineUserAdd } from 'react-icons/ai';

function NavBar() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <a href="/home" className="text-xl font-semibold text-gray-800 hover:text-gray-600 transition duration-300">Concesionario DriveShop</a>
        </div>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <a href="/home" className="text-gray-600 hover:text-gray-800 transition duration-300 flex items-center space-x-2">
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/registerProduct" className="text-gray-600 hover:text-gray-800 transition duration-300 flex items-center space-x-2">
                <AiOutlineUserAdd className="text-gray-600 hover:text-gray-800" size={20} />
                <span>Registrar Vehículo</span>
              </a>
            </li>
            <li>
              <a href="/login" className="text-gray-600 hover:text-gray-800 transition duration-300 flex items-center space-x-2">
                <BiLogIn className="text-black hover:text-gray-800" size={20} />
                <span>Login</span>
              </a>
            </li>
            <li>
              <a href="/products" className="text-gray-600 hover:text-gray-800 transition duration-300 flex items-center space-x-2">
                <span>Products</span>
              </a>
            </li>
            <li>
              <a href="/register" className="text-gray-600 hover:text-gray-800 transition duration-300 flex items-center space-x-2">
                <AiOutlineUserAdd className="text-black hover:text-gray-800" size={20} />
                <span>Register</span>
              </a>
            </li>
            <li>
              <a href="/login" className="text-gray-600 hover:text-gray-800 transition duration-300 flex items-center space-x-2">
                <BiLogOut className="text-black hover:text-gray-800" size={20} />
                <span>Salir</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
