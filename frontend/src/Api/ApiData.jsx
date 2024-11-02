import axios from "axios";
import { useEffect, useState } from "react";
import ApiCalls from "./ApiCalls";
import toast from "react-hot-toast";
import { redirect, useNavigate } from "react-router-dom";
import { useusercontext } from "../context/Context";
axios.defaults.withCredentials = true;

const ApiData = () => {
  let navigate = useNavigate();
  const [SingleProduct, setSingleProduct] = useState({ ProductImage: [] });
  const [allproducts, setallproducts] = useState([]);
  const [Searchproduct, setSearchproduct] = useState([]);
  const [AllAddCart, setAllAddCart] = useState([]);
  const [Order, setOrder] = useState([]);
  const [AllOrders, setAllOrders] = useState([]);
  const [allcategories, setallcategories] = useState([]);
  const [allusers, setallusers] = useState([]);
  const [ProductCategory, setProductCategory] = useState([]);
  const [AllProductCategory, setAllProductCategory] = useState([]);

  const { setauthlogin, socket, authlogin } = useusercontext();
  const [count, setcount] = useState(0);
  //Auth

  const AuthLogin = async (login) => {
    let { data } = await axios.post(ApiCalls.Login.url, login);
    if (data.status === true) {
      toast.success(data.message);
      navigate("/");
      setauthlogin(data);
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("authlogin", JSON.stringify(data));
    } else {
      toast.error(data);
    }
  };
  const AuthLogOut = async () => {
    let { data } = await axios.post(ApiCalls.LogOut.url);
    if (data.status === true) {
      toast.success(data.message);
      localStorage.removeItem("authlogin");
      setauthlogin(null);
    } else {
      toast.error(data);
    }
  };

  //Products
  const fetchAllProducts = async () => {
    socket?.emit("getAllProducts", "allproducts");
    socket?.on("getproduct", (data) => {
      setallproducts(data);
    });
  };

  const GetSingleProduct = async (id, setActiveImage) => {
    socket?.emit("singleProduct", id);
    socket?.on("singleproduct", (data) => {
      setSingleProduct(data);
      setActiveImage(data.ProductImage[0]);
    });
  };

  const deleteProduct = async (id) => {
    socket?.emit("deleteProduct", id);
  };

  const updateProduct = async (uploaddata) => {
    socket?.emit("updateproduct", uploaddata);
  };

  const uploadProduct = async (uploaddata, close) => {
    let { data } = await axios.post(ApiCalls.ProductSignUp.url, uploaddata);
    if (data.status === true) {
      toast.success(data.message);
      close();
    } else {
      toast.error(data);
    }
  };

  const searchProduct = async (Category) => {
    socket?.emit("searchProduct", { Search: Category });
    socket?.on("searchproduct", (data) => {
      setSearchproduct(data);
    });
  };

  //Product Cateogry

  const GetAllProductCategory = async () => {
    let { data } = await axios.get(ApiCalls.GetAllProductCategory.url);
    setAllProductCategory(data);
  };

  const GetProductCategory = async (Category) => {
    let api = ApiCalls.GetProductCategory.url;
    let { data } = await axios.post(`${api}?Category=${Category}`, {
      Category,
    });
    setProductCategory(data);
  };

  //Order
  const OrderPayment = async (CartItems) => {
    let api = ApiCalls.OrderPayment.url;
    let { data } = await axios.post(api, { CartItems });
    window.location.href = data.session.url;
  };

  const Getallorders = async () => {
    let { data } = await axios.get(ApiCalls.AllOrders.url);
    setAllOrders(data);
  };
  const GetOrder = async () => {
    let { data } = await axios.get(ApiCalls.GetOrder.url);
    setOrder(data);
  };

  //AddCart

  const FetchAddCart = async () => {
    socket?.emit("getAllAddCart", authlogin?._id);
    socket?.on("getalladdcart", (data) => {
      setAllAddCart(data);
    });
  };

  const AddCartSignUp = async (id) => {
    let { data } = await axios.post(ApiCalls.AddCartSignUp.url, {
      ProductID: id,
      UserID: authlogin?._id,
      Credential: true,
    });
    if (data.status == true) {
      toast.success(data.message);
    } else {
      toast.error(data);
    }
  };

  const DeleteAddCart = async (id) => {
    socket?.emit("deleteAddCart", id);
  };

  const UpdateAddCart = async (id, qty) => {
    console.log(qty);
    socket?.emit("updateAddCart", { AddCartid: id, Quantity: qty });
  };

  const AddCartCount = async () => {
    socket?.emit("AddCartCount", authlogin?._id);
    socket?.on("addCartCount", (data) => {
      setcount(data);
    });
  };

  //User

  const fetchAllusers = async () => {
    socket?.emit("fetchAllUsers", authlogin?._id);
    socket?.on("getallusers", (data) => {
      setallusers(data);
    });
  };

  const deleteUser = async (id) => {
    socket?.emit("deleteUser", id);
  };

  const updateUser = async (uploaddata, close) => {
    socket?.emit("updateuser", uploaddata);
    if (authlogin?.Role === "Admin") {
      close();
    } else {
      navigate("/login");
    }
  };
  const uploadUser = async (uploaddata, close) => {
    let { data } = await axios.post(ApiCalls.UserSignUp.url, uploaddata);
    if (data.status === true) {
      toast.success(data.message);
      if (authlogin?.Role === "Admin") {
        close();
      } else {
        navigate("/login");
      }
    } else {
      toast.error(data);
    }
  };

  //Categories

  const fetchAllCategories = async () => {
    socket?.emit("fetchAllCategory");
    socket?.on("getallcategory", (data) => {
      setallcategories(data);
    });
  };

  const deleteCategory = async (id) => {
    socket?.emit("deletecategory", id);
  };

  const updateCategory = async (uploaddata) => {
    socket?.emit("updatecategory", uploaddata);
  };

  const uploadCategory = async (uploaddata) => {
    let { data } = await axios.post(ApiCalls.CategorySignUp.url, uploaddata);
    if (data.status === true) {
      toast.success(data.message);
    } else {
      toast.error(data);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategories();
    fetchAllusers();
    FetchAddCart();
    GetAllProductCategory();
    AddCartCount();
    Getallorders();
    GetOrder();
  }, [socket]);

  return {
    //Order
    OrderPayment,
    AllOrders,
    Getallorders,
    Order,
    //Add Cart
    AddCartSignUp,
    UpdateAddCart,
    DeleteAddCart,
    AllAddCart,
    AddCartCount,
    FetchAddCart,
    count,
    setcount,

    // Category
    fetchAllCategories,
    allcategories,
    uploadCategory,
    deleteCategory,
    updateCategory,

    //Product Category
    ProductCategory,
    GetProductCategory,
    AllProductCategory,
    setProductCategory,

    //Product
    updateProduct,
    allproducts,
    uploadProduct,
    Searchproduct,
    fetchAllProducts,
    SingleProduct,
    searchProduct,
    GetSingleProduct,
    deleteProduct,

    //User
    deleteUser,
    updateUser,
    uploadUser,
    allusers,
    fetchAllusers,

    //Auth
    AuthLogin,
    AuthLogOut,

    socket,
  };
};

export default ApiData;
