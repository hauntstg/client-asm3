const REST_API = process.env.REACT_APP_API;
export async function fetchProducts() {
  try {
    const res = await fetch(`${REST_API}/product-list`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchProductDetail(productId) {
  try {
    const res = await fetch(`${REST_API}/products/` + productId);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
