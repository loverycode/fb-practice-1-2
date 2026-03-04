const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = 3002;

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(
      `[${new Date().toISOString()}] [${req.method}] ${res.statusCode} ${req.path}`,
    );
    if (req.method === "POST" || req.method === "PATCH") {
      console.log("Body:", req.body);
    }
  });
  next();
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API интернет-магазина",
      version: "1.0.0",
      description: "API для управления товарами",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Локальный сервер",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          required: ["title", "subtitle", "price", "rating"],
          properties: {
            id: {
              type: "string",
              description: "Уникальный ID товара",
              example: "abc123",
            },
            title: {
              type: "string",
              description: "Название товара",
              example: "Пудра рассыпчатая",
            },
            subtitle: {
              type: "string",
              description: "Производитель",
              example: "Influence",
            },
            price: {
              type: "number",
              description: "Цена товара",
              example: 1999,
            },
            rating: {
              type: "number",
              description: "Рейтинг (0-5)",
              example: 4.8,
            },
          },
        },
      },
    },
  },

  apis: ["./routes/products.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${port}`);
  console.log(`📚 Swagger документация: http://localhost:${port}/api-docs`);
});
