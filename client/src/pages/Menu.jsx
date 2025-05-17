import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@google/model-viewer';

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [selected, setSelected] = useState(null);

  const SERVER_IP = '192.168.137.116'; // your machine's local IP
  const BACKEND_PORT = '5000';

  useEffect(() => {
    axios.get('/api/dishes')
      .then(res => setDishes(res.data))
      .catch(err => console.error('Error fetching dishes:', err));
  }, []);

  return (
    <div className="bg-[#0F1A20] text-white min-h-screen p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">📋 Меню</h1>

      {dishes.map(dish => (
        <div
          key={dish.id}
          className="bg-[#15232B] rounded-lg px-3 py-2 mb-3 flex items-center gap-3 shadow-sm"
        >
          <img
            src={`http://${SERVER_IP}:${BACKEND_PORT}${dish.image_url}`}
            alt={dish.name}
            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
            onError={(e) => { e.target.style.display = 'none' }}
          />

          <div className="flex-1 overflow-hidden">
            <p className="font-semibold truncate">{dish.name}</p>
            <p className="text-sm text-gray-300">{dish.price} ₸</p>
          </div>

          <button
            onClick={() => setSelected(dish)}
            className="bg-yellow-400 hover:bg-yellow-300 text-black text-xl font-bold rounded-full w-8 h-8 flex items-center justify-center"
          >
            +
          </button>
        </div>
      ))}

      {/* AR Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-black rounded-lg w-full max-w-md p-4 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-3 text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-lg font-bold mb-2">{selected.name}</h2>
          
            <model-viewer
              src={`http://${SERVER_IP}:${BACKEND_PORT}${selected.model_url}`}
              ios-src={
                selected.model_url_usdz
                  ? `http://${SERVER_IP}:${BACKEND_PORT}${selected.model_url_usdz}`
                  : undefined
              }
              ar
              ar-modes="webxr scene-viewer quick-look"
              auto-rotate
              ar-scale="0.001 0.001 0.001"
              camera-controls
              style={{ width: '100%', height: '300px', background: '#000' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
