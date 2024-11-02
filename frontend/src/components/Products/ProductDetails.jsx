import { useEffect, useState } from "react";
import ProductDetailsVertical from "./ProductDetailsVertical";
import { CgClose } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { useParams } from "react-router-dom";
import CurrentFormdat from "../../helpers/CurrentFormdat";
import ApiData from "../../Api/ApiData";
const CategoryProduct = () => {
  let { id } = useParams();
  let ArrayList = new Array(2).fill();
  const {
    GetSingleProduct,
    AddCartCount,
    SingleProduct,
    AddCartSignUp,
    socket,
  } = ApiData();

  const HandleMouseEnter = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [iszoom, setiszoom] = useState(false);

  const [zoomimage, setzoomiamge] = useState({
    y: 0,
    x: 0,
  });
  const handleZoomIn = (e) => {
    setiszoom(true);
    let { left, top, width, height } = e.target.getBoundingClientRect();
    let x = (e.clientX - left) / width;
    let y = (e.clientY - top) / height;
    setzoomiamge({
      y,
      x,
    });
  };

  const HandleZoomOut = () => {
    setiszoom(false);
  };
  const [ReadText, setReadText] = useState();

  const handleText = () => {
    setReadText(ReadText);
  };

  useEffect(() => {
    GetSingleProduct(id, setActiveImage);
  }, [id, socket]);

  const HandleAddCart = (id) => {
    AddCartSignUp(id).then(() => {
      AddCartCount();
    });
  };

  const [ActiveImage, setActiveImage] = useState("");
  return (
    <div className="container mx-auto p-1 ">
      <div className="flex">
        <div className="bg-white   overflow-y-scroll scroll w-28 h-60 flex flex-col  gap-3">
          {/* ImageSide */}

          {SingleProduct.ProductImage.length === 0
            ? ArrayList.map((item, index) => (
                <div key={index} className="h-[33%] w-40 animate-pulse  ">
                  <img className="w-40 h-40 bg-gray-200   " alt="" src={item} />
                </div>
              ))
            : SingleProduct.ProductImage.map((data, index) => (
                <div key={index} className="h-[43%] w-20 ">
                  <img
                    onClick={() => setActiveImage(data)}
                    onMouseEnter={() => setActiveImage(data)}
                    className="w-full h-full"
                    alt=""
                    src={data}
                  />
                </div>
              ))}

          {/* ImageSide */}
        </div>

        {/* ImageZoom */}

        <div className="md:flex sm:flex sm:gap-1 md:gap-0 bg-white md:w-full sm:w-full  hidden   ">
          <div className="md:w-[51%] cursor-pointer sm:w-[40%] sm:h-auto   md:h-60">
            <img
              onClick={handleZoomIn}
              onMouseEnter={handleZoomIn}
              onMouseLeave={HandleZoomOut}
              className="w-full h-full"
              src={ActiveImage}
              alt=""
            />
          </div>

          {iszoom ? (
            <div
              className="md:w-full sm:w-72 h-full"
              onClick={HandleZoomOut}
              onMouseEnter={HandleZoomOut}
              style={{
                background: `url(${ActiveImage})`,
                backgroundRepeat: "no-repeat",
                //  width:"100%",
                backgroundPosition: `${zoomimage.x * 100}% ${
                  zoomimage.y * 100
                }%`,
              }}
            ></div>
          ) : (
            <div className="shadow relative h-60   md:w-full  sm:w-72   p-5  overflow-scroll  scroll">
              {ReadText ? (
                <div className=" h-[26%] min-h-[99%] flex justify-between overflow-scroll  scroll ">
                  <p className="h-8">{ReadText}</p>
                  <button
                    className="absolute p-3 bg-red-500 rounded-full text-white hover:bg-red-700 -top-1 right-2"
                    onClick={() => {
                      setReadText("");
                    }}
                  >
                    <CgClose />
                  </button>
                </div>
              ) : SingleProduct.ProductImage.length === 0 ? (
                ArrayList.map((item, index) => (
                  <div key={index} className="animate-pulse">
                    <h1 className="text-xl font-medium w-full h-8 bg-gray-400 rounded-full mt-2 "></h1>
                    <p className="text-lg line-clamp-1 text-gray-600 p-1   mt-4 w-72 h-8 bg-gray-400 rounded-full"></p>
                    <div className="flex  gap-5 ">
                      <h1 className="text-gray-500 line-through"></h1>
                      <h1 className="text-red-600 font-bold"></h1>
                    </div>

                    <div className="flex text-red-600 gap-2 p-2"></div>
                  </div>
                ))
              ) : (
                <div>
                  <h1 className="text-xl font-medium ">
                    {SingleProduct.ProductName}
                  </h1>
                  <p className="text-lg line-clamp-1 text-gray-600 p-1">
                    {SingleProduct.Category}
                  </p>
                  <div className="flex  gap-5 ">
                    <h1 className="text-red-600 font-bold">
                      {CurrentFormdat(SingleProduct.SellingPrice)}
                    </h1>
                    <h1 className=" text-gray-500 line-through">
                      {CurrentFormdat(SingleProduct.Price)}
                    </h1>
                  </div>

                  <div className="flex text-red-600 gap-2 p-2">
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                    <FaStarHalfAlt />
                    <FaStarHalf />
                    <FaStarHalf />
                  </div>
                  <div className="inline-flex gap-5 p-1  ">
                    <button className="bg-blue-500 px-5 rounded py-1 text-white hover:bg-blue-700">
                      Buy Now
                    </button>
                    <button
                      onClick={() => HandleAddCart(SingleProduct._id)}
                      className="bg-red-500 px-5 rounded py-1 text-white hover:bg-red-700"
                    >
                      Add Cart
                    </button>
                  </div>

                  <p>Description :</p>
                  <h4
                    className="line-clamp-10"
                    onMouseDown={() => {
                      handleText();
                      setReadText(SingleProduct.Description);
                    }}
                    onClick={() => {
                      handleText();
                      setReadText(SingleProduct.Description);
                    }}
                  >
                    {SingleProduct.Description}
                  </h4>
                </div>
              )}
            </div>
          )}
        </div>
        {/* ImageZoom */}
      </div>

      <div>
        {SingleProduct.Category && (
          <ProductDetailsVertical
            SingleProduct={SingleProduct}
            onClick={HandleMouseEnter}
            Heading={"Recommended Product Related "}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
