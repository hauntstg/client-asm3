import React from "react";
import classes from "./Category.module.css";
import { useNavigate } from "react-router-dom";

function Category() {
  const navigate = useNavigate();
  return (
    <div className={classes.category + " col-10"}>
      <div className={classes.title}>
        <p>CAREFULLY CREATED COLLECTIONS</p>
        <p>BROWSE OUR CATEGORIES</p>
      </div>
      <div className={classes.products}>
        <img
          src="./images/product_1.png"
          alt="iphone"
          onClick={() => {
            navigate("shop/iphone");
          }}
        />
        <img
          src="./images/product_2.png"
          alt="mac"
          onClick={() => {
            navigate("shop/macbook");
          }}
        />
        <img
          src="./images/product_3.png"
          alt="ipad"
          onClick={() => {
            navigate("shop/ipad");
          }}
        />
        <img
          src="./images/product_4.png"
          alt="watch"
          onClick={() => {
            navigate("shop/watch");
          }}
        />
        <img
          src="./images/product_5.png"
          alt="airpods"
          onClick={() => {
            navigate("shop/airpod");
          }}
        />
      </div>
    </div>
  );
}

export default Category;
