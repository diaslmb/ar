import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DishManager from './pages/DishManager';
import Menu from './pages/Menu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<DishManager />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

<h1 className="text-4xl text-blue-500 font-bold">Tailwind is working!</h1>


export default App;
