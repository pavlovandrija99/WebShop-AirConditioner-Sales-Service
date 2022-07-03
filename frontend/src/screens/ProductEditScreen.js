import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import FormContainer from "../components/FormContainer";
import {
  listProductDetails,
  updateProduct,
} from "../actions/productActions.js";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants.js";
import axios from "axios";

const ProductEditScreen = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [airConditionerModel, setAirConditionerModel] = useState("");
  const [airConditionerPrice, setAirConditionerPrice] = useState(0);
  const [airConditionerDescription, setAirConditionerDescription] =
    useState("");
  const [stock, setStock] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [image, setImage] = useState("");
  const [energyClass, setEnergyClass] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch({ type: PRODUCT_DETAILS_RESET });
      navigate(`/admin/productlist`);
    } else {
      if (!product.airConditionerModel || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setAirConditionerModel(product.airConditionerModel);
        setAirConditionerPrice(product.airConditionerPrice);
        setAirConditionerDescription(product.airConditionerDescription);
        setStock(product.stock);
        setNumReviews(product.numReviews);
        setImage(product.image);
        setEnergyClass(product.energyClass);
      }
    }
  }, [dispatch, navigate, id, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        airConditionerModel,
        airConditionerPrice,
        airConditionerDescription,
        stock,
        numReviews,
        image,
        energyClass,
      })
    );
  };

  return (
    <>
      <div style={{ width: "fit-content" }}>
        <Link className="btn btn-primary my-3" to="/admin/productlist">
          Go Back
        </Link>
      </div>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className="text-center">
            <Form.Group controlId="airConditionerModel">
              <Form.Label>Air Conditioner Model</Form.Label>
              <Form.Control
                style={{ margin: "0 0 10px 0" }}
                type="name"
                placeholder="Enter air conditioner model"
                value={airConditionerModel}
                onChange={(event) => setAirConditionerModel(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="airConditionerPrice">
              <Form.Label>Air Conditioner Price</Form.Label>
              <Form.Control
                style={{ margin: "0 0 10px 0" }}
                type="name"
                placeholder="Enter air conditioner price"
                value={airConditionerPrice}
                onChange={(event) => setAirConditionerPrice(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="airConditionerDescription">
              <Form.Label>Air Conditioner Description</Form.Label>
              <Form.Control
                style={{ margin: "0 0 10px 0" }}
                type="name"
                placeholder="Enter air conditioner description"
                value={airConditionerDescription}
                onChange={(event) =>
                  setAirConditionerDescription(event.target.value)
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group
              controlId="airConditionerStock"
              style={{ margin: "0 0 35px 0" }}
            >
              <Form.Label>Air Conditioner Stock</Form.Label>
              <Form.Control
                style={{ margin: "0 0 10px 0" }}
                type="number"
                placeholder="Enter air conditioner stock"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group
              controlId="airConditionerNumReviews"
              style={{ margin: "0 0 35px 0" }}
            >
              <Form.Label>Air Conditioner Number of Reviews</Form.Label>
              <Form.Control
                style={{ margin: "0 0 10px 0" }}
                type="number"
                placeholder="Enter air conditioner number of reviews"
                value={numReviews}
                onChange={(event) => setNumReviews(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" style={{ margin: "0 0 35px 0" }}>
              <Form.Label>Air Conditioner Image</Form.Label>
              <Form.Control
                style={{ margin: "0 0 10px 0" }}
                type="text"
                placeholder="Enter air conditioner image url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group
              controlId="airConditionerEnergyClass"
              style={{ margin: "0 0 35px 0" }}
            >
              <Form.Label>Air Conditioner Energy Class</Form.Label>
              <Form.Control
                style={{ margin: "0 0 10px 0" }}
                type="text"
                placeholder="Enter air conditioner energy class"
                value={energyClass}
                onChange={(event) => setEnergyClass(event.target.value)}
              ></Form.Control>
            </Form.Group>

            <div style={{ padding: "20px" }} className="text-center">
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

/*
<Form.File
id="image-file"
label="Choose File"
custom
onChange={(e) => uploadFileHandler(e)}
></Form.File>
{uploading && <Loader />}
*/

export default ProductEditScreen;
