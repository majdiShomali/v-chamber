const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.post("/api/charge", paymentController.createPayment);
router.post("/api/chargeCash", paymentController.createPaymentCash);

router.get("/api/OrdersAll", paymentController.OrdersAll);
router.get("/api/GetOrder/:orderId", paymentController.GetOrder);
router.get("/api/OrdersOnWay", paymentController.OrdersOnWay);
router.get("/api/GetUserOrders/:email", paymentController.GetUserOrders);
router.get("/api/OrdersDeliverd", paymentController.OrdersDeliverd);

router.get("/api/GetUserOrdersPending/:email", paymentController.GetUserOrdersPending);
router.get("/api/GetUserOrdersStarted/:email", paymentController.GetUserOrdersStarted);
router.get("/api/GetUserOrdersDone/:email", paymentController.GetUserOrdersDone);

router.put("/api/PendingToOnWay/:id", paymentController.PendingToOnWay);
router.put("/api/OnWayToDeliverd/:id", paymentController.OnWayToDeliverd);

module.exports = router;
