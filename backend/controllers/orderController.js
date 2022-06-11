import asyncHandler from "express-async-handler";

import {
  getOrdersFromDB,
  getOrderByIDFromDB,
  addOrder,
  updateOrderFromDB,
  deletOrderFromDB,
} from "../services/orderService.js";

import OrderHelper from "../helpers/orderHelper.js";
import orderModel from "../models/orderModel.js";

// Fetches all orders from DB.
const getOrders = asyncHandler(async (req, res) => {
  let orders = await getOrdersFromDB();

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error("Orders not found!");
  }
});

// Fetches single order by ID from DB.
const getOrderByID = asyncHandler(async (req, res) => {
  let order = await getOrderByIDFromDB(req.params.id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({ user: req.user._id });
  console.log(`orders: ${JSON.stringify(orders)}`)
  res.json(orders);
});

// Creates a new order instance in DB.
const createOrder = asyncHandler(async (req, res) => {
  let createdOrderWithHelper = await OrderHelper.createOrderObjectHelper(req);

  let createdOrder = await addOrder(createdOrderWithHelper);

  if (createdOrder) {
    res.status(201).json(createdOrder);
  } else {
    res.status(500);
    throw new Error("Order creation failed!");
  }
});

// Updates single instance of order by ID.
const updateOrder = asyncHandler(async (req, res) => {
  let orderToUpdate = await getOrderByIDFromDB(req.params.id);

  if (!orderToUpdate) {
    res.status(400);
    throw new Error("Order not found!");
  }

  let updatedOrderWithHelper = OrderHelper.updateOrderHelper(
    orderToUpdate,
    req.body
  );

  let updatedOrder = await updateOrderFromDB(updatedOrderWithHelper);

  if (!updatedOrder) {
    res.status(500);
    throw new Error("Order failed to update!");
  }

  res.status(200).json(updatedOrder);
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found! Bad request.");
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await orderModel.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found! Bad request.");
  }
});

// Deletes single instance of order from DB, by ID.
const deleteOrder = asyncHandler(async (req, res) => {
  let orderToDelete = await getOrderByIDFromDB(req.params.id);

  if (!orderToDelete) {
    res.status(400);
    throw new Error("Order not found!");
  }

  let deletedOrder = await deletOrderFromDB(orderToDelete);

  if (!deletedOrder) {
    res.status(500);
    throw new Error("Order deletion failed!");
  }

  res.status(204).json({ message: "Order deleted successfully!" });
});

export {
  getOrders,
  getOrderByID,
  createOrder,
  updateOrder,
  updateOrderToDelivered,
  deleteOrder,
  updateOrderToPaid,
  getMyOrders,
};
