const Category = require("../model/CategoryModel");
const GetAllCategorys = async () => {
  let data = await Category.find();
  return data;
};
const GetSignleCategory = async (id) => {
  let data = await Category.findById(id);
  return data;
};
const SignUpCategory = async (req, res) => {
  const CategoryExist = await Category.findOne({ Category: req.body.Category });
  if (CategoryExist) return res.send("Category Already Exist");
  let newCategory = await Category.create(req.body);
  res.send({
    status: true,
    error: false,
    message: "Category Added Successfully",
    newCategory,
  });
};
const UpdateCategory = async (data) => {
  let updateCategory = await Category.findByIdAndUpdate(data.Categoryid, data, {
    new: true,
  });

  return await updateCategory.save();
};
const DeleteCategory = async (data) => {
  let deleteCategory = await Category.findByIdAndDelete(data);
  return deleteCategory;
};

module.exports = {
  GetAllCategorys,
  GetSignleCategory,
  SignUpCategory,
  UpdateCategory,
  DeleteCategory,
  // Other routes...
};
