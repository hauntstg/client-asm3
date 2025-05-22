import { useContext, useEffect, useState } from "react";
import { fetchOrder } from "../../services/orderServices";
import { AuthContext } from "../store/AuthContext";
import classes from "./CheckoutForm.module.css";
import { Form, useActionData, useNavigate } from "react-router-dom";

let totalBill = 0;
function CheckoutForm() {
  const navigate = useNavigate();
  const dataEntered = useActionData();

  const { isLogged, user, fetchProfile } = useContext(AuthContext);
  const [productsOfUser, setProductsOfUser] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (isLogged && user) {
      setFormData({
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
        address: "",
      });
      totalBill = user.cart.reduce(
        (accumulator, currentValue) =>
          accumulator + +currentValue.productId.price * currentValue.quantity,
        0
      );
      setProductsOfUser(user.cart || []);
    }
  }, [isLogged, user]);

  useEffect(() => {
    if (dataEntered?.message) {
      const data = { ...formData };
      data.userId = user._id;
      data.total_price = totalBill;
      data.items = user.cart;
      // console.log(data);
      const fetchAPI = async () => {
        const response = await fetchOrder(data);
        await fetchProfile();
        // console.log(response);
      };
      fetchAPI();

      alert(dataEntered.message);
      navigate("/");
    }
  }, [dataEntered]);

  // đặt hàng thành công thì alert ra message

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function submitHandle(e) {
    const checkCart = productsOfUser.some(
      (product) =>
        product.productId.count === 0 ||
        product.quantity > product.productId.count
    );
    if (checkCart) {
      alert(
        "Sản phẩm vượt quá số lượng hoặc đã hết hàng!\nXin chọn lại số lượng hoặc xóa sản đã phẩm hết hàng!"
      );
      e.preventDefault();
      return;
    }
  }

  return (
    <div className="col-10">
      <div className={classes.title}>BILLING DETAILS</div>
      <div className="container p-0">
        <div className="row justify-content-center pb-4">
          <div className="col-6">
            <Form
              action="/checkout"
              method="POST"
              className={classes.form}
              onSubmit={submitHandle}
            >
              <label>FULL NAME:</label>
              {user && (
                <input
                  type="text"
                  placeholder="Enter Your Full Name Here!"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              )}
              <label>EMAIL:</label>
              {user && (
                <input
                  type="text"
                  placeholder="Enter Your Email Here!"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              )}
              <label>PHONE NUMBER:</label>
              {user && (
                <input
                  type="text"
                  placeholder="Enter Your Phone Number Here!"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              )}
              <label>ADDRESS:</label>
              <input
                type="text"
                placeholder="Enter Your Address Here!"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <button>Place order</button>
            </Form>
            {!dataEntered?.message && dataEntered && (
              <ul className={classes.error}>
                {Object.values(dataEntered).map((err, index) => (
                  <li key={err + index}>{err}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="col-6">
            <div className={classes.order}>
              <p>YOUR ORDER</p>
              <div className={classes.bill}>
                {isLogged &&
                  productsOfUser.map((prod) => (
                    <div
                      className={classes["wrap-product"]}
                      key={prod.productId._id}
                    >
                      <div className={classes.name}>{prod.productId.name}</div>
                      <div className={classes.price}>
                        {(+prod.productId.price).toLocaleString("de-DE")} VND x{" "}
                        {prod.quantity}
                      </div>
                    </div>
                  ))}
                <div className={classes.total}>
                  <div className={classes["total-title"]}>TOTAL</div>
                  <div className={classes["total-price"]}>
                    {isLogged ? totalBill.toLocaleString("de-DE") : 0} VND
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
