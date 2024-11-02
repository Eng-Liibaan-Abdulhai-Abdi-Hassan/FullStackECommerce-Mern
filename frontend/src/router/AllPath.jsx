import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ProductDetails from "../components/Products/ProductDetails";
import Cart from "../components/AddCart/Cart";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgetPass from "../pages/ForgetPass";
import AdminDashboard from "../pages/AdminDashboard";
import AllProducts from "../pages/AllProducts/AllProducts";
import ProductSearch from "../components/Products/ProductSearch";
import FilterProductCategory from "../components/ProductCategory/FilterProductCategory";
import AllUsers from "../pages/AllUsers/AllUsers";
import AllCategories from "../pages/AllCategories/AllCategories";
import AdminDashboardInfo from "../pages/AdminDashboardInfo";
import Cancel from "../pages/Cancel";
import Success from "../pages/Success";
import OrderProduct from "../pages/OrderProduct";
import Order from "../components/Products/OrderProduct";
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "ProductDetails/:id",
        element: <ProductDetails />,
      },
     
      {
        path: "FilterProductCategory",
        element: <FilterProductCategory />,
      },
      {
        path: "ProductSearch",
        element: <ProductSearch />,
      },
      {
        path: "forgerpassword",
        element: <ForgetPass />,
      },
      {
        path: "Cancel",
        element: <Cancel />,
      },
      {
        path: "Success",
        element: <Success />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "SignUp",
        element: <SignUp />,
      },
      {
        path: "Cart",
        element: <Cart />,
      },
      {
        path: "OrderProduct",
        element: <Order />,
      },
      {
        path: "AdminDashboard",
        element: <AdminDashboard />,
        children: [
          {
            path: "",
            element: <AdminDashboardInfo />,
          },
          {
            path: "AllProducts",
            element: <AllProducts />,
          },
          {
            path: "AllUsers",
            element: <AllUsers />,
          },
          {
            path: "OrderProduct",
            element: <OrderProduct />,
          },
          {
            path: "AllCategory",
            element: <AllCategories />,
          },
        ],
      },
    ],
  },
]);

export default router;
