import React, { useEffect, useState } from "react";
import UpdateProduct from "./UpdateProduct";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import CurrentFormdat from "../../helpers/CurrentFormdat";
import ApiData from "../../Api/ApiData";
const ProductCard = ({ data, fetch, allcategories }) => {
  const [isedit, setisedit] = useState(false);

  const { deleteProduct } = ApiData();

  const HandleDelete = (id) => {
    deleteProduct(id);
  };

  const [imagescroll, setimagescroll] = useState(0);

  const HandleImage = () => {
    if (data.ProductImage.length - 1 > imagescroll) {
      setimagescroll((prev) => prev + 1);
    } else {
      if (data.ProductImage.length !== 0 && imagescroll) {
        setimagescroll((prev) => prev - 1);
      }
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (data.ProductImage.length - 1 > imagescroll) {
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
        <div className="w-full h-28 ">
          <img
            onClick={HandleImage}
            className="w-full h-full"
            src={data.ProductImage[imagescroll]}
            alt=""
          />
        </div>
        <div className="h-full text-center  ">
          <h1 className="text-3xl font-bold ">{data.ProductName}</h1>
          <p className="text-sm text-gray-400 line-clamp-1 p-1">
            {data.Category}
          </p>
          <div className="flex justify-around items-center ">
            <h2 className="text-lg font-medium text-red-500">
              {CurrentFormdat(data.SellingPrice)}
            </h2>
            <h3 className="text-gray-400 line-through">
              {CurrentFormdat(data.Price)}
            </h3>
          </div>

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
            allcategories={allcategories}
            fetch={fetch}
            data={data}
            close={() => setisedit(false)}
          />
        </div>
      )}
    </>
  );
};

export default ProductCard;
