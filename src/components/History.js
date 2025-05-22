import HistoryForm from "./history/HistoryForm";
import { fetchOrdersByUser } from "../services/orderServices";
import { AuthContext } from "./store/AuthContext";
import classes from "./History.module.css";
import { useContext, useEffect, useState } from "react";

function HistoryPage() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      const fetchAPI = async () => {
        const response = await fetchOrdersByUser(user._id);
        setOrders(response);
      };
      fetchAPI();
    }
  }, [user]);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10">
          <div className={classes["top-bg"]}>
            <div className={classes.history}>
              <span>HISTORY</span>
              <span>
                <span style={{ color: "var(--color-gray-500)" }}> HISTORY</span>
              </span>
            </div>
          </div>
        </div>
        <HistoryForm orders={orders} />
      </div>
    </div>
  );
}

export default HistoryPage;
