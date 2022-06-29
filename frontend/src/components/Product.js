import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating.js";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card className="my-2 p-2 rounded" style={{ height: "400px" }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="text-center">
            <strong>{product.airConditionerModel}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="text-center">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews `}
          />
        </Card.Text>

        <Card.Text as="h3" className="text-center">
          {product.airConditionerPrice}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
