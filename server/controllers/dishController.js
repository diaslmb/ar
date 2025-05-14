import { pool } from '../db.js';

export const getAllDishes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dishes ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createDish = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.files?.image?.[0]?.filename;
    const model = req.files?.model?.[0]?.filename;

    const imageUrl = image ? `/uploads/${image}` : null;
    const modelUrl = model ? `/uploads/${model}` : null;
    const usdz = req.files?.usdz?.[0]?.filename;
    const modelUrlUsdz = usdz ? `/uploads/${usdz}` : null;

    const query = `
  INSERT INTO dishes (name, description, price, image_url, model_url, model_url_usdz)
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
`;
const values = [name, description, price, imageUrl, modelUrl, modelUrlUsdz];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to create dish' });
  }
  console.log(req.files);
};
