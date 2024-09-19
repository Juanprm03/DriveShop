import React from 'react';

const RegisterAuto: React.FC = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const brand = (document.getElementById('marca') as HTMLInputElement).value;
    const model = (document.getElementById('modelo') as HTMLInputElement).value;
    const year = (document.getElementById('year') as HTMLInputElement).value;
    const holder = (document.getElementById('holder') as HTMLInputElement).value;
    const price = (document.getElementById('precio') as HTMLInputElement).value;
    const image = (document.getElementById('imagen') as HTMLInputElement).value;

    // Corrige el uso de `Image` a `image` en la validación
    if (!brand || !model || !year || !holder || !price || !image) {
      alert('Todos los campos son requeridos.');
      return;
    }

    const autoData = { brand, model, year, holder, image, price };

    try {
      const response = await fetch('http://localhost:5000/api/autos/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(autoData),
      });

      if (response.ok) {
        await response.json();
        alert('Auto registrado exitosamente');
        (document.getElementById('auto-form') as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        alert('Error al registrar el auto: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error al registrar el auto:', error);
      alert('Error al registrar el auto. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  return (
    <form id="auto-form" onSubmit={handleSubmit}>
      <input type="text" id="marca" placeholder="Marca" required />
      <input type="text" id="modelo" placeholder="Modelo" required />
      <input type="number" id="year" placeholder="Año" required />
      <input type="text" id="holder" placeholder="ID Dueño" required />
      <input type="number" id="precio" placeholder="Precio" required />
      <input type="text" id="imagen" placeholder="URL de la imagen" required />
      <button type="submit">Registrar Auto</button>
    </form>
  );
};

export default RegisterAuto;