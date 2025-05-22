import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/Home";
import ShopPage, { loader as categoryLoader } from "./components/Shop";
import DetailPage, { loader as productDetailLoader } from "./components/Detail";
import CartPage from "./components/Cart";
import CheckoutPage, {
  action as getDataFormAction,
} from "./components/Checkout";
import HistoryPage from "./components/History";
import OrderDetail, {
  loader as loaderOrderDetail,
} from "./components/history/OrderDetail";
import LoginPage, { action as loginAction } from "./components/Login";
import RegisterPage, { action as registerAction } from "./components/Register";
import RootLayout from "./layout/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "shop",
        element: <ShopPage />,
        loader: categoryLoader,
        children: [{ path: ":categoryProduct", element: <ShopPage /> }],
      },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: productDetailLoader,
      },
      { path: "cart", element: <CartPage /> },
      {
        path: "checkout",
        element: <CheckoutPage />,
        action: getDataFormAction,
      },
      {
        path: "history",
        children: [
          { index: true, element: <HistoryPage /> },
          {
            path: "order/:orderId",
            element: <OrderDetail />,
            loader: loaderOrderDetail,
          },
        ],
      },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "register", element: <RegisterPage />, action: registerAction },
    ],
  },
]);

function App() {
  // get danh sách sản phẩm từ api và lưu vào redux
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   async function fetchData() {
  //     const res = await fetch("http://localhost:5000/products", {
  //       signal: abortController.signal,
  //     });

  //     const data = await res.json();
  //     // dispatch(updateProductsActions.dataProducts(data));

  //     return () => {
  //       abortController.abort();
  //     };
  //   }
  //   fetchData();
  // }, []);
  return <RouterProvider router={router} />;
}

export default App;
