import pool from '../db.js';



export const getAllDishes = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        dishes.*, 
        categories.name AS category_name, 
        categories.slug AS category_slug,
        categories.position
      FROM dishes
      LEFT JOIN categories ON dishes.category_id = categories.id
      ORDER BY categories.position, dishes.id DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const createDish = async (req, res) => {
  try {
    const { name, description, price, category_id, menu_id } = req.body;

    const image = req.files?.image?.[0]?.filename;
    const model = req.files?.model?.[0]?.filename;
    const usdz = req.files?.usdz?.[0]?.filename;

    const imageUrl = image ? `/uploads/${image}` : null;
    const modelUrl = model ? `/uploads/${model}` : null;
    const modelUrlUsdz = usdz ? `/uploads/${usdz}` : null;

    const query = `
      INSERT INTO dishes (
        name, description, price,
        image_url, model_url, model_url_usdz,
        category_id, menu_id
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;

    const values = [
      name,
      description,
      price,
      imageUrl,
      modelUrl,
      modelUrlUsdz,
      category_id,
      menu_id
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to create dish' });
  }
};

