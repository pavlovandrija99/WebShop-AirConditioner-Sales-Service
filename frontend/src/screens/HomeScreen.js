import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "../components/Product.js";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import Paginate from "../components/Paginate.js";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productActions.js";

const HomeScreen = () => {
  let { keyword, pageNumber } = useParams();

  if (!pageNumber || typeof pageNumber === "undefined") {
    pageNumber = 1;
  }

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row style={{margin: '0 0 20px 0'}}>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
