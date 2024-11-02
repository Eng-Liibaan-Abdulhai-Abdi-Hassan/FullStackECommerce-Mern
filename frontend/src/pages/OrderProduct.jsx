import ApiData from "../Api/ApiData";
const OrderProduct = () => {
  const { AllOrders } = ApiData();
  return (
    <div className="relative overflow-y-scroll srcoll h-[550px] overflow-x-auto shadow-md sm:rounded-lg w-full  p-5 ">
      <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs  text-gray-00 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              TotalAmount
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>

           
          </tr>
        </thead>
        <tbody>
          {AllOrders.map((data, index) => (
           data.productDetails.map((pro,i)=>(
            <tr
              key={index+i}
              className="bg-white border-b text-black   hover:bg-gray-50 dark:hover:bg-slate-100"
            >
              <td className="px-6 py-4">{i+ 1}</td>
              <td className="px-6 py-4">{
                <img className="md:w-12  md:h-12 rounded-full" src={pro.image[0]} alt="" />
                
                }</td>
              <td className="px-6 py-4">{data.email}</td>
              <td className="px-6 py-4">{pro.name}</td>
              <td className="px-6 py-4">{pro.price}</td>
              <td className="px-6 py-4">{pro.quantity}</td>
              <td className="px-6 py-4">{data.TotalAmount}</td>
              <td className="px-6 py-4">{data.paymentDetails.payment_status}</td>
            </tr>
           ))
          ))}
        </tbody>
      </table>
    
    </div>
  );
};

export default OrderProduct;
