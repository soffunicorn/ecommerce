// pages/[productId]-[productBrand].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "@/app/components/MobileNav";
import products from "./api/mocks/products";
import ProductsUI from "@/app/components/ProductsUI";
import "../app/globals.css";
import { formattedPrice } from "@/app/utils/helpers";

type SkuProp = {
  code: string;
  name: string;
};

type ProductInfo = {
  id: number;
  brand: string;
  image: string;
  style: string;
  substyle: string;
  abv: string;
  origin: string;
  information: string;
  skus: SkuProp[];
  currentSku: number;
  stock: number;
  price: number;
};

const MAX_INFO_LENGTH = 150;

const formattedName = (name: string): string => {
  const subIndx = name.indexOf("oz");

  return subIndx !== -1 ? name.substring(0, subIndx + 2) : name;
};

const showMoreDescription = (element: HTMLSpanElement) => {
  const info = document.querySelector(".pdp-description");

  if (info) {
    info.classList.remove("ellipsis");
    element.classList.add("hidden");
  }
};

const formattedInfo = (info: string) => {
  const infoLength = info.length;
  const shouldShowMore = infoLength > MAX_INFO_LENGTH;
  return (
    <div className="pdp-description-wrapper">
      <p className={`pdp-description ${shouldShowMore ? "ellipsis" : ""}`}>
        {info}
      </p>
      {shouldShowMore && (
        <span
          className="pdp-read-more"
          onClick={(e) => showMoreDescription(e.currentTarget)}
        >
          Read More
        </span>
      )}
    </div>
  );
};

const fetchStockAndPrice = async (currentSku: number) => {
  try {
    const res = await fetch(`/api/stock-price/code/${currentSku}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const ProductDetailPage = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<ProductInfo | undefined>();
  const [productPrice, setProductPrice] = useState<string | undefined>();
  const [productStock, setProductStock] = useState<number | undefined>();
  const [currentSku, setCurrentSku] = useState<number>();
  const [productSkus, setProductSkus] = useState<SkuProp[] | undefined>();

  const { productID } = router.query;

  useEffect(() => {
    if (currentSku === undefined) {
      const fetchData = async () => {
        if (productID) {
          const res = await fetch(`/api/products?productID=${productID}`);
          const data = await res.json();
          setProductInfo(data);
          setProductPrice(formattedPrice(parseInt(data.price)));
          setProductStock(data.stock);
          setProductSkus(data.skus);
          setCurrentSku(parseInt(data.currentSku));
        }
      };
      fetchData();
    }
  }, [productID]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentSku !== undefined) {
        const response = await fetchStockAndPrice(currentSku);
        const { price, stock } = response;
        setProductPrice(formattedPrice(parseInt(price)));
        setProductStock(stock);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [currentSku]);

  if (!productID) {
    return null;
  }

  return productInfo !== undefined ? (
    <main>
      <article className="pdp-product">
        <section className="pdp-product-header">
          <MobileNav buttonType="pdp-menu" content={<p> Detail</p>} />
          <Image
            src={productInfo.image}
            alt={productInfo.brand}
            width={240}
            height={240}
          />
        </section>
        <div className="pdp-body">
          <div className="pdp-body-title">
            <div>
              <h1>{productInfo.brand}</h1>
              <p className="pdp-product-info">
                Origin: {productInfo.origin} | Stock: {productStock}
              </p>
            </div>

            <p className="pdp-price">{productPrice}</p>
          </div>

          <h3 className="pdp-description-title">Description</h3>
          {formattedInfo(productInfo.information)}

          <h3 className="pdp-description-title">Sizes</h3>
          <div className="pdp-size-wrap">
            {productSkus?.map(({ code, name }) => (
              <button
                onClick={() => setCurrentSku(parseFloat(code))}
                className={`pdp-size-btn ${
                  currentSku === parseInt(code) ? "current" : ""
                }`}
                key={formattedName(name)}
              >
                {formattedName(name)}
              </button>
            ))}
          </div>
          <div className="pdp-bottom-menu">
            <button className="pdp-bag-btn">
              <Image src="../icons/bag.svg" alt="bag" height={24} width={24} />
            </button>
            <button className="pdp-cart-btn"> Add to Cart</button>
          </div>
        </div>
      </article>
    </main>
  ) : null;
};

export default ProductDetailPage;
