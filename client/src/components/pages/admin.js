import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Offcanvas, Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import Footer from "../common/footer";

const Adminpg = () => {
  const [isProduct, setIsProduct] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleEditClick = (id) => {
    setIsEditing(true);
    setEditingId(id);
  };

  const handleSaveClick = (id) => {
    setIsEditing(false);
    setEditingId(null);
    handlePutRequest(id);
  };

  const handleLogin = () => {
    setIsProduct(true);
    setIsClient(false);
    handleClose();
  };

  const handleShowReports = () => {
    setIsProduct(false);
    setIsClient(true);
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
    getdata();
  };

  const formHandle = async (e) => {
    e.preventDefault();
    const data = { productName, productImage, productPrice };
    try {
      await axios.post("http://localhost:5000/product-post", data);
      console.log("Data Submitted Successfully");
      getdata();
    } catch (error) {
      console.error(error);
    }
  };

  const getdata = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product-get");
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePutRequest = async (id) => {
    const data = { productName, productImage, productPrice };
    try {
      await axios.put(`http://localhost:5000/product-update/${id}`, data);
      console.log("Data Updated");
      getdata();
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:5000/product-delete/${id}`)
      .then(() => {
        setUserData(userData.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Make sure to pass any dependencies if needed

  return (
    <Container fluid>
      <Row>
        <h1 className="text-center mt-5">Welcome Admin</h1>
      </Row>
      <Row>
        <span className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleShow}>
            Launch
          </Button>
        </span>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column gap-2">
            <span>
              <Button onClick={handleLogin}>Product Add</Button>
            </span>

            <span>
              <Button onClick={handleShowReports}>Orders</Button>
            </span>
          </Offcanvas.Body>
        </Offcanvas>
      </Row>

      <div className="pt-5">
        {isProduct ? (
          <div>
            <Row className="m-5">
              <h1 className="text-center">Product Add</h1>
              <div className="d-flex justify-content-center align-items-center mt-5">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicProductName">
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Name"
                      value={productName}
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicImageUrl">
                    <Form.Control
                      type="text"
                      placeholder="Enter Image Url"
                      value={productImage}
                      onChange={(e) => {
                        setProductImage(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Control
                      type="text"
                      placeholder="Enter Price"
                      value={productPrice}
                      onChange={(e) => {
                        setProductPrice(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" onClick={formHandle}>
                    Submit
                  </Button>
                </Form>
              </div>
            </Row>
            <Row>
              <h1 className="text-center">Product Update</h1>
            </Row>
            <Row className="m-5">
              <Col xs={12}>
                <Table responsive striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>S/no</th>
                      <th>pId</th>
                      <th>productName</th>
                      <th>productImage</th>
                      <th>productPrice</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user._id}</td>
                        <td>
                          {isEditing && editingId === user._id ? (
                            <input
                              type="text"
                              value={productName}
                              onChange={(e) => setProductName(e.target.value)}
                            />
                          ) : (
                            user.productName
                          )}
                        </td>
                        <td>
                          {isEditing && editingId === user._id ? (
                            <input
                              type="text"
                              value={productImage}
                              onChange={(e) => setProductImage(e.target.value)}
                            />
                          ) : (
                            user.productImage
                          )}
                        </td>
                        <td>
                          {isEditing && editingId === user._id ? (
                            <input
                              type="text"
                              value={productPrice}
                              onChange={(e) => setProductPrice(e.target.value)}
                            />
                          ) : (
                            user.productPrice
                          )}
                        </td>
                        <td>
                          {isEditing && editingId === user._id ? (
                            <button onClick={() => handleSaveClick(user._id)}>
                              Save
                            </button>
                          ) : (
                            <button onClick={() => handleEditClick(user._id)}>
                              <PencilSquare />
                            </button>
                          )}
                          <button onClick={() => onDelete(user._id)}>
                            <Trash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        ) : isClient ? (
          <div>
            <p>Client Page Content</p>
          </div>
        ) : null}
      </div>
      <Row className="mt-5">
        <Footer />
      </Row>
    </Container>
  );
};

export default Adminpg;
