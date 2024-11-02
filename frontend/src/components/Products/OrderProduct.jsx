import React from "react";
import CurrentFormdat from "../../helpers/CurrentFormdat";
import ApiData from "../../Api/ApiData";
import moment from "moment";
const Order = () => {
  const { Order } = ApiData();
  return (
    <div className="container mx-auto py-5 sm:px-4 bg-white">
      {Order.length === 0 && (
        <div className="flex justify-center items-center h-80">
          <h1 className="text-2xl font-bold text-gray-800">No Order Found</h1>
        </div>
      )}
      {Order.map((data, index) => (
        <div
          key={index}
          className="flex justify-between border h-72 border-slate-200 p-5 items-center   "
        >
          <div className="sm:bg-slate-100 md:shadow-md md:bg-white md:flex sm:flex md:flex-col sm:flex-col sm:items-center md:items-start sm:w-60 md:w-92   overflow-y-scroll  h-[190px]    ">
            {data.productDetails.map((pro, i) => (
              <div key={index + i} className="flex md:gap-5 sm:gap-12 my-3 ">
                <div>
                  <img className="w-20 h-20 " src={pro.image[0]} alt="" />
                </div>
                <div className="flex  justify-center items-center flex-col md:gap-0 sm:gap-1">
                  <h1 className="text-lg font-bold">{pro.name}</h1>
                  <p className="text-red-500 font-bold">
                    {CurrentFormdat(pro.price)}
                  </p>
                  <h2 className="font-bold text-sm text-gray-400 ">
                    Quantity=
                    <span className="text-black font-extrabold">
                      {pro.quantity}
                    </span>
                  </h2>
                </div>
              </div>
            ))}
          </div>

          <div className="flex pt-5 flex-col sm:text-sm md:text-lg font-medium md:bg-transparent sm:bg-slate-100 h-48 p-5">
            <div>
              <h1>
                Payment Method ={" "}
                <span className="text-lg font-bold">
                  {data.paymentDetails.payment_method_type}
                </span>{" "}
              </h1>
            </div>
            <div>
              <h1>
                Status =
                <span className="text-lg font-bold">
                  {data.paymentDetails.payment_status}
                </span>
              </h1>
            </div>
            <div>
              <h1>
                Total Amount =
                <span className="text-lg font-bold ">
                  {CurrentFormdat(data.TotalAmount)}
                </span>
              </h1>
            </div>
            <div>
              <h1>
                Payment Date =
                <span className="text-lg font-bold">
                  {moment(data.createdAt).format("LL")}
                </span>
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
