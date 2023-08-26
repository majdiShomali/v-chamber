const stripe = require("stripe")("sk_test_51NdwltJlIK0RZcLUvFKXOUqm9lUbhi8WIDYfZCsP3hL2ihwLCcWsa8vB8bqbbbcUEDrXXBVIBsLuRVpg1fNPnW7j00Md3duA1U"); // Replace with your Stripe secret key
const Payment = require("../models/payment");

const errorHandler = (error, req, res) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

const OrdersAll = (req, res) => {
  Payment.find({startOrderFlag:true,onWayOrderFlag:false})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const GetOrder = (req, res) => {
  const orderId  = req.params.orderId;
    Payment.findById(orderId)
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const OrdersOnWay = (req, res) => {
  Payment.find({onWayOrderFlag:true,deliveredOrderFlag:false})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const OrdersDeliverd = (req, res) => {
  Payment.find({onWayOrderFlag:true,deliveredOrderFlag:true})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const GetUserOrders = (req, res) => {
  const email  = req.params.email;
  Payment.find({email:email})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const GetUserOrdersPending = (req, res) => {
  const email  = req.params.email;
  Payment.find({email:email,startOrderFlag:true,onWayOrderFlag:false})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const GetUserOrdersStarted = (req, res) => {
  const email  = req.params.email;
  Payment.find({email:email,startOrderFlag:true,onWayOrderFlag:true,deliveredOrderFlag:false})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const GetUserOrdersDone = (req, res) => {
  const email  = req.params.email;
  Payment.find({email:email,startOrderFlag:true,onWayOrderFlag:true,deliveredOrderFlag:true})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const PendingToOnWay = async (req, res) => {
    const OrderId  = req.params.id;
    const {user,startDeliverTime} =req.body
    const order = await Payment.findByIdAndUpdate(OrderId, {onWayOrderFlag:true,providerId:user._id,startDeliverTime:new Date()}, { new: true });
    const updatedOrder = await order.save();
    res.json(updatedOrder);
};

const OnWayToDeliverd = async (req, res) => {
    const OrderId  = req.params.id;
    const {deliveredTime} = req.body;
    const order = await Payment.findByIdAndUpdate(OrderId, {deliveredOrderFlag:true,deliveredTime:new Date()}, { new: true });
    const updatedOrder = await order.save();
    res.json(updatedOrder);
};


async function createPayment(req, res) {
  try {
    const {captureDetails,amount,itemsCartData,deliveryAddress} = req.body;
    console.log(captureDetails,amount,itemsCartData);
        const payment = new Payment({
        captureDetails:captureDetails,
      amount:amount,
      deliveryAddress:deliveryAddress,
      itemsCartData:itemsCartData,
      itemsCartDataLocal:itemsCartData,
      orderTime:new Date(),
      status:true,
      email:captureDetails.payer.email_address.toLowerCase(),
      address:captureDetails.purchase_units[0].shipping.address,
      name:captureDetails.payer.name
    });
    await payment.save();

    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }

}
async function createPaymentCash(req, res) {
  try {
    const { paymentMethodId, email, phone, amount,itemsCartData,itemsCartDataLocal ,state,address,country } = req.body;
    const x = itemsCartDataLocal;
    const y = itemsCartData;   
    

    const sum = x.reduce((total, xItem, i) => {
      const yItem = y[i];
      if ('quantity' in xItem && 'salePrice' in yItem) {
        return total + xItem.quantity * yItem.salePrice;
      }
      return total;
    }, 0);


    
    const amountInUSD = sum; // Amount in USD
    const amountInCents = amountInUSD * 100; // Convert USD to cents

    
    const payment = new Payment({
      paymentMethodId,
      email,
      phone,
      amount:sum,
      itemsCartData,
      itemsCartDataLocal,
      state,
      address,
      country,
      status:false,
      cardholder:"0000"
    });
    await payment.save();

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the payment." });
  }
}

module.exports = {
  createPayment,
  OrdersAll,
  OrdersOnWay,
  PendingToOnWay,
  OrdersDeliverd,
  OnWayToDeliverd,
  GetUserOrders,
  GetOrder,
  GetUserOrdersPending,
  GetUserOrdersStarted,
  GetUserOrdersDone,
  createPaymentCash,

};


const xpay ={
  "id": "9S341348643258508",
  "intent": "CAPTURE",
  "status": "COMPLETED",
  "purchase_units": [
      {
          "reference_id": "default",
          "amount": {
              "currency_code": "USD",
              "value": "63.00"
          },
          "payee": {
              "email_address": "sb-yuicf27136357@business.example.com",
              "merchant_id": "VWHMPNBUY3ZBU"
          },
          "shipping": {
              "name": {
                  "full_name": "John Doe"
              },
              "address": {
                  "address_line_1": "1 Main St",
                  "admin_area_2": "San Jose",
                  "admin_area_1": "CA",
                  "postal_code": "95131",
                  "country_code": "US"
              }
          },
          "payments": {
              "captures": [
                  {
                      "id": "6NU92479WN027570J",
                      "status": "COMPLETED",
                      "amount": {
                          "currency_code": "USD",
                          "value": "63.00"
                      },
                      "final_capture": true,
                      "seller_protection": {
                          "status": "ELIGIBLE",
                          "dispute_categories": [
                              "ITEM_NOT_RECEIVED",
                              "UNAUTHORIZED_TRANSACTION"
                          ]
                      },
                      "create_time": "2023-08-20T12:43:13Z",
                      "update_time": "2023-08-20T12:43:13Z"
                  }
              ]
          }
      }
  ],
  "payer": {
      "name": {
          "given_name": "John",
          "surname": "Doe"
      },
      "email_address": "sb-ef434p27132391@personal.example.com",
      "payer_id": "EY7AYBWS3UXMW",
      "address": {
          "country_code": "US"
      }
  },
  "create_time": "2023-08-20T12:43:01Z",
  "update_time": "2023-08-20T12:43:13Z",
  "links": [
      {
          "href": "https://api.sandbox.paypal.com/v2/checkout/orders/9S341348643258508",
          "rel": "self",
          "method": "GET"
      }
  ]
}

const card ={
  "id": "15820676HP3855509",
  "intent": "CAPTURE",
  "status": "COMPLETED",
  "purchase_units": [
      {
          "reference_id": "default",
          "amount": {
              "currency_code": "USD",
              "value": "75.50"
          },
          "payee": {
              "email_address": "sb-yuicf27136357@business.example.com",
              "merchant_id": "VWHMPNBUY3ZBU"
          },
          "soft_descriptor": "PAYPAL *TEST STORE",
          "shipping": {
              "name": {
                  "full_name": "John Doe"
              },
              "address": {
                  "address_line_1": "00962",
                  "address_line_2": "assad",
                  "admin_area_2": "zarqa",
                  "admin_area_1": "CO",
                  "postal_code": "00962",
                  "country_code": "US"
              }
          },
          "payments": {
              "captures": [
                  {
                      "id": "6YV950126H806270T",
                      "status": "COMPLETED",
                      "amount": {
                          "currency_code": "USD",
                          "value": "75.50"
                      },
                      "final_capture": true,
                      "seller_protection": {
                          "status": "ELIGIBLE",
                          "dispute_categories": [
                              "ITEM_NOT_RECEIVED",
                              "UNAUTHORIZED_TRANSACTION"
                          ]
                      },
                      "create_time": "2023-08-20T12:53:22Z",
                      "update_time": "2023-08-20T12:53:22Z"
                  }
              ]
          }
      }
  ],
  "payer": {
      "name": {
          "given_name": "John",
          "surname": "Doe"
      },
      "email_address": "majdi.shomali.1997@gmail.com",
      "payer_id": "DDPXRALWZX7PU",
      "address": {
          "country_code": "US"
      }
  },
  "create_time": "2023-08-20T12:52:10Z",
  "update_time": "2023-08-20T12:53:22Z",
  "links": [
      {
          "href": "https://api.sandbox.paypal.com/v2/checkout/orders/15820676HP3855509",
          "rel": "self",
          "method": "GET"
      }
  ]
}

