const url = `https://api.cloudinary.com/v1_1/dqt9wfj3p/image/upload`;
const CloudinaryUploadImage = async (image) => {
  let formdata = new FormData();
  formdata.append("file", image);
  formdata.append("upload_preset", "UploadMernFullStack");
  const response = await fetch(url, {
    method: "POST",
    body: formdata,
  });
  let data = await response.json();
  return data;
};

export default CloudinaryUploadImage;
