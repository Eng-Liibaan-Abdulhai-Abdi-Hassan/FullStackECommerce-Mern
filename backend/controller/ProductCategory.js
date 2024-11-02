const product = require("../model/ProductModel");

const GetAllProductCategory = async (req, res) => {
  const findcategory = await product.distinct("Category");
  let CategoryData = [];
  for (let Category of findcategory) {
    let find = await product.findOne({ Category });
    CategoryData.push(find);
  }
  res.send(CategoryData);
};

const GetProductCategory = async (req, res) => {
  let { Category } = req.body || req.query.split(",");
  const getproductcategory = await product.find({
    Category: { $in: Category },
  });

  res.send(getproductcategory);
};

module.exports = {
  GetAllProductCategory,
  GetProductCategory,
};
