import React from 'react';

const RegisterAuto: React.FC = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const brand = (document.getElementById('marca') as HTMLInputElement).value;
    const model = (document.getElementById('modelo') as HTMLInputElement).value;
    const year = (document.getElementById('year') as HTMLInputElement).value;
    const holder = (document.getElementById('owner') as HTMLInputElement).value;
    const price = (document.getElementById('precio') as HTMLInputElement).value;
    const Image = (document.getElementById('imagen') as HTMLInputElement).value;

    if (!brand || !model || !year || !holder || !price || !Image) {
      alert('Todos los campos son requeridos.');
      return;
    }

    const autoData = { brand, model, year, holder, Image, price };

    try {
      const response = await fetch('http://localhost:5000/api/autos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(autoData),
      });

      if (response.ok) {
        await response.json();
        alert('Auto register successfully');
        (document.getElementById('auto-form') as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        alert('Error al registrar el auto: ' + errorData.message);
      }
    } catch (error) {
      alert('Hubo un problema al registrar el auto.');
    }
  };

  return (
    <>

      <main className="min-h-screen flex items-center justify-center p-4">
        <form
          id="auto-form"
          className="form-background p-8 rounded-lg shadow-lg border-2 border-white max-w-lg w-full"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-emerald-700">Registra tu Auto</h2>
          <div className="mb-6">
            <label htmlFor="marca" className="block text-lg font-semibold text-white mb-2">
              Marca del Auto
            </label>
            <input
              type="text"
              id="marca"
              name="marca"
              placeholder="Ej. Toyota, Ford"
              className="w-full p-3 rounded-md text-black focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="modelo" className="block text-lg font-semibold text-white mb-2">
              Modelo del Auto
            </label>
            <input
              type="text"
              id="modelo"
              name="modelo"
              placeholder="Ej. Corolla, Mustang"
              className="w-full p-3 rounded-md text-black focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="year" className="block text-lg font-semibold text-white mb-2">
              Año del Auto
            </label>
            <input
              type="number"
              id="year"
              name="year"
              placeholder="Ej. 2020"
              className="w-full p-3 rounded-md text-black focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="owner" className="block text-lg font-semibold text-white mb-2">
              Propietario
            </label>
            <input
              type="text"
              id="owner"
              name="owner"
              placeholder="Nombre del propietario"
              className="w-full p-3 rounded-md text-black focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="precio" className="block text-lg font-semibold text-white mb-2">
              Precio
            </label>
            <input
              type="number"
              id="precio"
              name="precio"
              placeholder="Ej. 20000"
              className="w-full p-3 rounded-md text-black focus:bg-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="imagen" className="block text-lg font-semibold text-white mb-2">
              URL de la Imagen
            </label>
            <input
              type="url"
              id="imagen"
              name="imagen"
              placeholder="Link a la imagen del auto"
              className="w-full p-3 rounded-md text-black focus:bg-white focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300"
          >
            Registrar Auto
          </button>
        </form>
      </main>
    </>
  );
};

export default RegisterAuto;
