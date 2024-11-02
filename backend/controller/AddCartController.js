const AddCart = require("../model/AdddCartModel");
const GetAllAddCarts = async (id) => {
  let data = await AddCart.find({
    UserID: id,
  }).populate("ProductID");
  return data;
};
const AddCartCount = async (id) => {
  let data = await AddCart.countDocuments({
    UserID: id,
  });
  return data;
};
const SignUpAddCart = async (req, res) => {
  let { ProductID, UserID } = req.body;
  const AddCartExist = await AddCart.findOne({ ProductID: ProductID });
  if (AddCartExist) return res.send("AddCart Already Exist");
  let newAddCart = await AddCart.create({
    ProductID,
    UserID,
    Quantity: 1,
  });
  res.send({
    status: true,
    error: false,
    message: "AddCart Added Successfully",
    newAddCart,
  });
};
const UpdateAddCart = async (data) => {
  let updateAddCart = await AddCart.findByIdAndUpdate(data.AddCartid, data, {
    new: true,
  });

  return await updateAddCart.save();
};
const DeleteAddCart = async (id) => {
  let data = await AddCart.findByIdAndDelete(id);
  return data;
};

module.exports = {
  GetAllAddCarts,
  AddCartCount,
  SignUpAddCart,
  UpdateAddCart,
  DeleteAddCart,
  // Other routes...
};
