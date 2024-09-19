import React, { useState, useEffect } from 'react';

interface Holder {
  _id: string;
  username: string; 
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedAuto) {
      const updatedAuto: Auto = {
        ...selectedAuto,
        model: (event.currentTarget as HTMLFormElement).autoModel.value,
        year: parseInt((event.currentTarget as HTMLFormElement).autoYear.value),
        price: parseFloat((event.currentTarget as HTMLFormElement).autoPrice.value),
        brand: (event.currentTarget as HTMLFormElement).autoBrand.value,
        holder: {
          _id: (event.currentTarget as HTMLFormElement).autoHolder.value,
          username: selectedAuto.holder?.username || 'Desconocido', 
        },
        image: (event.currentTarget as HTMLFormElement).autoImage.value,
      };
      editAuto(selectedAuto._id, updatedAuto);
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
              <p>Titular: {auto.holder ? auto.holder.username : 'Desconocido'}</p>
              <img src={auto.image} alt={`${auto.brand} ${auto.model}`} className="w-full h-48 object-cover" />
              <button
                className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-emerald-500"
                onClick={() => { setSelectedAuto(auto); setModalVisible(true); }}
              >
                Editar
              </button>
            </div>
          ))}
        </div>
        {modalVisible && selectedAuto && (
          <div className="modal fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="modal-content bg-white p-6 rounded shadow-lg">
              <span className="close cursor-pointer text-black" onClick={() => setModalVisible(false)}>&times;</span>
              <form onSubmit={handleEditSubmit} className='text-black'>
                <input type="text" name="autoModel" placeholder="Modelo" defaultValue={selectedAuto.model} required className="block w-full mb-2 p-2 border rounded" />
                <input type="number" name="autoYear" placeholder="Año" defaultValue={selectedAuto.year} required className="block w-full mb-2 p-2 border rounded" />
                <input type="number" name="autoPrice" placeholder="Precio" defaultValue={selectedAuto.price} required className="block w-full mb-2 p-2 border rounded" />
                <input type="text" name="autoBrand" placeholder="Marca" defaultValue={selectedAuto.brand} required className="block w-full mb-2 p-2 border rounded" />
                <input type="text" name="autoHolder" placeholder="Dueño Id" defaultValue={selectedAuto.holder?._id} required className="block w-full mb-2 p-2 border rounded" />
                <input type="text" name="autoImage" placeholder="Imagen" defaultValue={selectedAuto.image} required className="block w-full mb-2 p-2 border rounded" />
                <button type="submit" className="mt-2 px-4 py-2 bg-black text-white rounded hover:bg-emerald-500">Update Auto</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;