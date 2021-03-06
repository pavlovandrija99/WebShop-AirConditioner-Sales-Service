import orderModel from "../models/orderModel.js";

const getOrdersFromDB = async () => {
  let orders = await orderModel.find({}).populate('user', "id, userFirstName userLastName");
  return orders;
};

const getOrderByIDFromDB = async (id) => {
  let order = await orderModel
    .findById(id)
    .populate("user", "userFirstName userLastName userEmail");
  return order;
};

const addOrder = async (orderToAdd) => {
  let addedOrder = await orderToAdd.save();
  return addedOrder;
};

const updateOrderFromDB = async (orderToUpdate) => {
  let updatedOrder = await orderModel.findOneAndUpdate(
    { _id: orderToUpdate._id },
    {
      user: orderToUpdate.user,
      orderItems: orderToUpdate.orderItems,
      payment: orderToUpdate.payment,
      orderDateAndTime: orderToUpdate.orderDateAndTime,
      orderPrice: orderToUpdate.orderPrice,
      orderAddress: orderToUpdate.orderAddress,
    },
    { new: true }
  );

  return updatedOrder;
};

const deletOrderFromDB = async (orderToDelete) => {
  return await orderToDelete.remove();
};

export {
  getOrdersFromDB,
  getOrderByIDFromDB,
  addOrder,
  updateOrderFromDB,
  deletOrderFromDB,
};
