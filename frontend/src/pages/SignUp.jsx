import React, { useState } from "react";
import ImageBase64 from "../helpers/ImageBase64";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import iamge from "../assest/signin.gif";
import ApiData from "../Api/ApiData";

const SignUp = () => {
  const [signup, setsignup] = useState({
    Email: "",
    Password: "",
    Profile: [],
    Name: "",
    ConfirmPassword: "",
  });
  let navigate = useNavigate();
  const HandleImage = async (e) => {
    let images = e.target.files;
    Array.from(images).map(async (data) => {
      let ArrayImages = await ImageBase64(data);
      setsignup((prev) => {
        return {
          ...prev,
          Profile: [...prev.Profile, ArrayImages],
        };
      });
    });
  };

  const { uploadUser } = ApiData();

  const Handlesignup = async (e) => {
    e.preventDefault();
    uploadUser(signup);
  };
  return (
    <div className="container mx-auto   ">
      <div className=" h-auto bg-slate-100  sm:w-96  md:w-[40%] mx-auto my-5">
        {/* image */}
        <div className="flex p-1 bg-blue-500 border border-white justify-center items-center">
          <div className="w-20 h-20  ">
            <label htmlFor="Upload">
              <img
                className="h-full w-full  rounded-full border border-white"
                src={signup.Profile[0] ? signup.Profile[0] : iamge}
                alt=""
              />
              <input
                id="Upload"
                hidden
                type="file"
                multiple
                onChange={HandleImage}
              />
            </label>
          </div>
        </div>
        {/* image */}

        {/* input */}

        <div className="h-96  overflow-y-scroll scroll my-1 flex  flex-col">
          <form onSubmit={Handlesignup}>
            <div className="h-auto   ">
              <label className="text-lg font-semibold px-2" htmlFor="">
                Name :
              </label>
              <input
                value={signup.Name}
                onChange={(e) => setsignup({ ...signup, Name: e.target.value })}
                className="sm:w-[95%]  sm:mx-3 sm:mr-3
                md:w-96  md:mx-3 md:mr-3  my-2 rounded h-10 outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="text"
                placeholder="Enter Name"
              />
            </div>
            <div className="h-auto   ">
              <label className="text-lg font-semibold px-2" htmlFor="">
                Email :
              </label>
              <input
                value={signup.Email}
                onChange={(e) =>
                  setsignup({ ...signup, Email: e.target.value })
                }
                className="sm:w-[95%]  sm:mx-3 sm:mr-3
                md:w-96  md:mx-3 md:mr-3  my-2 rounded h-10 outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="text"
                placeholder="Enter E-mail"
              />
            </div>
            <div className="h-auto   ">
              <label className="text-lg font-semibold px-2" htmlFor="">
                Password :
              </label>
              <input
                value={signup.Password}
                onChange={(e) =>
                  setsignup({ ...signup, Password: e.target.value })
                }
                className="sm:w-[95%]  sm:mx-3 sm:mr-3
                md:w-96  md:mx-3 md:mr-3  my-2 rounded h-10 outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="password"
                placeholder="Enter Password"
              />
            </div>
            <div className="h-auto   ">
              <label className="text-lg font-semibold px-2" htmlFor="">
                ConfirmPassword :
              </label>
              <input
                value={signup.ConfirmPassword}
                onChange={(e) =>
                  setsignup({ ...signup, ConfirmPassword: e.target.value })
                }
                className="sm:w-[95%]  sm:mx-3 sm:mr-3
                md:w-96  md:mx-3 md:mr-3  my-2 rounded h-10 outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="password"
                placeholder="Enter ConfirmPassword"
              />
            </div>

            <div className="w-40 mx-auto">
              <button className="w-40 mx-auto hover:bg-blue-600 text-white  py-2 px-4 rounded-full bg-blue-500 my-6">
                signup
              </button>
            </div>
            <p className="text-sm -mt-3 m-4">
              Already Have An Account{" "}
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

export default SignUp;
