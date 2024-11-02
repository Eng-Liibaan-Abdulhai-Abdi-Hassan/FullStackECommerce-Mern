const product = require("../model/ProductModel");
const { Product } = require("../validation/validation");
const GetAllProducts = async () => {
  let data = await product.find();
  return data;
};
const GetSignleProduct = async (id) => {
  let data = await product.findById(id);
  return data;
};
const SignUpProduct = async (req, res) => {
  let {
    ProductName,
    ProductBrand,
    ProductImage,
    Description,
    Category,
    Price,
    SellingPrice,
  } = req.body;
  let { error } = Product.validate({
    ProductName,
    ProductBrand,
    ProductImage,
    Description,
    Category,
    Price,
  });
  if (error) return res.send(error.message);
  let newproduct = await product.create({
    ProductName,
    ProductBrand,
    ProductImage,
    Description,
    Category,
    Price,
    SellingPrice,
  });
  res.send({
    status: true,
    error: false,
    message: "Product Added Successfully",
    newproduct,
  });
};
const UpdateProduct = async (data) => {
  let updateproduct = await product.findByIdAndUpdate(data.productid, data, {
    new: true,
  });

  return await updateproduct.save();
};
const DeleteProduct = async (id) => {
  let deleteproduct = await product.findByIdAndDelete(id);
  return deleteproduct;
};
const SearchProduct = async (data) => {
  let { Search } = data;
  const Regax = new RegExp(Search, "i", "g");
  let searchproduct = await product.find({
    $or: [
      { Category: Regax },
      {
        Description: Regax,
      },
      {
        ProductName: Regax,
      },
      {
        ProductBrand: Regax,
      },
      {
        ProductImage: Regax,
      },
      {
        ProductImage: Regax,
      },
    ],
  });

  return searchproduct;
};

module.exports = {
  GetAllProducts,
  GetSignleProduct,
  SignUpProduct,
  UpdateProduct,
  DeleteProduct,
  SearchProduct,

  // Other routes...
};
