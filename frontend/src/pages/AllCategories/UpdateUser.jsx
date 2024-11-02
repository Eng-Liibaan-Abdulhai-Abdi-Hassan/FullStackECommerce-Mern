import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import ApiData from "../../Api/ApiData";
const UpdateUser = ({ fetch, data, close }) => {
  const [uploaddata, setuploaddata] = useState({
    Category: data.Category,
    Categoryid: data._id,
  });

  const HandeChange = (e) => {
    let { name, value } = e.target;
    setuploaddata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  
  const { updateCategory } = ApiData();
  const HandleUploadSubmit = async (e) => {
    e.preventDefault();
    updateCategory(uploaddata);
    fetch();``
    close();
    // Upload your data to server here.
  };

  return (
    <div className=" flex justify-center items-center ">
      <div className="absolute   h-auto top-[14%] md:left-[27%] sm:left-[2%] shadow-md md:w-[50%] sm:w-[97%] overflow-y-scroll scroll bg-white ">
        {/* Title */}
        <div className="relative shadow-md p-4 bg-blue-500">
          <h1 className="text-center text-3xl font-semibold  animate-pulse">
            Update Category
          </h1>
          <button
            className="absolute text-white p-2 right-5 top-5 cursor-pointer"
            onClick={close}
          >
            <CgClose />
          </button>
        </div>
        {/* Title */}

        {/* input */}

        <form onSubmit={HandleUploadSubmit}>
          <div>
            <div className="flex flex-col my-2 ">
              <label htmlFor="" className="font-semibold px-4">
                Category :
              </label>
              <input
                onChange={HandeChange}
                name="Category"
                value={uploaddata?.Category}
                placeholder="Enter Category "
                className="h-8   mx-auto  bg-blue-100 rounded      w-[95%]  my-1 outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="text"
              />
            </div>

            <div>
              <button className="text-white py-2 rounded-full px-4 w-full bg-blue-500  mb-5">
                Update Category
              </button>
            </div>
          </div>
        </form>

        {/* input */}
      </div>
    </div>
  );
};

export default UpdateUser;
