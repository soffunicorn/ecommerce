import stockPrice from "../../mocks/stock-price";

export default function handler(req, res) {
  const {
    query: { sku },
  } = req;

  // Searching Stock & Price by SKU
  const searchingPrice = stockPrice[sku];

  if (!searchingPrice) {
    return res.status(404).json({ error: "Sku not found" });
  }

  // // Simula la actualización del stock y el precio cada 5 segundos para propósitos de prueba
  // setInterval(() => {
  //   // Actualiza el stock y el precio (reemplaza esta lógica con tu propia lógica de actualización)
  //   product.stock = Math.floor(Math.random() * 100) + 1; // Actualiza el stock con un valor aleatorio
  //   product.price = Math.floor(Math.random() * 10000) + 1000; // Actualiza el precio con un valor aleatorio

  //   // Emite una actualización a través de WebSocket o cualquier otro mecanismo de notificación
  //   // (puedes implementar esta parte según tus necesidades específicas)
  // }, 5000);

  res.status(200).json(searchingPrice);
}
