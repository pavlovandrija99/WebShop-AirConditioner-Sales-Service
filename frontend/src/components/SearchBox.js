import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
        navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} style={{width:'50%', margin: '0 0 0 20px'}} className="d-flex flex-row">
      <Form.Control
        type="text"
        name="q"
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <div style={{ margin: "0 0 0 15px" }}>
       <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
       </div>
    </Form>
  );
};

export default SearchBox;
