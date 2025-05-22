import { fetchOrderDetail } from "../../services/orderServices";
import classes from "./OrderDetail.module.css";
import { useLoaderData } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;
export default function OrderDetail() {
  const data = useLoaderData();
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className={classes["top-bg"]}>
            <div className={classes.orderDetail}>
              <span>ORDER DETAIL</span>
              <span>
                HISTORY / ORDER /
                <span style={{ color: "var(--color-gray-500)" }}>
                  {" "}
                  ORDER DETAIL
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="col-10">
          <div className="container p-0">
            <div className="row">
              <div className={classes.inforOrder + " col-12 pt-5"}>
                <h3>INFORMATION ORDER</h3>
                <div>ID User: {data.userId}</div>
                <div>Full Name: {data.user.fullname}</div>
                <div>Phone: {data.user.phone}</div>
                <div>Address: {data.user.address}</div>
                <div>Total: {data.total_price.toLocaleString("de-DE")} VND</div>
              </div>
              <div className={`${classes.wrapTable} col-12 pt-5`}>
                <table className={classes.table}>
                  <thead>
                    <tr>
                      <th scope="col">ID PRODUCT</th>
                      <th scope="col">IMAGE</th>
                      <th scope="col">NAME</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">COUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((order) => (
                      <tr key={order._id}>
                        <td className={classes.productId}>
                          {order.productId._id}
                        </td>
                        <td className={classes.img}>
                          <img
                            src={
                              order.productId.img1.startsWith("http")
                                ? order.productId.img1
                                : API_URL + order.productId.img1
                            }
                            alt="product"
                          />
                        </td>
                        <td className={classes.name}>{order.productId.name}</td>
                        <td className={classes.price}>
                          {order.productId.price.toLocaleString("de-DE")} VND
                        </td>
                        <td className={classes.count}>{order.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function loader({ request, params }) {
  const { orderId } = params;
  // if (!orderId) {
  //   return {};
  // }
  const response = await fetchOrderDetail(orderId);
  const order = response[0];
  return order;
}
