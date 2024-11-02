import ApiData from "../../Api/ApiData";
import CurrentFormdat from "../../helpers/CurrentFormdat";
import { Link } from "react-router-dom";
const ProductSearchList = ({ data }) => {
  let ArrayList = new Array(8).fill();
  const { AddCartSignUp, AddCartCount } = ApiData();
  const HandleAddCart = (id) => {
    AddCartSignUp(id).then(() => {
      AddCartCount();
    });
  };
  return (
    <div className=" container mx-auto px-5 ">
      <div className="relative ">
        <h1 className="text-3xl font-bold m-6">{data?.length}</h1>

        <div className="flex h-[440px]  bg-gray-100 md:gap-7  sm:gap-6 p-1 flex-wrap  items-center overflow-y-scroll scroll">
          {/* ProductDetails */}

          {data.length === 0
            ? ArrayList.map((item, index) => (
                <div
                  key={index}
                  className="bg-wihte shadow-md sm:w-full md:w-[30%] p-4  flex justify-center items-center flex-col gap-5"
                >
                  <div className="sm:w-full md:w-[100%] rounded-full bg-gray-400  ">
                    <img
                      className="md:w-full md:h-4  rounded-full sm:w-full sm:h-72 "
                      alt=""
                    />
                  </div>
                  <div className="md:w-full md:h-full sm:w-full sm:h-full flex  items-center flex-col  rounded-full">
                    <p className="text-lg font-bold bg-gray-400 w-60 h-8 rounded-full "></p>
                    <h1 className="font-medium text-gray-600 line-clamp-1 mt-3  bg-gray-400 w-[60%] h-4 rounded-full"></h1>
                    <div className="flex gap-2">
                      <h1 className="text-red-600 font-semibold"></h1>
                      <h1 className="text-gray-700 line-through line-clamp-1"></h1>
                    </div>
                    <button className="sm:w-full md:w-40 px-4 bg-red-500 text-white rounded-full mt-2"></button>
                  </div>
                </div>
              ))
            : data?.map((data, index) => (
                <div
                  key={index}
                  className="bg-wihte shadow-md sm:w-full md:w-[30%] p-4  flex justify-center items-center flex-col gap-5"
                >
                  <Link
                    to={"/ProductDetails/" + data._id}
                    className="sm:w-full md:w-[100%] "
                  >
                    <img
                      className="md:w-full md:h-60 sm:w-full sm:h-72 rounded"
                      src={data.ProductImage[0]}
                      alt=""
                    />
                  </Link>
                  <div className="md:w-full md:h-full sm:w-full sm:h-full flex  items-center flex-col">
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
                </div>
              ))}

          {/* ProductDetails */}
        </div>
      </div>
    </div>
  );
};

export default ProductSearchList;
