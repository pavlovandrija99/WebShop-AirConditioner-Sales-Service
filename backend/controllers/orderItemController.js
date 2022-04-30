import asyncHandler from 'express-async-handler';

import { getOrderItemsFromDB, getOrderItemByIDFromDB, addOrderItem,
         updateOrderItemFromDB, deleteOrderItemFromDB }
        from '../services/orderItemService.js';

import OrderItemHelper from '../helpers/orderItemHelper.js'

// Fetches all order items from DB.
const getOrderItems = asyncHandler(async(req, res) => {
    let orderItems = await getOrderItemsFromDB();

    if(orderItems) {
        res.status(200).json(orderItems);
    } else {
        res.status(404);
        throw new Error('Order items not found!');
    }
});

// Fetches single order item by ID from DB.
const getOrderItemByID = asyncHandler(async(req, res) => {
    let orderItem = await getOrderItemByIDFromDB(req.params.id);

    if(orderItem) {
        res.status(200).json(orderItem);
    } else {
        res.status(404);
        throw new Error('Order item not found!');
    }
});

// Creates a new order item instance in DB.
const createOrderItem = asyncHandler(async(req, res) => {
    let createOrderItemWithHelper = OrderItemHelper.createOrderItemObjectHelper(req.body);

    let createdOrderItem = await addOrderItem(createOrderItemWithHelper);

    if(createdOrderItem) {
        res.status(201).json(createdOrderItem);
    } else {
        res.status(500);
        throw new Error('Order item creation failed!');
    }
});

// Updates single instance of order item by ID.
const updateOrderItem = asyncHandler(async(req, res) => {
    let orderItemToUpdate = await getOrderItemByIDFromDB(req.params.id);

    if(!orderItemToUpdate) {
        res.status(400);
        throw new Error('Order item not found!');
    }

    let updatedOrderItemWithHelper = OrderItemHelper.updateOrderItemHelper(orderItemToUpdate, req.body);

    let updatedOrderItem = await updateOrderItemFromDB(updatedOrderItemWithHelper);

    if(!updatedOrderItem) {
        res.status(500);
        throw new Error('Order item failed to update!');
    }

    res.status(200).json(updatedOrderItem);
});

// Deletes single instance of order item from DB, by ID.
const deleteOrderItem = asyncHandler(async(req, res) => {
    let orderItemToDelete = await getOrderItemByIDFromDB(req.params.id);

    if(!orderItemToDelete) {
        res.status(400);
        throw new Error('Order item not found!');
    }

    let deletedOrderItem = await deleteOrderItemFromDB(orderItemToDelete);

    if(!deletedOrderItem) {
        res.status(500);
        throw new Error('Order item deletion failed!');
    }

    res.status(204).json({message: 'Order item deleted successfully!'});
});

export { getOrderItems, getOrderItemByID, createOrderItem, updateOrderItem,
         deleteOrderItem };