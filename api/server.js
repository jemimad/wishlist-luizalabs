const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3000;

app.use(cors());

const fullData = require("./data/products.json");

app.get("/products", (req, res) => {
  const filteredProducts = fullData.products
    .filter((p) => p.available && p.stockAvailable)
    .map((p) => ({
      code: p.code,
      name: p.name,
      visible: p.visible,
      priceInCents: p.priceInCents,
      salePriceInCents: p.salePriceInCents,
      rating: p.rating,
      image: p.image,
    }));

  res.json(filteredProducts);
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
