import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import ApiData from "../../Api/ApiData";
import Uploaduser from "./Uploaduser";
axios.defaults.withCredentials = true;
const AllUsers = () => {
  const [isupload, setisupload] = useState(false);
  const { fetchAllusers, allusers } = ApiData();
  return (
    <div className="relative bg-[#fffefe] h-[500px] w-full overflow-y-scroll scroll">
      {/* UplaodPrduct */}
      <div className="shadow-md flex items-end justify-end p-3 ">
        <button
          onClick={() => setisupload((prev) => !prev)}
          className="cursor-pointer bg-blue-500 py-1 px-4 rounded-full hover:bg-red-500 text-white"
        >
          Upload User
        </button>
      </div>
      {/* UplaodPrduct */}

      {/* userList */}
      <div className="flex items-center flex-wrap w-full ">
        {allusers?.map((data, index) => (
          <UserCard
            key={index}
            fetch={fetchAllusers}
            closeupload={() => setisupload(false)}
            data={data}
          />
        ))}
      </div>

      {/* userList */}

      {isupload && (
        <Uploaduser
        fetch={fetchAllusers}
        close={() => setisupload(false)}
        />
      )}
    </div>
  );
};

export default AllUsers;
