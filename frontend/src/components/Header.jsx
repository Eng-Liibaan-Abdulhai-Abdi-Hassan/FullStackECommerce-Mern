import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../helpers/Logo";
import { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import ApiData from "../Api/ApiData";
import { useusercontext } from "../context/Context";
import CartCount from "./AddCart/CartCount";
const Header = () => {
  let { authlogin } = useusercontext();
  const [displaymenu, setdisplaymenu] = useState(false);
  const navigate = useNavigate();
  let location = useLocation().search.split("=")[1];
  const [imagescroll, setimagescroll] = useState(0);
  const [search, setsearch] = useState(location);
  const { AuthLogOut } = ApiData();
  const HandleImage = () => {
    if (authlogin.Profile.length - 1 > imagescroll) {
      setimagescroll((prev) => prev + 1);
    } else {
      if (authlogin.Profile.length !== 0 && imagescroll) {
        setimagescroll((prev) => prev - 1);
      }
    }
  };
  useEffect(() => {
    let interval = setInterval(() => {
      if (authlogin?.Profile.length - 1 > imagescroll) {
        setimagescroll((prev) => prev + 1);
      } else {
        setimagescroll(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [imagescroll]);

  const HandleSearch = (e) => {
    let { value } = e.target;
    setsearch(value);
    if (!value) {
      navigate(`/`);
    } else {
      navigate(`/ProductSearch?Search=${value}`);
    }
  };

  const HandleSearchSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/ProductSearch?Search=${search}`);
    }
  };

  const HandleLogout = async () => {
    AuthLogOut();
    authlogin;
  };

  return (
    <header className="shadow-md bg-white h-16 fixed w-full z-40">
      <div className="h-full  flex items-center justify-between container mx-auto px-5">
        <Link to="" className="md:text-3xl md:font-semibold">
          <Logo />
        </Link>
        <form
          onSubmit={HandleSearchSubmit}
          className="border border-red-200  relative  hidden md:flex w-[40%] rounded-full "
        >
          <input
            type="text"
            name="search"
            onChange={HandleSearch}
            value={search}
            className="h-8 w-full text-center rounded-full outline-none"
            placeholder="Search Products ...."
          />
          <button className="absolute px-4 flex items-center text-white hover:bg-red-500 right-0 rounded-r-full bg-blue-500 h-full">
            <GrSearch />
          </button>
        </form>
        <div className="flex items-center gap-5 md:gap-4 relative">
          <div className="cursor-pointer border border-red-200 rounded-full md:h-[50px] md:w-[50px] sm:h-[40px] sm:w-[40px]   ruonded-full flex  items-center justify-center">
            {authlogin?.Profile ? (
              <img
                className="rounded-full w-full h-full mix-blend-multiply transition-all hover:scale-110  object-fill "
                src={
                  authlogin.Profile[imagescroll] ||
                  "https://images.unsplash.com/photo-1699942284293-c752dd37cb5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdG9yfGVufDB8fDB8fHww"
                }
                onMouseEnter={HandleImage}
                alt=""
                onClick={() => setdisplaymenu((prev) => !prev)}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <div>
            {displaymenu && authlogin?.Role === "Admin" && (
              <div>
                <Link
                  onClick={() => setdisplaymenu((prev) => !prev)}
                  to="/AdminDashboard"
                  className="absolute shadow-md my-2 bg-white px-4 h-12 top-12 -left-12 "
                >
                  <h1 className="text-lg py-3  ">AdminDashboard</h1>
                </Link>
              </div>
            )}
            {displaymenu && authlogin?.Role === "User" && (
              <div>
                <Link
                  onClick={() => setdisplaymenu((prev) => !prev)}
                  to="/orderproduct"
                  className="absolute shadow-md my-2 w-28 flex items-center justify-center  bg-white px-4 h-12 top-12 -left-5 rounded "
                >
                  <h1 className="text-lg py-3  ">Order</h1>
                </Link>
              </div>
            )}
          </div>

          {authlogin && (
            <Link
              to="/cart"
              className="relative flex items-center justify-center flex-col"
            >
              <span>
                <FaShoppingCart />
              </span>
              <div className="absolute rounded-full bg-blue-500 flex px-2 items-center justify-center text-white -top-4 -right-5">
                <CartCount />
              </div>
            </Link>
          )}

          <div>
            {authlogin ? (
              <button
                onClick={HandleLogout}
                className="font-medium text-gray-600 text-sm"
              >
                logout
              </button>
            ) : (
              <Link to="/login" className="text-lg font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
