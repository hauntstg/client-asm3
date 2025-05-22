import { Link } from "react-router-dom";
import classes from "./HistoryForm.module.css";

export default function HistoryForm({ orders }) {
  // console.log(orders);
  return (
    <div className="col-12">
      <div className="container p-0">
        <div className={classes.history + " row"}>
          <div className={`${classes.wrapTable} col-12 pt-5`}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th scope="col">ID ORDER</th>
                  <th scope="col">ID USER</th>
                  <th scope="col">NAME</th>
                  <th scope="col">PHONE</th>
                  <th scope="col">ADDRESS</th>
                  <th scope="col">TOTAL</th>
                  <th scope="col">DELIVERY</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">DETAIL</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className={classes.orderId}>{order._id}</td>
                    <td className={classes.userId}>{order.userId}</td>
                    <td className={classes.fullname}>{order.user.fullname}</td>
                    <td className={classes.phone}>{order.user.phone}</td>
                    <td className={classes.address}>{order.user.address}</td>
                    <td className={classes.total_price}>
                      {order.total_price.toLocaleString("de-DE")} VND
                    </td>
                    <td className={classes.delivery}>{order.delivery}</td>
                    <td className={classes.status}>{order.status}</td>
                    <td className={classes.btnView}>
                      <Link to={`order/${order._id}`}>
                        View{" "}
                        <i
                          className="fa fa-long-arrow-right"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
