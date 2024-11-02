import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiCalls from "../Api/ApiCalls";
import axios from "axios";
import toast from "react-hot-toast";
const ForgetPass = () => {
  const [forget, setforget] = useState({
    Email: "",
    Password: "",
    NewPassword: "",
  });

  let navigate=useNavigate()
  const Handleforget = async (e) => {
    e.preventDefault();
    let { data } = await axios.post(ApiCalls.Change.url, forget);
    if (data.status === true) {
      toast.success(data.message);
      navigate('/login')
    } else {
      toast.error(data);
    }
  };
  return (
    <div className="container mx-auto   ">
      <div className=" h-auto bg-slate-100  sm:w-96  md:w-[40%] mx-auto my-5">
        {/* image */}
        <div className="flex p-1 bg-blue-500 border border-white justify-center items-center">
          <div className="w-20 h-20  ">
            <img
              className="h-full w-full  rounded-full border border-white"
              src={
                "https://images.unsplash.com/photo-1699942284293-c752dd37cb5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdG9yfGVufDB8fDB8fHww"
              }
              alt=""
            />
          </div>
        </div>
        {/* image */}

        {/* input */}

        <div className="h-96  overflow-y-scroll scroll my-1 flex  flex-col">
          <form onSubmit={Handleforget}>
            <div className="h-auto   ">
              <label className="text-lg font-semibold px-2" htmlFor="">
                E-mail or Name :
              </label>
              <input
                value={forget.Email}
                onChange={(e) =>
                  setforget({
                    ...forget,
                    Email: e.target.value,
                    Name: e.target.value,
                  })
                }
                className="sm:w-[95%]  sm:mx-3 sm:mr-3
                md:w-96  md:mx-3 md:mr-3  my-2 rounded h-10 outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="text"
                placeholder="Enter E-mail or Name"
              />
            </div>
            <div className="h-auto   ">
              <label className="text-lg font-semibold px-2" htmlFor="">
                Password :
              </label>
              <input
                value={forget.Password}
                onChange={(e) =>
                  setforget({ ...forget, Password: e.target.value })
                }
                className="sm:w-[95%]  sm:mx-3 sm:mr-3
                md:w-96  md:mx-3 md:mr-3  my-2 rounded h-10 outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="password"
                placeholder="Enter Password"
              />
            </div>
            <div className="h-auto   ">
              <label className="text-lg font-semibold px-2" htmlFor="">
                NewPassword :
              </label>
              <input
                value={forget.NewPassword}
                onChange={(e) =>
                  setforget({ ...forget, NewPassword: e.target.value })
                }
                className="sm:w-[95%]  sm:mx-3 sm:mr-3
                md:w-96  md:mx-3 md:mr-3  my-2 rounded h-10 outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="password"
                placeholder="Enter NewPassword"
              />
            </div>

            <div className="w-40 mx-auto">
              <button className="w-40 mx-auto hover:bg-blue-600 text-white  py-2 px-4 rounded-full bg-blue-500 my-6">
                change
              </button>
            </div>
            <p className="text-sm -mt-3 m-4">
              I was remember my password{" "}
              <Link to="/login" className="text-red-500 hover:text-red-700">
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* input */}
      </div>
    </div>
  );
};

export default ForgetPass;
