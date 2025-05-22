const REST_API = process.env.REACT_APP_API;
export async function fetchOrdersByUser(userId) {
  try {
    const res = await fetch(`${REST_API}/orders/user/` + userId);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchOrder(infor) {
  try {
    const res = await fetch(`${REST_API}/orders/add-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(infor),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchOrderDetail(orderId) {
  try {
    const res = await fetch(`${REST_API}/orders/order/` + orderId);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
