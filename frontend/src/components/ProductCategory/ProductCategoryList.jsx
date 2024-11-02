import { Link } from "react-router-dom";
import ApiData from "../../Api/ApiData";
const CategoryList = () => {
  const { AllProductCategory } = ApiData();
  let ArrayList = new Array(13).fill();
  return (
    <div className="container mx-auto px-4">
      <div className="bg-slate-200 mt-5 gap-5 flex items-center   overflow-scroll scroll p-2">
        {/* CategoryList */}

        {AllProductCategory.length === 0
          ? ArrayList.map((item, index) => (
              <div key={index} className="flex items-center flex-col gap-2">
                <div className="h-20 w-20 bg-slate-300 rounded-full animate-pulse"></div>
              </div>
            ))
          : AllProductCategory.map((data, index) => (
              <Link
                key={index}
                to={`/FilterProductCategory?Category=${data.Category}`}
                className="flex items-center flex-col"
              >
                <div className="cursor-pointer md:w-20 rounded-full md:h-20 h-16 w-16 bg-slate-100">
                  <img
                    className="rounded-full w-full h-full hover:p-2 p-1 mix-blend-multiply transition-all hover:scale-110"
                    src={data.ProductImage[0]}
                    alt=""
                  />
                </div>
                <h1 className="sm:text-sm  text-lg font-semibold">
                  {data.Category}
                </h1>
              </Link>
            ))}

        {/* CategoryList */}
      </div>
    </div>
  );
};

export default CategoryList;
