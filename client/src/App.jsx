import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DishManager from './pages/DishManager';
import Menu from './pages/Menu';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-3xl text-red-500 font-bold mb-4">
        ✅ Tailwind is working!
      </h1>

      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<DishManager />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
