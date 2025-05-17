import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dishRoutes from './routes/dishRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import menuRoutes from './routes/menuRoutes.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // serve static files
app.use('/api/categories', categoryRoutes);
app.use('/api/menus', menuRoutes);

app.use('/api/dishes', dishRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
