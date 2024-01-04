import Image from "next/image";
import Link from "next/link";
import { formattedPrice } from "../utils/helpers";

export interface Product {
  image: string;
  brand: string;
  price: number;
  id: number;
  skus?: { code: string; name: string }[];
}

const formattedNameToURL = (name: string) =>
  name.replace(/\s+/g, "-").toLowerCase();

const ProductsUI: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="home-products">
      {products?.map(({ brand, image, price, id }, indx) => {
        return (
          <article className="home-product" key={`${brand}-${id}-${indx}`}>
            <Link
              href={{
                pathname: `/${id}-${formattedNameToURL(brand)}`,
                query: { productID: id },
              }}
            >
              <h4 className="product-title">{brand}</h4>
              <Image
                src={image.toLowerCase()}
                alt="Image Product - Modelo Especial"
                width="122"
                height="122"
              />
              <div className="product-footer">
                <p className="product-price">{formattedPrice(price)}</p>
                <button className="product-plus">+</button>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
};
export default ProductsUI;
