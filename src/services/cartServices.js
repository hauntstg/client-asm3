const REST_API = process.env.REACT_APP_API;
export async function fetchAddToCart(product) {
  try {
    const res = await fetch(`${REST_API}/cart/add-to-cart`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchUpdateCart(product) {
  try {
    const res = await fetch(`${REST_API}/cart/update-cart`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
