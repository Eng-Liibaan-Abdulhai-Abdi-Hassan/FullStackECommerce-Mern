const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const {
  GetAllProducts,
  UpdateProduct,
  DeleteProduct,
  GetSignleProduct,
  SearchProduct,
} = require("../controller/ProductController");
const {
  GetProductCategory,
  GetAllProductCategory,
} = require("../controller/ProductCategory");
const {
  GetAllAddCarts,
  DeleteAddCart,
  UpdateAddCart,
  AddCartCount,
} = require("../controller/AddCartController");
const {
  GetAllUsers,
  UpdateUser,
  DeleteUser,
} = require("../controller/UserController");
const {
  GetAllCategorys,
  UpdateCategory,
  DeleteCategory,
} = require("../controller/CategoryController");


const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
let SocketMapData = {};
const GetReceiveID = (data) => {
  return SocketMapData[data];
};

io.on("connection", (socket) => {
  let userid = socket.handshake.query.UserID;
  if (userid) SocketMapData[userid] = socket.id;
  io.emit("Online", Object.keys(SocketMapData));

 
  //sidebar
  socket.on("sidebar", async (id) => {
    let convesationmap = await GetconversationDetails(id, id)
    let getconversationdetail = convesationmap?.map((data) => {
      let unseen = data?.message.reduce((prev, curr) => {
        return prev + (curr.unseen ? 0 : 1);
      }, 0);
      let lastmsg = data?.message[data?.message.length - 1];
      let members = data?.members.map((d) => {
        return d;
      });

      return {
        _id: data?._id,
        unseen: unseen,
        lastmsg: lastmsg.Message,
        members: members,
      };
    });
    io.emit("getconversationdetail", getconversationdetail);
  });

  //get all products
  socket.on("getAllProducts", async () => {
    let getproduct = await GetAllProducts();
    io.emit("getproduct", getproduct);
  });

  //get single product

  socket.on("singleProduct", async (id) => {
    let dat = await GetSignleProduct(id);
    io.emit("singleproduct", dat);
  });

  //search for products

  socket.on("searchProduct", async (data) => {
    let dat = await SearchProduct(data);
    io.emit("searchproduct", dat);
  });

  //update product
  socket.on("updateproduct", async (data) => {
    await UpdateProduct(data);
    let getproduct = await GetAllProducts();
    io.emit("getproduct", getproduct);
  });

  //delete product

  socket.on("deleteProduct", async (id) => {
    await DeleteProduct(id);
    let getproduct = await GetAllProducts();
    io.emit("getproduct", getproduct);
  });

  //getproductcategory
  socket.on("getProductcategory", async (category) => {
    let dat = await GetProductCategory(category);
    io.emit("getproductcategory", dat);
  });

  //getallproductcategory
  socket.on("AllProductCategory", async () => {
    let dat = await GetAllProductCategory();
    io.emit("getallproductcategory", dat);
  });

  //getalladdcart

  socket.on("getAllAddCart", async (id) => {
    let dat = await GetAllAddCarts(id);
    io.emit("getalladdcart", dat);
  });

  //update addcart
  socket.on("updateAddCart", async (data) => {
    await UpdateAddCart(data);
  });
  //delete addcart
  socket.on("deleteAddCart", async (id) => {
    await DeleteAddCart(id);
  });

  //addcart count
  socket.on("AddCartCount", async (id) => {
    let dat = await AddCartCount(id);
    io.emit("addCartCount", dat);
  });

  //get allusers
  socket.on("fetchAllUsers", async (id) => {
    let dat = await GetAllUsers(id);
    io.emit("getallusers", dat);
  });

  //update addcart
  socket.on("updateuser", async (data) => {
    await UpdateUser(data);
    let l = await GetAllUsers(data.id);
    io.emit("getallusers", l);
  });
  //delete addcart
  socket.on("deleteUser", async (id) => {
    await DeleteUser(id);
  });

  //get allusers
  socket.on("fetchAllCategory", async () => {
    let dat = await GetAllCategorys();
    io.emit("getallcategory", dat);
  });

  //update addcart
  socket.on("updatecategory", async (data) => {
    await UpdateCategory(data);
    let l = await GetAllCategorys();
    io.emit("getallcategory", l);
  });
  //delete addcart
  socket.on("deletecategory", async (id) => {
    await DeleteCategory(id);
  });
});

module.exports = { server, GetReceiveID, app, io };
