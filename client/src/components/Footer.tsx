import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-900 text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-center text-sm mb-2">&copy; 2024 DriveShop. Conduce tu futuro hoy.</p>
          <p className="text-center text-sm mb-4"> ¡Tu próximo auto te espera!</p>
          <div className="text-center mb-4">
            <p className="text-sm">Desarrollado por Juan Pablo Ruiz Marin</p>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
