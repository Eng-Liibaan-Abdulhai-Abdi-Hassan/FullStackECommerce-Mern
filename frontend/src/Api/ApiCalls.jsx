const endpoint = "/api";
export const header = { "Content-Type": "application/json" };
const ApiCalls = {
  // Users

  AllUsers: {
    url: `${endpoint}/User/allUsers`,
  },
  UserSignUp: {
    url: `${endpoint}/User/signup`,
  },
  UserUpdate: {
    url: `${endpoint}/User/Update`,
  },
  UserDelete: {
    url: `${endpoint}/User/Delete`,
  },

  //Categories

  AllCategorys: {
    url: `${endpoint}/Category/allCategorys`,
  },
  CategorySignUp: {
    url: `${endpoint}/Category/signup`,
  },
  CategoryUpdate: {
    url: `${endpoint}/Category/Update`,
  },
  CategoryDelete: {
    url: `${endpoint}/Category/Delete`,
  },

  // Add Cart

  AllAddCarts: {
    url: `${endpoint}/AddCart/allAddCarts`,
  },

  singleproduct: {
    url: `${endpoint}/product/singleproduct`,
  },
  AddCartSignUp: {
    url: `${endpoint}/AddCart/signup`,
  },
  AddCartUpdate: {
    url: `${endpoint}/AddCart/Update`,
  },
  AddCartDelete: {
    url: `${endpoint}/AddCart/Delete`,
  },
  AddCartCount: {
    url: `${endpoint}/AddCart/AddCartCount`,
  },

  //Products

  AllProducts: {
    url: `${endpoint}/product/allproducts`,
  },
  SearchProduct: {
    url: `${endpoint}/product/SearchProduct`,
  },
  ProductSignUp: {
    url: `${endpoint}/product/signup`,
  },
  ProductUpdate: {
    url: `${endpoint}/product/Update`,
  },
  ProductDelete: {
    url: `${endpoint}/product/Delete`,
  },

  //Auth

  Login: {
    url: `${endpoint}/User/Login`,
  },
  Change: {
    url: `${endpoint}/User/Change`,
  },
  LogOut: {
    url: `${endpoint}/User/Logout`,
  },

  //Product Category

  GetAllProductCategory: {
    url: `${endpoint}/Product/GetAllProductCategory`,
  },
  GetProductCategory: {
    url: `${endpoint}/Product/GetProductCategory`,
  },

  

  //Order

  OrderPayment: {
    url: `${endpoint}/order/OrderPayment`,
  },
  AllOrders: {
    url: `${endpoint}/order/AllOrders`,
  },
  GetOrder: {
    url: `${endpoint}/order/GetOrder`,
  },
};

export default ApiCalls;
