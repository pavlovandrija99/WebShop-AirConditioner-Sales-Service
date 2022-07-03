import React, { useEffect } from "react";
import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message.js";
import { addToCart, removeFromCart } from "../actions/cartActions.js";
import { ORDER_CREATE_RESET } from "../constants/orderConstants.js";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants.js";

const CartScreen = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const productID = location.pathname.split("/")[2];

  const [searchParams] = useSearchParams();

  const quantity = searchParams.get("quantity")
    ? Number(searchParams.get("quantity"))
    : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });

    if (productID) {
      dispatch(addToCart(productID, quantity));
      dispatch({type: ORDER_CREATE_RESET });
    }
  }, [dispatch, productID, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8} className="text-center">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty!&nbsp;&nbsp;<Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row style={{ textAlign: "center" }}>
                  <Col md={3}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} style={{ margin: "60px 0 0 0" }}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} style={{ margin: "60px 0 0 0" }}>
                    ${item.price}
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      style={{ margin: "50px 0 0 0" }}
                      as="select"
                      value={item.quantity}
                      onChange={(event) =>
                        dispatch(
                          addToCart(item.product, Number(event.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      style={{ margin: "50px 0 0 0" }}
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (accumulator, item) => accumulator + item.quantity,
                  0
                )}
                ) items
              </h2>
              Total price:&nbsp;&nbsp;
              {cartItems
                .reduce(
                  (accumulator, item) =>
                    accumulator +
                    item.quantity *
                      item.price.substring(0, item.price.indexOf("€")),
                  0
                )
                .toFixed(2)}&nbsp;€
            </ListGroup.Item>

            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
