import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { getUserDetails, updateUserProfile } from "../actions/userActions.js";
import { listMyOrders } from "../actions/orderActions.js";

const ProfileScreen = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, orders, error: errorOrders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.userEmail) {
        dispatch(getUserDetails(userInfo.userEmail));
      } else {
        setFirstName(user.userFirstName);
        setLastName(user.userLastName);
        setUserName(user.userUsername);
        setEmail(user.userEmail);
      }
      dispatch(listMyOrders());
    }
  }, [dispatch, userInfo, navigate, user, user.userFirstName]);

  const submitHandler = (e) => {
    // preventDefault() obezbedjuje da se forma ne refresuje prilikom submit-a forme.
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstName,
          lastName,
          userName,
          email,
          password,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2 className="text-center">User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated!</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter first name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter last name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="userName">
            <Form.Label>User name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter user name"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></Form.Control>
          </Form.Group>

          <div style={{ padding: "20px" }} className="text-center">
            <Button type="submit" variant="primary">
              Update
            </Button>
          </div>
        </Form>
      </Col>
      <Col md={9} className="text-center">
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.orderPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">Details</Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
