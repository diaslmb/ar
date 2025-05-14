import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DishManager = () => {
  const [dishes, setDishes] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    model: null,
  });

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    const res = await axios.get('/api/dishes');
    setDishes(res.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('image', form.image);
    formData.append('model', form.model);
    formData.append('usdz', form.usdz);


    await axios.post('/api/dishes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setForm({ name: '', description: '', price: '', image: null, model: null });
    fetchDishes();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Dish</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} className="w-full p-2 border" required />
        <input name="description" placeholder="Description" onChange={handleChange} value={form.description} className="w-full p-2 border" />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} value={form.price} className="w-full p-2 border" required />
        <input name="image" type="file" accept="image/*" onChange={handleChange} className="w-full" />
        <input name="model" type="file" accept=".glb,.gltf" onChange={handleChange} className="w-full" />
        <input name="usdz" type="file" accept=".usdz" onChange={handleChange} className="w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>

      <h3 className="text-lg font-bold mt-8 mb-2">Existing Dishes</h3>
      <ul className="space-y-2">
        {dishes.map((dish) => (
          <li key={dish.id} className="border p-3 rounded">
            <p><strong>{dish.name}</strong> — {dish.price}₸</p>
            {dish.image_url && <img src={dish.image_url} alt={dish.name} className="w-32 mt-2" />}
            {dish.model_url && <p className="text-sm mt-1 text-blue-500">Model: {dish.model_url}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DishManager;
