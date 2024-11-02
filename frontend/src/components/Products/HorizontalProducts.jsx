import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useRef } from "react";
import CurrentFormdat from "../../helpers/CurrentFormdat";
import { Link } from "react-router-dom";
import ApiData from "../../Api/ApiData";
const HorizontalProducts = ({ Heading, Category }) => {
  let ArrayList = new Array(13).fill();
  const { AddCartSignUp, ProductCategory, GetProductCategory, AddCartCount } =
    ApiData();
  const HandleAddCart = (id) => {
    AddCartSignUp(id).then(() => {
      AddCartCount();
    });
  };

  useEffect(() => {
    GetProductCategory(Category);
  }, []);

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
      <div className="relative">
        <h1 className="text-3xl font-bold m-6">{Heading}</h1>
        <div className="flex items-center">
          <button
            onClick={Prev}
            className="absolute py-1  md:block sm:hidden -left-14 top-[61%] bg-blue-200 text-white rounded-full px-5 hover:bg-blue-500"
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            onClick={Next}
            className="bg-blue-200 py-1 md:block  sm:hidden absolute  top-[61%] -right-14 text-white rounded-full px-5 hover:bg-blue-500"
          >
            <MdKeyboardArrowRight />
          </button>
        </div>

        <div
          className="flex  bg-gray-100 md:gap-5 sm:gap-10 p-1  items-center overflow-scroll scroll"
          ref={scrollref}
        >
          {/* ProductDetails */}

          {ProductCategory.length === 0
            ? ArrayList.map((item, index) => (
                <div
                  key={index}
                  className="bg-wihte shadow-md w-full p-4 flex gap-5 animate-pulse"
                >
                  <div>
                    <p className="text-lg font-bold bg-gray-200 w-40 h-5 rounded-full "></p>
                    <h1 className="font-medium text-gray-600 line-clamp-1 bg-gray-200 w-28 h-5 rounded-full my-2"></h1>
                    <div className="flex gap-2 bg-gray-200 w-25 h-5 rounded-full">
                      <h1 className="text-red-600 font-semibold"></h1>
                      <h1 className="text-gray-700 line-through line-clamp-1"></h1>
                    </div>

                    <h1 className="text-red-600 font-semibold bg-gray-200 w-16 h-5 rounded-full mt-4"></h1>
                  </div>
                </div>
              ))
            : ProductCategory?.map((data, index) => (
                <Link
                  to={"/ProductDetails/" + data._id}
                  key={index}
                  className="bg-wihte shadow-md sm:w-[50%] md:w-[30%] p-4 flex gap-5"
                >
                  <div className="md:w-30 md:h-30 h-24 w-24">
                    <img
                      className="w-full h-full rounded"
                      src={data.ProductImage[0]}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold">{data.ProductName}</p>
                    <h1 className="font-medium text-gray-600 line-clamp-1">
                      {data.Category}
                    </h1>
                    <div className="flex gap-2">
                      <h1 className="text-red-600 font-semibold">
                        {CurrentFormdat(data.SellingPrice)}
                      </h1>
                      <h1 className="text-gray-700 line-through line-clamp-1">
                        {CurrentFormdat(data.Price)}
                      </h1>
                    </div>
                    <button
                      onClick={() => HandleAddCart(data._id)}
                      className="px-4 bg-red-500 text-white rounded-full mt-2"
                    >
                      Add Cart
                    </button>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalProducts;
