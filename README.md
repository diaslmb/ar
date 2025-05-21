# Installations
npm install bcrypt jsonwebtoken
npm install dotenv

# Database queries

-- Menus table
CREATE TABLE IF NOT EXISTS menus (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  menu_id INTEGER REFERENCES menus(id),
  UNIQUE(menu_id, slug)
);

-- Dishes table
CREATE TABLE IF NOT EXISTS dishes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url TEXT,
  model_url TEXT,
  model_url_usdz TEXT,
  menu_id INTEGER REFERENCES menus(id),
  category_id INTEGER REFERENCES categories(id)
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

INSERT INTO menus (name, slug) VALUES
('Основное меню', 'main'),
('Барное меню', 'bar');

-- Main menu categories
INSERT INTO categories (name, slug, position, menu_id) VALUES
('Салаты', 'salads', 1, 1),
('Пицца', 'pizza', 2, 1);

-- Bar menu categories
INSERT INTO categories (name, slug, position, menu_id) VALUES
('Холодные напитки', 'cold-drinks', 1, 2),
('Лимонады', 'lemonades', 2, 2);

-- Dishes under Main Menu
INSERT INTO dishes (name, description, price, menu_id, category_id)
VALUES
('Цезарь', 'Салат с курицей и соусом', 2500, 1, 1),
('Маргарита', 'Пицца с моцареллой и томатами', 3200, 1, 2);

-- Dishes under Bar Menu
INSERT INTO dishes (name, description, price, menu_id, category_id)
VALUES
('Coca-Cola', 'Газированный напиток', 1000, 2, 3),
('Лимонад мятный', 'Лимонад с мятой и лаймом', 1500, 2, 4);

