const express = require("express");
const { nanoid } = require("nanoid");
const router = express.Router();

// Начальные данные (10 товаров)
let products = [
  {
    id: nanoid(6),
    title: "Пудра рассыпчатая",
    subtitle: "Influence",
    price: 1999,
    rating: 4.8,
  },
  {
    id: nanoid(6),
    title: "Тональный крем",
    subtitle: "MAC",
    price: 3500,
    rating: 4.7,
  },
  {
    id: nanoid(6),
    title: "Помада матовая",
    subtitle: "NYX",
    price: 890,
    rating: 4.5,
  },
  {
    id: nanoid(6),
    title: "Тушь для ресниц",
    subtitle: "Maybelline",
    price: 1200,
    rating: 4.6,
  },
  {
    id: nanoid(6),
    title: "Хайлайтер",
    subtitle: "Rare Beauty",
    price: 2800,
    rating: 4.9,
  },
  {
    id: nanoid(6),
    title: "Консилер",
    subtitle: "Tarte",
    price: 2100,
    rating: 4.7,
  },
  {
    id: nanoid(6),
    title: "Палетка теней",
    subtitle: "Morphe",
    price: 3200,
    rating: 4.8,
  },
  {
    id: nanoid(6),
    title: "Бронзер",
    subtitle: "Fenty Beauty",
    price: 2900,
    rating: 4.6,
  },
  {
    id: nanoid(6),
    title: "Румяна",
    subtitle: "Dior",
    price: 3700,
    rating: 4.9,
  },
  {
    id: nanoid(6),
    title: "Спрей для фиксации",
    subtitle: "Urban Decay",
    price: 2600,
    rating: 4.5,
  },
];

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Возвращает список всех товаров
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", (req, res) => {
  res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получает товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создает новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - subtitle
 *               - price
 *               - rating
 *             properties:
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               price:
 *                 type: number
 *               rating:
 *                 type: number
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", (req, res) => {
  const { title, subtitle, price, rating } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required (string)" });
  }

  if (typeof subtitle !== "string" || subtitle.trim() === "") {
    return res.status(400).json({ error: "subtitle is required (string)" });
  }

  if (typeof price !== "number" || isNaN(price) || price <= 0) {
    return res.status(400).json({ error: "price must be a positive number" });
  }

  if (typeof rating !== "number" || isNaN(rating) || rating < 0 || rating > 5) {
    return res
      .status(400)
      .json({ error: "rating must be a number between 0 and 5" });
  }

  const newProduct = {
    id: nanoid(6),
    title: title.trim(),
    subtitle: subtitle.trim(),
    price: price,
    rating: rating,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});
/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновляет товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               price:
 *                 type: number
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Обновленный товар
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Нет данных для обновления
 *       404:
 *         description: Товар не найден
 */
router.patch("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const { title, subtitle, price, rating } = req.body;

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .json({ error: "title must be a non-empty string" });
    }
    product.title = title.trim();
  }

  if (subtitle !== undefined) {
    if (typeof subtitle !== "string" || subtitle.trim() === "") {
      return res
        .status(400)
        .json({ error: "subtitle must be a non-empty string" });
    }
    product.subtitle = subtitle.trim();
  }

  if (price !== undefined) {
    if (typeof price !== "number" || isNaN(price) || price <= 0) {
      return res.status(400).json({ error: "price must be a positive number" });
    }
    product.price = price;
  }

  if (rating !== undefined) {
    if (
      typeof rating !== "number" ||
      isNaN(rating) ||
      rating < 0 ||
      rating > 5
    ) {
      return res
        .status(400)
        .json({ error: "rating must be a number between 0 and 5" });
    }
    product.rating = rating;
  }

  res.json(product);
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удаляет товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Товар успешно удален
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *       404:
 *         description: Товар не найден
 */
router.delete("/:id", (req, res) => {
  const exists = products.some((p) => p.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: "Product not found" });
  }

  products = products.filter((p) => p.id !== req.params.id);
  res.json({ ok: true });
});

module.exports = router;
