import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useusercontext } from "../context/Context";
const AdminDashboard = () => {
  const { authlogin } = useusercontext();
  let navigate = useNavigate();
  useEffect(() => {
    if (authlogin === null || authlogin?.Role === "User") {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex">
      {/* AllSide */}
      <div className="bg-white border h-[500px]  sm:w-[30%] md:w-[20%]">
        <div className="bg-blue-500 p-2 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full ">
            <img
              className="w-full h-full rounded-full"
              src="https://images.unsplash.com/photo-1699942284293-c752dd37cb5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdG9yfGVufDB8fDB8fHww"
              alt=""
            />
          </div>
        </div>

        <div className="p-1 flex justify-center items-center flex-col border">
          <p className="text-lg font-medium">Mohamed</p>
          <h1 className="text-sm font-mono animate-pulse">Admin</h1>
        </div>

        <div className="flex flex-col ">
          <Link to="AllUsers" className="hover:bg-slate-50 font-semibold p-1">
            Users
          </Link>
          <Link
            to="AllProducts"
            className="hover:bg-slate-50 font-semibold p-1"
          >
            Products
          </Link>
          <Link
            to="AllCategory"
            className="hover:bg-slate-50 font-semibold p-1"
          >
            Categories
          </Link>
          <Link
            to="OrderProduct"
            className="hover:bg-slate-50 font-semibold p-1"
          >
            Order
          </Link>
        </div>
      </div>
      {/* AllSide */}
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
