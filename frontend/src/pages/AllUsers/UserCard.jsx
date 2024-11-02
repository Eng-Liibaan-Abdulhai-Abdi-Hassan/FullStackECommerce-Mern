import React, { useEffect, useState } from "react";
import UpdateProduct from "./UpdateUser";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import ApiData from "../../Api/ApiData";
const UserCard = ({ fetch, data, closeupload }) => {
  const [isedit, setisedit] = useState(false);

  const { deleteUser } = ApiData();

  const HandleDelete = async (id) => {
    deleteUser(id);
    fetch();
    closeupload()
  };
  const HandleImage = () => {
    if (data.Profile.length - 1 > imagescroll) {
      setimagescroll((prev) => prev + 1);
    } else {
      if (data.Profile.length !== 0 && imagescroll) {
        setimagescroll((prev) => prev - 1);
      }
    }
  };
  const [imagescroll, setimagescroll] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      if (data.Profile.length - 1 > imagescroll) {
        setimagescroll((prev) => prev + 1);
      } else {
        setimagescroll(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [imagescroll, data]);
  return (
    <>
      <div className="m-4   bg-slate-100 shadow-md md:w-[20%] sm:w-full ">
        <div className="w-full h-40 ">
          <img
            onClick={HandleImage}
            className="w-full h-full "
            src={data.Profile[imagescroll]}
            alt=""
          />
        </div>
        <div className="h-full text-center  ">
          <h1 className="text-3xl font-bold line-clamp-1 ">{data.Name}</h1>{" "}
          <div className="pb-4 md:flex   justify-around items-center">
            <button
              onClick={() => HandleDelete(data._id)}
              className="px-4 py-1 flex justify-center items-center mr-2 my-3 rounded-full md:w-20 sm:w-full bg-red-500 hover:bg-red-700 transition-all text-white"
            >
              <RiDeleteBin5Fill />
            </button>
            <button
              onClick={() => setisedit((prev) => !prev)}
              className="mr-2 my-2 py-1 flex items-center justify-center px-4 rounded-full md:w-20 sm:w-full bg-blue-500 hover:bg-blue-700 transition-all text-white"
            >
              <FaEdit />
            </button>
          </div>
        </div>
      </div>
      {isedit && (
        <div className="flex justify-center items-center">
          <UpdateProduct
            closeupload={closeupload}
            data={data}
            fetch={fetch}
            close={() => setisedit(false)}
          />
        </div>
      )}
    </>
  );
};

export default UserCard;
