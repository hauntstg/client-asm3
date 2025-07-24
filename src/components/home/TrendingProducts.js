import React, { useEffect, useState } from "react";
import Popup from "../pages/Popup";
import { fetchProducts } from "../../services/homeServices";
import classes from "./TrendingProducts.module.css";

const API_URL = process.env.REACT_APP_API_URL;
function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await fetchProducts();
      setProducts(data.slice(0, 12));
    };
    fetchAPI();
  }, []);

  //hàm show popup
  function inforProductHandle(product) {
    setProduct(product);
    setIsOpen(true);
  }

  return (
    <>
      <Popup data={product} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className={classes["trending-products"] + " col-10"}>
        <div className={classes.title}>
          <p>MADE THE HARD WAY</p>
          <p>TOP TRENDING PRODUCTS</p>
        </div>
        <div className={classes.products}>
          {products &&
            products.map((product) => (
              <div className={classes.product} key={product._id}>
                <img
                  src={
                    product?.img1?.startsWith("http")
                      ? product?.img1
                      : API_URL + product?.img1
                  }
                  alt={product.name}
                  id={product._id.$oid}
                  onClick={() => {
                    inforProductHandle(product);
                  }}
                />
                <p>{product.name}</p>
                <p>{(+product.price).toLocaleString("de-DE")} VND</p>
                <p>
                  {product?.count > 0
                    ? `Còn lại: ${product?.count}`
                    : "Hết hàng"}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default TrendingProducts;
