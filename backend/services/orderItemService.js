import orderItemModel from '../models/orderItemModel.js'

const getOrderItemsFromDB = async() => {
    const orderItems = await orderItemModel.find({});
    return orderItems;
}

const getOrderItemByIDFromDB = async(id) => {
    let orderItem = await orderItemModel.findById(id);
    return orderItem;
}

const addOrderItem = async(orderItemToAdd) => {
    let addedOrderItem = await orderItemToAdd.save();
    return addedOrderItem;
}

const updateOrderItemFromDB = async(orderItemToUpdate) => {
    let updatedOrderItem = await orderItemModel
                                 .findOneAndUpdate({_id: orderItemToUpdate._id},
                                  {service: orderItemToUpdate.service,
                                   itemQuantity: orderItemToUpdate.itemQuantity,
                                   itemPrice: orderItemToUpdate.itemPrice},
                                    {new: true});

    return updatedOrderItem;
}

const deleteOrderItemFromDB = async(orderItemToDelete) => {
    return await orderItemToDelete.remove();
}

export { getOrderItemsFromDB, getOrderItemByIDFromDB, addOrderItem,
         updateOrderItemFromDB, deleteOrderItemFromDB };