import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import Paginate from "../components/Paginate.js";
import { listProducts, deleteProduct } from "../actions/productActions.js";

const ProductListScreen = () => {
  const navigate = useNavigate();

  const { keyword } = useParams();

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate, successDelete]);

  const createProductHandler = (product) => {};

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <Row className="text-center">
        <Col className="text-left" style={{ margin: "0 0 0 460px" }}>
          <h1>Products</h1>
        </Col>
        <Col className="text-right" style={{ margin: "0 0 0 250px" }}>
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table
          style={{ margin: "20px 0 0 0" }}
          striped
          bordered
          hover
          responsive
          className="table-sm text-center"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>MODEL</th>
              <th>PRICE</th>
              <th>CLASS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.airConditionerModel}</td>
                <td>{product.airConditionerPrice}</td>
                <td>{product.energyClass}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
