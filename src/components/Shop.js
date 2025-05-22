import React, { useEffect } from "react";
import ShopCategory from "./shop/ShopCategory";
import classes from "./Shop.module.css";

function ShopPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className={classes["top-bg"]}>
            <div className={classes.shopshop}>
              <span>SHOP</span>
              <span>SHOP</span>
            </div>
          </div>
        </div>
        <ShopCategory />
      </div>
    </div>
  );
}

export default ShopPage;

export async function loader({ request, params }) {
  return null;
}
