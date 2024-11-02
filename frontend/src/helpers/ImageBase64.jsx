const ImageBase64 = async (image) => {
  let filereader = new FileReader();
  filereader.readAsDataURL(image);
  let data = await new Promise((success, err) => {
    filereader.onloadend = () => success(filereader.result);
    filereader.onerror = (err) => err(err);
  });
  return data;
};

export default ImageBase64;
