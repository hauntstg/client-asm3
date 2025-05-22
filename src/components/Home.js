import React, { useContext } from "react";
import Banner from "./home/Banner";
import Category from "./home/Category";
import TrendingProducts from "./home/TrendingProducts";
import MoreInfor from "./home/MoreInfor";
import classes from "./Home.module.css";
import { AuthContext } from "../components/store/AuthContext";

function HomePage() {
  const { isLogged, user } = useContext(AuthContext);
  // console.log(isLogged, user);
  return (
    <div className="container">
      <div className={classes.home + " row justify-content-center"}>
        <Banner />
        <Category />
        <TrendingProducts />
        <MoreInfor />
      </div>
    </div>
  );
}

export default HomePage;
