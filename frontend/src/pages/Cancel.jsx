import React from 'react'

const Cancel = () => {
  return (
   <div className='flex items-center justify-center flex-col p-5'>
     <h1>Order Cancelled</h1>
     <p>Your order has been cancelled. You can return to the home page or contact our support team for further assistance.</p>
     <button className="bg-red-600 mt-4  text-white font-semibold py-2 px-4 rounded hover:bg-red-500">Return to Home</button>
     <button className="ml-4 bg-blue-600 mt-4 text-white font-semibold py-2 px-4 rounded hover:bg-blue-500">Contact Support</button>
     {/* Back to Home Button */}

   </div>
  )
}

export default Cancel
