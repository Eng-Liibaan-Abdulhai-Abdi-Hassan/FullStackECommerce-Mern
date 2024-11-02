import { LuArrowRight } from "react-icons/lu";
import { LuArrowLeft } from "react-icons/lu";
import { useEffect, useRef } from "react";
import CurrentFormdat from "../../helpers/CurrentFormdat";
import ApiData from "../../Api/ApiData";
import { Link } from "react-router-dom";
const VerticalProduct = ({ Category, Heading }) => {
  let ArrayList = new Array(7).fill();
  const { ProductCategory,AddCartCount, GetProductCategory, AddCartSignUp } = ApiData();
  useEffect(() => {
    GetProductCategory(Category);
  }, []);

  const HandleAddCart = (id) => {
    AddCartSignUp(id).then(() => {
      AddCartCount();
    });
  };

  let scrollref = useRef();
  const Next = () => {
    scrollref.current.scrollLeft += 3000;
    // Your code to fetch next page
  };
  const Prev = () => {
    scrollref.current.scrollLeft -= 3000;
  };
  return (
    <div className=" container mx-auto px-5">
      <div className="relative ">
        <h1 className="text-3xl font-bold m-6">{Heading}</h1>
        <div className="flex items-center">
          <button
            onClick={Prev}
            className="py-1 absolute md:block sm:hidden -left-14 top-60 bg-blue-200 text-white rounded-full px-4 hover:bg-blue-500"
          >
            <LuArrowLeft />
          </button>
          <button
            onClick={Next}
            className="bg-blue-200 py-1 md:block  sm:hidden absolute  top-60 -right-14 text-white rounded-full px-4 hover:bg-blue-500"
          >
            <LuArrowRight />
          </button>
        </div>

        <div
          className="flex md:w-full sm:w-full   bg-gray-100 md:gap-10 sm:gap-6 p-1  items-center overflow-scroll scroll"
          ref={scrollref}
        >
          {/* ProductDetails */}

          {ProductCategory.length === 0
            ? ArrayList.map((item, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-slate-200 mix-blend-multiply shadow-md sm:w-60  md:w-[40%] p-4  flex justify-center items-center flex-col gap-5"
                >
                  <div className="w-[100%] h-2 bg-gray-300 flex rounded-full">
                    <img src="" alt="" />
                  </div>
                  <div className="md:w-full md:h-full sm:w-full sm:h-full flex justify-between items-center flex-col">
                    <p className="text-lg font-bold bg-gray-300 w-full h-6 rounded-full"></p>
                    <h1 className="font-medium text-gray-600 line-clamp-1 mt-4 bg-gray-300 w-28 h-6  rounded-full"></h1>
                    <div className="flex gap-2 mt-4 bg-gray-300 w-full h-4  rounded-full">
                      <h1 className="text-red-600 font-semibold"></h1>
                      <h1 className="text-gray-700 line-through line-clamp-1"></h1>
                    </div>
                    <button className="sm:w-full md:w-40 px-4 bg-red-500 text-white rounded-full mt-2"></button>
                  </div>
                </div>
              ))
            : ProductCategory.map((data, index) => (
                <Link
                  key={index}
                  to={"/ProductDetails/" + data._id}

                  className="bg-wihte shadow-md sm:w-60  md:w-[40%] p-4  flex justify-center items-center flex-col gap-5"
                >
                  <div
                    to={"/ProductDetails/" + data._id}
                    className="sm:w-full md:w-[100%] "
                  >
                    <img
                      className="md:w-full md:h-40 sm:w-96 sm:h-40 rounded"
                      src={data.ProductImage[0]}
                      alt=""
                    />
                  </div>
                  <div className="md:w-full md:h-full sm:w-full sm:h-full flex justify-between items-center flex-col">
                    <p className="text-lg font-bold">{data.ProductName}</p>
                    <h1 className="font-medium text-gray-600 line-clamp-1">
                      {data.Category}
                    </h1>
                    <div className="flex gap-2">
                      <h1 className="text-red-600 font-semibold">
                        {CurrentFormdat(data.Price)}
                      </h1>
                      <h1 className="text-gray-700 line-through line-clamp-1">
                        {CurrentFormdat(data.SellingPrice)}
                      </h1>
                    </div>
                    <button
                      onClick={() => HandleAddCart(data._id)}
                      className="sm:w-full md:w-40 px-4 bg-red-500 text-white rounded-full mt-2"
                    >
                      Add Cart
                    </button>
                  </div>
                </Link>
              ))}

          {/* ProductDetails */}
        </div>
      </div>
    </div>
  );
};

export default VerticalProduct;
