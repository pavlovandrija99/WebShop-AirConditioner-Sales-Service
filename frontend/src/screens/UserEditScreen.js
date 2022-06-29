import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions.js";
import { USER_UPDATE_RESET } from "../constants/userConstants.js";

const UserEditScreen = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    succes: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.userEmail || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setFirstName(user.userFirstName);
        setLastName(user.userLastName);
        setUserName(user.userUsername);
        setEmail(user.userEmail);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, id, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser({ id: id, firstName, lastName, userName, email, isAdmin })
    );
  };

  return (
    <>
      <div style={{ width: "fit-content" }}>
        <Link className="btn btn-primary my-3" to="/admin/userlist">
          Go Back
        </Link>
      </div>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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

            <Form.Group controlId="email" style={{ margin: "0 0 35px 0" }}>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group
              controlId="isadmin"
              style={{ margin: "0 0 10px 310px" }}
            >
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(event) => setIsAdmin(event.target.checked)}
              ></Form.Check>
            </Form.Group>

            <div style={{ padding: "20px" }} className="text-center">
              <Button type="submit" variant="primary">
                Update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
