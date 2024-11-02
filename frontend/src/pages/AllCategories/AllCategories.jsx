import {  useState } from "react";
import Uploaduser from "./UploadCategory";
import CategoryCard from "./CategoryCard";
import axios from "axios";
import ApiData from "../../Api/ApiData";
axios.defaults.withCredentials = true;
const AllCategories = () => {
  const [isupload, setisupload] = useState(false);
  const {allcategories,fetchAllCategories}=ApiData()
  return (
    <div className="relative bg-[#fffefe] h-[500px] w-full overflow-y-scroll scroll">
      {/* UplaodPrduct */}
      <div className="shadow-md flex items-end justify-end p-3 ">
        <button
          onClick={() => setisupload((prev) => !prev)}
          className="cursor-pointer bg-blue-500 py-1 px-4 rounded-full hover:bg-red-500 text-white"
        >
          Upload Category
        </button>
      </div>
      {/* UplaodPrduct */}

      {/* userList */}
      <div className="flex items-center flex-wrap w-full ">
        {allcategories?.map((data, index) => (
          <CategoryCard
            key={index}
            fetch={fetchAllCategories}
            closeupload={() => setisupload(false)}
            data={data}
          />
        ))}
      </div>

      {/* userList */}

      {isupload && (
        <Uploaduser
          fetch={fetchAllCategories}
          close={() => setisupload(false)}
        />
      )}
    </div>
  );
};

export default AllCategories;
