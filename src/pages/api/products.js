// api/products.js
import stockAndPrice from "./mocks/stock-price";
import products from "./mocks/products";

export default function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      return handleGetRequest(req, res, query);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function handleGetRequest(req, res, query) {
  const { productID } = query;

  if (productID !== undefined && productID !== "") {
    const requestedProducts = products.find(
      (product) => product.id === parseInt(productID)
    );

    const firstSkuCode = requestedProducts.skus[0]?.code;

    return res.status(200).json({
      ...requestedProducts,
      ...stockAndPrice[firstSkuCode],
      currentSku: firstSkuCode,
    });
  }

  const allProducts = products.map(({ id, brand, image, skus }) => {
    const findFirstPrice = stockAndPrice[skus[0]?.code]?.price;

    return {
      id,
      brand,
      image,
      skus,
      price: findFirstPrice,
    };
  });

  return res.status(200).json(allProducts);
}
