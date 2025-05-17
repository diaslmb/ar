import express from 'express';
import multer from 'multer';
import { getAllDishes, createDish } from '../controllers/dishController.js';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// ✅ Use the actual controller
router.get('/', getAllDishes);

router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'model', maxCount: 1 },
    { name: 'usdz', maxCount: 1 },
  ]),
  createDish
);

export default router;
