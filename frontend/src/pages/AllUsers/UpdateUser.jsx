import React, { useState } from "react";
import ImageDisplay from "../../helpers/displayImage";
import { CgClose } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import ImageBase64 from "../../helpers/ImageBase64";
import ApiData from "../../Api/ApiData";
import { useusercontext } from "../../context/Context";
const UpdateUser = ({ fetch, data, close }) => {
  const [viewimage, setviewimage] = useState(false);
  const [imagedata, setimagedata] = useState("");
  const { authlogin } = useusercontext();
  const [uploaddata, setuploaddata] = useState({
    Name: data.Name,
    Email: data.Email,
    Profile: data.Profile || [],
    Role: data.Role,
    Userid: data._id,
    id: authlogin?._id,
  });

  const HandleImage = async (e) => {
    let images = e.target.files;
    Array.from(images).map(async (data) => {
      let ArrayImages = await ImageBase64(data);
      setuploaddata((prev) => {
        return {
          ...prev,
          Profile: [...prev.Profile, ArrayImages],
        };
      });
    });
  };

  const HandeChange = (e) => {
    let { name, value } = e.target;
    setuploaddata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const { updateUser } = ApiData();
  const HandleUploadSubmit = async (e) => {
    e.preventDefault();
    updateUser(uploaddata, close);

    // Upload your data to server here.
  };
  const HandleDelete = (index) => {
    let imageremove = [...uploaddata.Profile];
    imageremove.splice(index, 1);
    setuploaddata((prev) => {
      return {
        ...prev,
        Profile: [...imageremove],
      };
    });
  };

  return (
    <div className=" flex justify-center items-center ">
      <div className="absolute   h-[450px] top-[14%] md:left-[27%] sm:left-[2%] shadow-md md:w-[50%] sm:w-[97%] overflow-y-scroll scroll bg-white ">
        {/* Title */}
        <div className="relative shadow-md p-4 bg-blue-500">
          <h1 className="text-center text-3xl font-semibold  animate-pulse">
            Update User
          </h1>
          <button
            className="absolute text-white p-2 right-5 top-5 cursor-pointer"
            onClick={close}
          >
            <CgClose />
          </button>
        </div>
        {/* Title */}

        {/* input */}

        <form onSubmit={HandleUploadSubmit}>
          <div>
            <div className="flex flex-col my-2 ">
              <label htmlFor="" className="font-semibold px-4">
                Name :
              </label>
              <input
                onChange={HandeChange}
                name="Name"
                value={uploaddata?.Name}
                placeholder="Enter Name "
                className="h-8   mx-auto  bg-blue-100 rounded      w-[95%]  my-1 outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="text"
              />
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="" className="font-semibold px-4">
                E-mail:
              </label>
              <input
                value={uploaddata.Email}
                name="Email"
                onChange={HandeChange}
                placeholder="Enter Email "
                className="h-8  mx-auto  bg-blue-100      w-[95%]  rounded my-1              outline-none border border-slate-200 hover:ring-2 hover:ring-green-500"
                type="text"
              />
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="" className="font-semibold px-4">
                Role:
              </label>
              <select
                name="Role"
                className="h-8  mx-auto  bg-blue-100      w-[95%]  rounded my-1              outline-none border border-slate-200 hover:ring-1 hover:ring-green-500"
                value={uploaddata.Role}
                onChange={HandeChange}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            <div className="flex flex-col my-2">
              <label htmlFor="" className="font-semibold px-4">
                Profile Image:
              </label>
              <div className="h-24  mx-auto  bg-blue-100    w-[95%]  rounded my-1              outline-none border border-slate-200  ">
                <div className="flex my-3 justify-center items-center flex-col">
                  <label htmlFor="Upload">
                    <FaCloudUploadAlt className="w-8 h-8" />
                  </label>
                  <label htmlFor="Upload" className="text-lg font-bold">
                    {" "}
                    Upload Image
                  </label>
                  <input
                    onChange={HandleImage}
                    hidden
                    type="file"
                    id="Upload"
                    multiple
                  />
                </div>
                <div>
                  {uploaddata.Profile[0] ? (
                    <div className="flex bg-slate-100 my-4  gap-2 overflow-scroll scroll">
                      {uploaddata.Profile.map((imageurl, index) => (
                        <div key={index} className="  shadow-md h-28 w-28">
                          <div className="relative group w-28 h-28  ">
                            <div
                              onClick={() => HandleDelete(index)}
                              className="bg-red-500 hover:bg-red-600 hidden text-white group-hover:block absolute bottom-3 right-3"
                            >
                              <MdDelete />
                            </div>
                            <img
                              key={index}
                              onClick={() => {
                                setimagedata(imageurl);

                                setviewimage(true);
                              }}
                              className="p-1 rounded w-full h-full"
                              src={imageurl}
                              alt=""
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm my-10 m-2 text-white">
                      {" "}
                      Please Insert Image
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`w-[50%] mx-auto  ${
                uploaddata.Profile[0] && "mt-[21%]"
              }`}
            >
              <button className="text-white py-1 rounded-full px-4 w-full bg-blue-500  mb-5">
                Upload User
              </button>
            </div>
          </div>
        </form>

        {/* input */}
        {viewimage && (
          <ImageDisplay data={imagedata} close={() => setviewimage(false)} />
        )}
      </div>
    </div>
  );
};

export default UpdateUser;
