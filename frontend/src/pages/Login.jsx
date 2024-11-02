import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiCalls from "../Api/ApiCalls";
import toast from "react-hot-toast";
import iamge from "../assest/signin.gif";
import ApiData from "../Api/ApiData";
axios.defaults.withCredentials = true;
const Login = () => {
  let navigate = useNavigate();
  const [login, setlogin] = useState({
    Email: "",
    Password: "",
    Name: "",
  });

  const { AuthLogin } = ApiData();

  const HandleLogin = async (e) => {
    e.preventDefault();
    AuthLogin(login);
  };
  return (
    <div className="container mx-auto   ">
      <div className=" h-96 bg-slate-100  sm:w-96  md:w-[40%] mx-auto my-5">
        {/* image */}
        <div className="flex p-1 bg-blue-500 border border-white justify-center items-center">
          <div className="w-20 h-20 ">
            <img className="h-full w-full  rounded-full" src={iamge} alt="" />
          </div>
        </div>
        {/* image */}

        {/* input */}

        <div className="h-96  overflow-y-scroll scroll my-1 flex  flex-col">
          <form onSubmit={HandleLogin}>
            <div className="h-auto   ">
              <label className="text-lg font-semibold px-2" htmlFor="">
                E-mail or Name :
              </label>
              <input
                value={login.Email}
                onChange={(e) =>
                  setlogin({
                    ...login,
                    Email: e.target.value,
                    Name: e.target.value,
                  })
                }
                className="sm:w-[95%]  sm:mx-3 sm:mr-3
                md:w-96  md:mx-3 md:mr-3  my-2 
                rounded h-10 
                outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="text"
                placeholder="Enter E-mail or Name"
              />
            </div>
            <div className="h-auto   ">
              <label className="text-lg font-semibold px-2" htmlFor="">
                Password :
              </label>
              <input
                value={login.Password}
                onChange={(e) =>
                  setlogin({ ...login, Password: e.target.value })
                }
                className="sm:w-[95%]  sm:mx-3 sm:mr-3
                md:w-96  md:mx-3 md:mr-3  my-2 rounded h-10 outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="password"
                placeholder="Enter Password"
              />
            </div>
            <Link
              style={{ float: "right" }}
              to="/forgerpassword"
              className="-mt-2 mr-4 text-sm hover:underline cursor-pointer hover:text-red-500"
            >
              Forgetpassword?
            </Link>

            <div className="w-40 mx-auto">
              <button className="w-40 mx-auto hover:bg-blue-600 text-white  py-2 px-4 rounded-full bg-blue-500 my-6">
                Login
              </button>
            </div>
            <p className="text-sm -mt-3 m-4">
              I Don't Have An Account{" "}
              <Link to="/signup" className="text-red-500 hover:text-red-700">
                SignUp
              </Link>
            </p>
          </form>
        </div>

        {/* input */}
      </div>
    </div>
  );
};

export default Login;
