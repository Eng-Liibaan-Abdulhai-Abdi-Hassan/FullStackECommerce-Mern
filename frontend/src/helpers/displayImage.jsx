import React from "react";

const ImageDisplay = ({ close, data }) => {
  return (
    <div className="shadow-md absolute w-72 h-auto p-4   top-[50%] left-[20%] bg-white">
      <div className="flex justify-end content-end mr-3">
        <button onClick={close}>X</button>
      </div>
      <div className="w-full h-full">
        <img className="p-1 h-auto w-full" src={data} alt="" />
      </div>
    </div>
  );
};

export default ImageDisplay;
