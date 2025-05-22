import { useRef } from "react";
import { AuthContext } from "../store/AuthContext";
import { fetchUpdateCart } from "../../services/cartServices";
import classes from "./CartHandle.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL;
function CartHandle() {
  const { isLogged, user, fetchProfile } = useContext(AuthContext);
  const [productsOfUser, setProductsOfUser] = useState([]);
  const navigate = useNavigate();

  const refQuantity = useRef();

  useEffect(() => {
    if (isLogged && user) {
      setProductsOfUser(user.cart || []);
    }
  }, [isLogged, user]);

  const total = productsOfUser.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.productId.price * currentValue.quantity,
    0
  );

  async function decrementHandle(e) {
    // // thẻ i nằm trong thẻ p, chỉ có thẻ p là có id nên khi click vào thẻ i sẽ ko get đc id => sử dụng closest để tìm thằng cha gần nhất
    const idClicked = e.target.closest("p").id;
    const indexOfProduct = productsOfUser.findIndex(
      (prod) => prod.productId._id === idClicked
    );
    const newCart = [...productsOfUser];
    if (newCart[indexOfProduct].quantity > 1)
      newCart[indexOfProduct].quantity--;
    const cartToUpdate = newCart.map((prod) => {
      return { productId: prod.productId, quantity: prod.quantity };
    });
    console.log(cartToUpdate);
    const response = await fetchUpdateCart({ cartToUpdate, user });
    // console.log(response);
    setProductsOfUser((prev) => {
      return [...newCart];
    });
  }

  async function incrementHandle(e) {
    const idClicked = e.target.closest("p").id;
    const indexOfProduct = productsOfUser.findIndex(
      (prod) => prod.productId._id === idClicked
    );
    const newCart = [...productsOfUser];
    newCart[indexOfProduct].quantity++;
    const cartToUpdate = newCart.map((prod) => {
      return { productId: prod.productId, quantity: prod.quantity };
    });
    const response = await fetchUpdateCart({ cartToUpdate, user });
    setProductsOfUser(newCart);
  }

  // onChange input: khi nhập tay vào input thay vì click vào button decrement hay increment
  async function changeQuantityHandle(e) {
    const idClicked = e.target.id;
    console.log(e.target.value);
    const indexOfProduct = productsOfUser.findIndex(
      (prod) => prod.productId._id === idClicked
    );
    const newCart = [...productsOfUser];
    newCart[indexOfProduct].quantity = +e.target.value;
    const cartToUpdate = newCart.map((prod) => {
      return { productId: prod.productId, quantity: prod.quantity };
    });
    const response = await fetchUpdateCart({ cartToUpdate, user });
    setProductsOfUser(newCart);
  }

  // xóa sản phẩm khỏi giỏ hàng
  async function removeProductHandle(e) {
    const idClicked = e.target.id;
    const newCart = [...productsOfUser].filter(
      (prod) => prod.productId._id !== idClicked
    );
    const cartToUpdate = newCart.map((prod) => {
      return { productId: prod.productId, quantity: prod.quantity };
    });
    const response = await fetchUpdateCart({ cartToUpdate, user });
    setProductsOfUser(newCart);
    await fetchProfile();
  }

  function handleRedirect() {
    const checkCart = productsOfUser.some(
      (product) =>
        product.productId.count === 0 ||
        product.quantity > product.productId.count
    );
    if (checkCart) {
      alert(
        "Sản phẩm vượt quá số lượng hoặc đã hết hàng!\nXin chọn lại số lượng hoặc xóa sản đã phẩm hết hàng!"
      );
      return;
    }
    navigate("/checkout");
  }

  return (
    <div className="col-10">
      <div className="container p-0">
        <div className={classes.shoppingcart + " row"}>
          <div className={classes.title + " col-12"}>SHOPPING CART</div>
          <div className="col-8">
            <table className={classes.table}>
              <thead>
                <tr>
                  <th scope="col">IMAGE</th>
                  <th scope="col">PRODUCT</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">QUANTITY</th>
                  <th scope="col">REMAINING</th>
                  <th scope="col">TOTAL</th>
                  <th scope="col">REMOVE</th>
                </tr>
              </thead>
              <tbody>
                {isLogged &&
                  productsOfUser?.map((prod) => (
                    <tr key={prod.productId.name}>
                      <td className={classes.img}>
                        <img
                          src={
                            prod.productId.img1.startsWith("http")
                              ? prod.productId.img1
                              : API_URL + prod.productId.img1
                          }
                          alt="product"
                        />
                      </td>
                      <td className={classes.name}>{prod.productId.name}</td>
                      <td className={classes.price}>
                        {(+prod.productId.price).toLocaleString("de-DE")} VND
                      </td>
                      <td className={classes.quantity}>
                        <div>
                          <p onClick={decrementHandle} id={prod.productId._id}>
                            <i
                              className="fa fa-caret-up"
                              aria-hidden="true"
                            ></i>
                          </p>
                          <input
                            type="number"
                            value={prod.quantity}
                            key={prod.productId._id}
                            min="1"
                            ref={refQuantity}
                            onChange={changeQuantityHandle}
                            id={prod.productId._id}
                          />
                          <p onClick={incrementHandle} id={prod.productId._id}>
                            <i
                              className="fa fa-caret-down"
                              aria-hidden="true"
                            ></i>
                          </p>
                        </div>
                      </td>
                      <td className={classes.remaining}>
                        {prod.productId.count}
                      </td>
                      <td className={classes.price}>
                        {(+prod.productId.price * prod.quantity).toLocaleString(
                          "de-DE"
                        )}{" "}
                        VND
                      </td>
                      <td className={classes.remove}>
                        <i
                          className="fa fa-trash-o"
                          aria-hidden="true"
                          onClick={removeProductHandle}
                          id={prod.productId._id}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="col-4">
            <div className={classes["wrap-carttotal"]}>
              <p>CART TOTAL</p>
              <div className={classes.carttotal}>
                <div className={classes["subtotal-title"]}>SUBTOTAL</div>
                <div className={classes["subtotal-value"]}>
                  {isLogged && productsOfUser
                    ? total.toLocaleString("de-DE")
                    : 0}
                  &nbsp;VND
                </div>
                <div className={classes["total-title"]}>TOTAL</div>
                <div className={classes["total-value"]}>
                  {isLogged && productsOfUser
                    ? total.toLocaleString("de-DE")
                    : 0}
                  &nbsp;VND
                </div>
                <input type="text" />
                <button>
                  <i className="fa fa-gift" aria-hidden="true"></i> &nbsp;Apply
                  coupon
                </button>
              </div>
            </div>
          </div>
          <div className={classes.redirect + " col-8"}>
            <div className={classes["wrap-redirect"]}>
              <Link className={classes.shopping} to="/shop">
                <i className="fa fa-long-arrow-left" aria-hidden="true"></i>{" "}
                &nbsp;Continue shopping
              </Link>
              <Link className={classes.checkout} onClick={handleRedirect}>
                Proceed to checkout &nbsp;
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartHandle;
