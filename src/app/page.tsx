"use client";
import Image from "next/image";
import ProductsUI from "./components/ProductsUI";
import { useEffect, useState } from "react";
import type { Product } from "./components/ProductsUI";
import MobileNav from "./components/MobileNav";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <section className="section-body">
        <MobileNav buttonType="home-menu" />

        <div className="home-welcome bottom-separator">
          <p>Hi Mr. Michael,</p>
          <h1>Welcome Back!</h1>
        </div>

        <section className="home-searchbox bottom-separator">
          <form>
            <div className="search-box-wrapper">
              <Image
                src="/icons/search.svg"
                alt="search-box"
                className="search-icon"
                width="24"
                height="24"
              />
              <input
                type="text"
                placeholder="Search burger, pizza, drink or etc..."
                aria-label="Search"
                // onFocus="setFocusclassName(this, true)"
                // onblur="setFocusclassName(this, false)"
              />
            </div>
          </form>
        </section>
        <div className="home-section bottom-separator">
          <div className="home-section-category">
            <h3 className="home-section-title">Drink Category</h3>
            <a className="home-section-link" href="#">
              See All
            </a>
          </div>

          <div className="home-categories">
            <button className="drink-category-btn">All</button>
            <button className="drink-category-btn selected">
              <Image
                src="/icons/beer.png"
                width="20"
                height="20"
                alt="beer image"
              />
              Beer
            </button>
            <button className="drink-category-btn">
              <Image
                src="/icons/wine-glass.png"
                width="20"
                height="20"
                alt="wine image"
              />
              Wine
            </button>
          </div>
        </div>
        <div className="home-section-category">
          <h3 className="home-section-title">Popular</h3>
          <a className="home-section-link" href="#">
            See All
          </a>
        </div>

        {products.length > 0 && <ProductsUI products={products} />}
      </section>
      <footer>
        <nav>
          <ul className="footer-menu">
            <li className="home-icon selected">
              <a href="#">
                <Image
                  src="/icons/home.svg"
                  width="83"
                  height="77"
                  alt="home"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <Image
                  src="/icons/checkout.svg"
                  width="24"
                  height="24"
                  alt="checkout"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <Image
                  src="/icons/bag.svg"
                  width="24"
                  height="24"
                  alt="your purchases"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <Image
                  src="/icons/settings.svg"
                  width="24"
                  height="24"
                  alt="Settings"
                />
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </main>
  );
}
