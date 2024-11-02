import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import imaage1 from "../assest/banner/img2.webp";
import imaage2 from "../assest/banner/img3.jpg";
import { useEffect, useState } from "react";
const Banner = () => {
  const images = [imaage1, imaage2];
  const [currentSlide, setCurrentSlide] = useState(0);

  const Next = () => {
    if (images.length - 1 > currentSlide) {
      setCurrentSlide((prev) => prev + 1);
    }
  };
  const Prev = () => {
    if (images.length !== 0 && currentSlide) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (images.length - 1 > currentSlide) {
        Next();
      } else {
        setCurrentSlide(0)
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="container mx-auto px-4 rounded ">
      <div className="h-72 bg-red-600 w-full relative">
        <div className="flex justify-between z-40 items-center absolute w-full h-full">
          <button onClick={Prev} className="hover:bg-red-500 bg-white hover:text-white px-4 py-1 rounded-full ">
            <FaArrowLeft />
          </button>
          <button onClick={Next} className="hover:bg-red-500 bg-white hover:text-white px-4 py-1 rounded-full ">
            <FaArrowRight />
          </button>
          
        </div>

        <div className="flex w-full h-full overflow-hidden">
          {images.map((data, index) => (
            <div key={index}
              className="w-full h-full min-h-full min-w-full"
              style={{
                transform: `translateX(-${currentSlide*100}%)`,
              }}
            >
              <img 
              className="w-full h-full min-h-full min-w-full"

               src={data} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
