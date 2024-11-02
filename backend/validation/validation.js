const joi = require("joi");
const name = joi.object({
  Name: joi.string().required(),
});
const email = joi.object({
  Email: joi.string().email().required(),
});
const newpass = joi.object({
  NewPassword:joi.string()
    .min(8)
    .max(100)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});
const confirpass = joi.object({
  ConfirmPassword:joi.string()
    .min(8)
    .max(100)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});
const Email = joi.object({
  Email: joi.string().required(),
});

const password = joi.object({
  Password:joi.string()
    .min(8)
    .max(100)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ),
});

const Product=joi.object({
  ProductName: joi.string().required(),
  ProductBrand: joi.string().required(),
  Category: joi.string().required(),
  Price:joi.number().required(), 
  ProductImage: joi.array().required(),
  Description: joi.string().required(),
})

module.exports = {
  name,
  email,
  password,
  newpass,
  Email,
  Product,
  confirpass
};
