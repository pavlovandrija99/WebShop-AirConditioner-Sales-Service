import orderModel from '../models/orderModel.js'

const getOrdersFromDB = async() => {
    let orders = await orderModel.find({});
    return orders;
}

const getOrderByIDFromDB = async(id) => {
    let order = await orderModel.findById(id);
    return order;
}

const addOrder = async(orderToAdd) => {
    let addedOrder = await orderToAdd.save();
    return addedOrder;
}

const updateOrderFromDB = async(orderToUpdate) => {
    let updatedOrder = await orderModel.findOneAndUpdate({_id: orderToUpdate._id},
                                        {user: orderToUpdate.user,
                                         orderItems: orderToUpdate.orderItems,
                                         payment: orderToUpdate.payment,
                                         orderDateAndTime: orderToUpdate.orderDateAndTime,
                                         orderPrice: orderToUpdate.orderPrice,
                                         orderAddress: orderToUpdate.orderAddress},
                                         {new: true});

    return updatedOrder
}

const deletOrderFromDB = async(orderToDelete) => {
    let deletedOrder = await orderModel.deleteOne({_id: orderToDelete._id});
    return deletedOrder;
}

export { getOrdersFromDB, getOrderByIDFromDB, addOrder, updateOrderFromDB,
         deletOrderFromDB };