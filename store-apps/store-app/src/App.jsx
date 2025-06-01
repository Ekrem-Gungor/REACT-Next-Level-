import { createBrowserRouter, RouterProvider } from "react-router";
import ProductsPage from "./pages/Products";
import LoginPage from "./pages/account/Login";
import RegisterPage from "./pages/account/Register";
import HomePage from "./pages/Home";
import ProductDetailsPage from "./pages/ProductDetails";
import ErrorPage from "./pages/errors/Error";
import ServerErrorPage from "./pages/errors/ServerError";
import NotFoundPage from "./pages/errors/NotFound";
import { useEffect, useState } from "react";
import CartPage from "./pages/cart/Cart";
import { useDispatch } from "react-redux";
import { getCart } from "./pages/cart/cartSlice";
import { getUser } from "./pages/account/accountSlice";
import MainLayout from "./layout/Main";
import Loading from "./components/Loading";
import CheckoutPage from "./pages/checkout/Checkout";
import AuthGuard from "./auth/AuthGuard";
import OrdersPage from "./pages/orders/Orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
          {
            path: ":id",
            element: <ProductDetailsPage />,
          },
        ],
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },

      {
        element: <AuthGuard />,
        children: [
          {
            path: "checkout",
            element: <CheckoutPage />,
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
        ],
      },
      {
        path: "errors",
        children: [
          {
            index: true,
            element: <ErrorPage />,
          },
          {
            path: "server-error",
            element: <ServerErrorPage />,
          },
          {
            path: "not-found",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = async () => {
    await dispatch(getUser());
    await dispatch(getCart());
  };

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading message="Uygulama başlatılıyor." />;
  }

  return <RouterProvider router={router} />;
}
