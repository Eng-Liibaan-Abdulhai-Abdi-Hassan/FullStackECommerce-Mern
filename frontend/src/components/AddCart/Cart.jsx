import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import { FaMinus } from "react-icons/fa";
import CurrentFormdat from "../../helpers/CurrentFormdat";
import ApiData from "../../Api/ApiData";
const Cart = () => {
  const {
    UpdateAddCart,
    DeleteAddCart,
    FetchAddCart,
    OrderPayment,
    AllAddCart,
  } = ApiData();

  const HandleDelete = async (id) => {
    DeleteAddCart(id);
    FetchAddCart();
  };

  const IncreaseQuantity = async (id, qty) => {
    UpdateAddCart(id, qty + 1);
    FetchAddCart();
  };

  const DecreaseQuantity = async (id, qty) => {
    if (qty > 1) {
      UpdateAddCart(id, qty - 1);
      FetchAddCart();
    } else {
      HandleDelete(id);
    }
  };

  let TotalQty = 0;
  let TotalPrice = 0;

  AllAddCart.forEach((item) => {
    TotalQty += item.Quantity;
    TotalPrice += item.ProductID?.SellingPrice * item.Quantity;
  });

  const HandlePaymentMethod = async () => {
    OrderPayment(AllAddCart);
  };

  return (
    <div className="container mx-auto px-4">
      {AllAddCart.length === 0 ? (
        <h1 className="text-center mt-5 text-3xl font-bold">Cart is Empty</h1>
      ) : (
        <div className="hidden md:flex sm:block gap-5 ">
          <div className="flex flex-col  my-5 md:w-auto md:h-[500px] overflow-y-scroll scroll sm:w-full relative  ">
            {/* productList */}
            {AllAddCart?.map((data, index) => (
              <div
                key={index}
                className="flex shadow-md m-1 sm:gap-20 md:gap-10  p-3   "
              >
                <div className="md:w-72 sm:w-full h-40">
                  <img
                    className="w-full h-full"
                    src={data?.ProductID?.ProductImage[0]}
                    alt=""
                  />
                </div>
                <div className="w-full flex md:gap-1 sm:gap-2 flex-col">
                  <button
                    onClick={() => HandleDelete(data._id)}
                    className="absolute right-2 hover:bg-red-500 bg-red-400 p-2 rounded-full hover:text-white"
                  >
                    <RiDeleteBin5Fill />
                  </button>
                  <p className="text-3xl font-bold line-clamp-2 p-1">
                    {data?.ProductID?.ProductName}
                  </p>
                  <h1 className="text-gray-400 p-1">
                    {data.ProductID?.Category}
                  </h1>
                  <div className="flex  items-center gap-5 p-1">
                    <button
                      onClick={() => DecreaseQuantity(data._id, data.Quantity)}
                      className="bg-red-200 px-2 py-1  hover:bg-red-500  text-white rounded"
                    >
                      <FaMinus />
                    </button>
                    <h1 className="font-bold text-lg">{data.Quantity}</h1>
                    <button
                      onClick={() => IncreaseQuantity(data._id, data.Quantity)}
                      className="bg-blue-200 px-2 py-1  hover:bg-blue-500  text-white rounded"
                    >
                      <IoAdd />
                    </button>
                  </div>
                  <div className="flex justify-between w-full gap-5">
                    <h1 className="text-red-700 text-xl line-through font-bold">
                      {CurrentFormdat(data.ProductID?.Price)}
                    </h1>
                    <h1 className="text-gray-600 ">
                      {CurrentFormdat(
                        data.ProductID?.SellingPrice * data.Quantity
                      )}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* productList */}
          <div className="md:w-[40%]  mx-auto my-5 sm:w-full ">
            {/* Payment */}
            <div className="bg-slate-100 shadow-md h-52  md:w-96">
              <h1 className="text-center bg-red-500 p-1 text-white text-lg font-bold">
                Summary
              </h1>
              <div className="text-xl font-semibold px-1 mt-3">
                Quantity = {TotalQty}
              </div>
              <div className="mt-5 text-lg font-bold px-1">
                Total Amount = <span className="text-xl">{CurrentFormdat(TotalPrice)}</span>
              </div>
              <div className="flex items-center justify-center ">
                <button
                  onClick={HandlePaymentMethod}
                  className="bg-blue-500 w-40 mt-5 rounded-full py-1 text-white text-lg font-bold"
                >
                  Payment
                </button>
              </div>
            </div>

            {/* Payment */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
