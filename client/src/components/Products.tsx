import React, { useState, useEffect } from 'react';

interface Holder {
  _id: string;
  name: string;
}

interface Auto {
  _id: string;
  brand: string;
  model: string;
  year: number;
  holder?: Holder; 
  image: string;
  price: number;
}

const Products: React.FC = () => {
  const [autos, setAutos] = useState<Auto[]>([]);
  const [selectedAuto, setSelectedAuto] = useState<Auto | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadAutos();
  }, []);

  const loadAutos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/autos');
      const data = await response.json();
      setAutos(data);
    } catch (error) {
      console.error('Failed to load autos:', error);
    }
  };

  const editAuto = async (id: string, updatedAuto: Auto) => {
    try {
      const response = await fetch(`http://localhost:5000/api/autos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAuto),
      });
      if (response.ok) {
        alert('Auto updated successfully');
        loadAutos();
        setModalVisible(false);
      } else {
        const errorData = await response.json();
        console.error('Error updating auto', errorData);
        alert('Error updating the auto: ' + errorData.message);
      }
    } catch (error) {
      console.error('Failed to update auto:', error);
    }
  };

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-white">Concesionario DriveShop</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {autos.map((auto) => (
            <div key={auto._id} className="bg-white text-black p-4 rounded">
              <h2 className="text-xl font-bold">{auto.brand} {auto.model}</h2>
              <p>Año: {auto.year}</p>
              <p>Precio: ${auto.price}</p>
              <p>Titular: {auto.holder ? auto.holder.name : 'Desconocido'}</p>
              <img src={auto.image} alt={`${auto.brand} ${auto.model}`} className="w-full h-48 object-cover" />
              <button onClick={() => { setSelectedAuto(auto); setModalVisible(true); }}>Editar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;