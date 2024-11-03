const Order = require("../model/OrderModel");
const User = require("../model/UserModel");
const AddCart = require("../model/AdddCartModel");
const stripe = require("stripe")(process.env.Stripe);
const GetAllOrders = async (req, res) => {
  const GetOrders = await Order.find().sort({
    updatedAt: -1,
  });
  res.send(GetOrders);
};
const GetOrder = async (req, res) => {
  const Getorder = await Order.find({ userId: req.user });
  res.send(Getorder);
};

const OrderPayment = async (req, res) => {
  let { CartItems } = req.body;

  const line_items = CartItems.map((item) => {
    return {
      price_data: {
        currency: "USD",
        product_data: {
          name: item.ProductID.ProductName,
          images: item.ProductID.ProductImage,
          metadata: {
            ProductID: item.ProductID._id,
          },
        },

        unit_amount: item.ProductID.SellingPrice,
      },

      adjustable_quantity: {
        enabled: true,
        minimum: 1,
      },

      quantity: item.Quantity,
    };
  });

  const user = await User.findOne({ _id: req.user });

  const params = {
    mode: "payment",
    billing_address_collection: "auto",
    payment_method_types: ["card"],
    line_items,
    success_url: "https://fullstackecommerce-mern.onrender.com/success",
    cancel_url: "https://fullstackecommerce-mern.onrender.com/cancel",
    customer_email: user.Email,
    metadata: {
      UserID: req.user,
    },
  };

  let session = await stripe.checkout.sessions.create(params);
  res.send({
    status: true,
    error: false,
    message: "Payment Session Created Successfully",
    session,
  });
};

const GetOrderPayment = async (req, res) => {
  let payload = JSON.stringify(req.body);

  let secret = process.env.StripeWebHooks;
  let header = await stripe.webhooks.generateTestHeaderString({
    payload,
    secret,
  });
  let event;
  try {
    event = await stripe.webhooks.constructEvent(payload, header, secret);
    if (event.type === "checkout.session.completed") {
      let session = event.data.object;
      let line_items = await stripe.checkout.sessions.listLineItems(
        session.id,
        { limit: 100 }
      );

      let productDetails = [];
      if (line_items.data.length) {
        for (let data of line_items.data) {
          let product = await stripe.products.retrieve(data.price.product);
          let ProductID = product.metadata.ProductID;
          let ProductInfo = {
            ProductID,
            name: product.name,
            image: product.images,
            quantity: data.quantity,
            price: data.amount_total,
          };
          productDetails.push(ProductInfo);
        }
      }
      let paymentDetails = {
        paymentId: session.payment_intent,
        payment_method_type: session.payment_method_types,
        payment_status: session.payment_status,
      };
      let userId = session.metadata.UserID;
      let email = session.customer_email;
      let TotalAmount = session.amount_total;

      let OrderDetails = {
        productDetails,
        email,
        userId,
        paymentDetails,
        TotalAmount,
      };
      await Order.create(OrderDetails);
      await AddCart.deleteMany({ UserID: userId });

      res.send({
        status: true,
        error: false,
        message: "Payment Successful",
        OrderDetails,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Invalid payload" });
  }
};

module.exports = { GetOrder, OrderPayment, GetAllOrders, GetOrderPayment };
