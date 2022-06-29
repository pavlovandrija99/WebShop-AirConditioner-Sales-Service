import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions.js";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_RESET,
} from "../constants/orderConstants.js";

import StripePayButton from "../components/StripePayButton.js";

const OrderScreen = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { paymentMethod } = cart;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loadingPay, successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== id) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, order, successPay, successDeliver, navigate, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
    dispatch(getOrderDetails(id));
    dispatch({ type: ORDER_CREATE_RESET });
    dispatch({ type: ORDER_DETAILS_RESET });
    navigate("/profile");
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
    dispatch(getOrderDetails(id));
    navigate("/admin/orderlist");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="">
            <ListGroup.Item style={{ textAlign: "center" }}>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.userFirstName}&nbsp;
                {order.user.userLastName}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.userEmail}`}>
                  {order.user.userEmail}
                </a>
              </p>
              <p>
                <strong>Address:&nbsp;</strong>
                {order.orderAddress}, {order.orderCity} {order.orderPostalCode},{" "}
                {order.orderCountry}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on: {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item style={{ textAlign: "center" }}>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:&nbsp;</strong>
                {order.orderPaymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on: {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 style={{ textAlign: "center" }}>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is Empty!</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
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
                  <Col>Total:</Col>
                  <Col style={{ margin: "0 60px 0 0" }}>
                    {order.orderPrice}&nbsp;
                  </Col>
                </Row>
              </ListGroup.Item>

              {paymentMethod === "Stripe" && (
                <ListGroup.Item className="d-grid gap-2">
                  <StripePayButton order={order} />
                </ListGroup.Item>
              )}

              {paymentMethod === "PayPal" && !order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={Number(
                        order.orderPrice.substring(
                          0,
                          order.orderPrice.indexOf("€")
                        )
                      )}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item className="d-grid gap-2">
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
