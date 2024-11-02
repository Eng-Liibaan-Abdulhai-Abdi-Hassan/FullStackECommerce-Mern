import { useEffect } from "react";
import CurrentFormdat from "../../helpers/CurrentFormdat";
import { Link } from "react-router-dom";
import ApiData from "../../Api/ApiData";

const ProdouctDetailsVertical = ({ onClick, SingleProduct, Heading }) => {
  let Category = SingleProduct.Category;
  const { ProductCategory,AddCartCount, GetProductCategory, AddCartSignUp } = ApiData();
  let ArrayList = new Array(13).fill();
  useEffect(() => {
    GetProductCategory(Category);
  }, []);

  const HandleAddCart = (id) => {
    AddCartSignUp(id).then(() => {
      AddCartCount();
    });
  };

  return (
    <div className=" container mx-auto px-5 ">
      <div className="relative ">
        <h1 className="text-3xl font-bold m-6 p-6">{Heading}</h1>

        <div className="flex h-[550px]  bg-gray-100 md:gap-7  sm:gap-6 p-1 flex-wrap  items-center overflow-y-scroll scroll">
          {/* ProductDetails */}

          {!SingleProduct
            ? ArrayList.map((item, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-wihte shadow-md sm:w-full md:w-[30%] p-4  flex justify-center items-center flex-col gap-5"
                >
                  <div className="sm:w-full md:w-[100%] bg-gray-400  h-8 rounded-full "></div>
                  <div className="md:w-full md:h-full sm:w-full sm:h-full flex justify-between items-center flex-col">
                    <p className="text-lg font-bold bg-gray-400 w-60 h-8 rounded-full"></p>
                    <h1 className="font-medium text-gray-600 line-clamp-1"></h1>
                    <div className="flex gap-2  bg-gray-400 w-40 h-8 rounded-full mt-3">
                      <h1 className="text-red-600 font-semibold"></h1>
                      <h1 className="text-gray-700 line-through line-clamp-1"></h1>
                    </div>
                    <button className=" px-5  py-1 mt-5 text-white   bg-gray-400 w-20 h-8 rounded-full"></button>
                  </div>
                </div>
              ))
            : ProductCategory.map((data, index) => (
                <div
                  key={index}
                  className="bg-wihte shadow-md sm:w-full md:w-[30%] p-4  flex justify-center items-center flex-col gap-5"
                >
                  <Link
                    onClick={onClick}
                    to={"/ProductDetails/" + data._id}
                    className="sm:w-full md:w-[100%] "
                  >
                    <img
                      className="md:w-full md:h-60 sm:w-full sm:h-full rounded"
                      src={data.ProductImage[0]}
                      alt=""
                    />
                  </Link>
                  <div className="md:w-full md:h-full sm:w-full sm:h-full flex justify-between items-center flex-col">
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
                      className="bg-red-500 px-5 rounded py-1 mt-5 text-white hover:bg-red-700"
                    >
                      Add Cart
                    </button>
                  </div>
                </div>
              ))}

          {/* ProductDetails */}
        </div>
      </div>
    </div>
  );
};

export default ProdouctDetailsVertical;
