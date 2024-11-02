import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import ApiData from "../../Api/ApiData";

const UploadCategory = ({ close, fetch }) => {
  const [uploaddata, setuploaddata] = useState({
    Category: "",
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

  const { uploadCategory } = ApiData();

  const HandleUploadSubmit = async (e) => {
    e.preventDefault();
    uploadCategory(uploaddata).then(() => {
      close();
      fetch();
    });
  };

  return (
    <div className=" flex justify-center items-center z-40">
      <div className="absolute  h-auto top-[15%]  md:w-[50%] sm:w-[94%] shadow-md overflow-y-scroll scroll bg-white ">
        {/* Title */}
        <div className="relative shadow-md p-4 bg-blue-600  ">
          <h1 className="text-center text-3xl animate-pulse font-semibold   transition-all delay-300">
            Upload Category
          </h1>
          <button
            className="absolute text-white right-5 top-5 cursor-pointer"
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
                Upload Category
              </button>
            </div>
          </div>
        </form>

        {/* input */}
      </div>
    </div>
  );
};

export default UploadCategory;
