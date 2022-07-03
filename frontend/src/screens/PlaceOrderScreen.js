import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { createOrder } from "../actions/orderActions.js";
import { USER_DETAILS_RESET } from "../constants/userConstants.js";
import { ORDER_CREATE_RESET } from "../constants/orderConstants.js";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) =>
      acc +
      Number(item.price.substring(0, item.price.indexOf("€"))) * item.quantity,
    0
  );

  cart.shippingPrice = cart.itemsPrice > 350 ? 0 : 10;
  cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET });
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success, order, dispatch]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        totalPrice: cart.totalPrice,
        paymentMethod: cart.paymentMethod,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row /*className="justify-content-center mb-4"*/>
        <Col md={8}>
          <ListGroup variant="">
            <ListGroup.Item style={{ textAlign: "center" }}>
              <h2>Shipping</h2>
              <p>
                <strong>Address:&nbsp;</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item style={{ textAlign: "center" }}>
              <h2>Payment Method</h2>
              <strong>Method:&nbsp;</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 style={{ textAlign: "center" }}>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty!</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col style={{ margin: "30px 0 0 30px" }}>
                          <Link to={`product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} style={{ margin: "30px 0 0 30px" }}>
                          {item.quantity} x {item.price} ={" "}
                          {item.quantity *
                            Number(
                              item.price.substring(0, item.price.indexOf("€"))
                            )}
                          &nbsp;€
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ textAlign: "center" }}>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items price:</Col>
                  <Col>{cart.itemsPrice}&nbsp;€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{cart.shippingPrice}&nbsp;€</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>{cart.totalPrice}&nbsp;€</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item className="d-grid gap-2">
                <Button
                  type="button"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
