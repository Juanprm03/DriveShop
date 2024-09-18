import React, { useState, useEffect } from 'react';



interface Auto {
  _id: string;
  model: string;
  year: number;
  price: number;
  brand: string;
  holder: string;
  Image: string;
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
      const response = await fetch('http://localhost:5000/api/cars');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const autosData = await response.json();
      setAutos(autosData);
    } catch (error) {
      console.error('Failed to fetch autos:', error);
      setAutos([]);
    }
  };

  const deleteAuto = async (autoId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cars/${autoId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        alert('Vehículo eliminado exitosamente');
        loadAutos();
      } else {
        const errorData = await response.json();
        console.error('Error to delete auto:', errorData);
        alert('Error to delete auto: ' + errorData.message);
      }
    } catch (error) {
      console.error('Failed to delete car:', error);
    }
  };

  const showEditModal = (auto: Auto) => {
    setSelectedAuto(auto);
    setModalVisible(true);
  };

  const editAuto = async (autoId: string, updatedAuto: Omit<Auto, '_id'>) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cars/${autoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAuto),
      });
      if (response.ok) {
        alert('Auto updated successfully');
        loadAutos();
        setModalVisible(false);
      } else {
        const errorData = await response.json();
        console.error('Error update Auto', errorData);
        alert('Error update the Auto ' + errorData.message);
      }
    } catch (error) {
      console.error('Failed to update auto:', error);
    }
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedAuto) {
        const updatedAuto = {
            model: (event.currentTarget as HTMLFormElement).carModel.value,
            year: parseInt((event.currentTarget as HTMLFormElement).carYear.value),
            price: parseFloat((event.currentTarget as HTMLFormElement).carPrice.value),
            brand: (event.currentTarget as HTMLFormElement).carBrand.value,
            holder: (event.currentTarget as HTMLFormElement).carHolder.value,
            Image: (event.currentTarget as HTMLFormElement).carImage.value,
        };
      editAuto(selectedAuto._id, updatedAuto);
    }
  };

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-white">Concesionario DriveShop</h1>
        <p className="text-center mt-4 text-gray-300">Explora nuestra amplia gama de Autos y encuentra el perfecto para ti.</p>
        <div id="car-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {autos.length === 0 ? (
            <p className="text-center text-gray-400">No hay carros disponibles en este momento.</p>
          ) : (
            autos.map((auto) => (
              <div key={auto._id} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                <h2 className="text-xl font-bold">{auto.brand} {auto.model} ({auto.year})</h2>
                <p className="text-gray-400">Propietario: {auto.holder}</p>
                <p className="text-gray-400">Precio: ${auto.price}</p>
                <img src={auto.Image} alt="Imagen del Carro" className="w-full h-auto mt-4 mb-4 rounded-lg"/>
                <div className="flex justify-between">
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded shadow-lg transition-transform transform hover:scale-105"
                    onClick={() => deleteAuto(auto._id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow-lg transition-transform transform hover:scale-105"
                    onClick={() => showEditModal(auto)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))
          )};
        </div>
        {modalVisible && selectedAuto && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg w-full max-w-lg">
              <button
                className="absolute top-4 right-4 text-white text-2xl"
                onClick={() => setModalVisible(false)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">Editar Carro</h2>
              <form id="editForm" onSubmit={handleEditSubmit}>
                <label htmlFor="carModel" className="block text-gray-400 mb-2">Modelo:</label>
                <input
                  type="text"
                  id="carModel"
                  name="model"
                  defaultValue={selectedAuto.model}
                  className="w-full mb-4 p-2 border border-gray-600 bg-gray-800 text-white rounded"
                  required
                />
                <label htmlFor="carYear" className="block text-gray-400 mb-2">Año:</label>
                <input
                  type="number"
                  id="carYear"
                  name="year"
                  defaultValue={selectedAuto.year}
                  className="w-full mb-4 p-2 border border-gray-600 bg-gray-800 text-white rounded"
                  required
                />
                <label htmlFor="carPrice" className="block text-gray-400 mb-2">Precio:</label>
                <input
                  type="number"
                  id="carPrice"
                  name="price"
                  defaultValue={selectedAuto.price}
                  className="w-full mb-4 p-2 border border-gray-600 bg-gray-800 text-white rounded"
                  required
                />
                <input type="hidden" id="carId" name="id" value={selectedAuto._id} />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mt-4 rounded shadow-lg transition-transform transform hover:scale-105"
                >
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;