import React, { useState, useEffect } from "react";
import { Container, Button, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LogoutHandle } from "../Redux/ReduxUserData/UserDataAction";
import { useNavigate } from "react-router-dom";

function Navbars() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const reduxUserEmail = useSelector((state) => state.userData.userEmail);
  const reduxUserName = useSelector((state) => state.userData.userName);
  const reduxUserImage = useSelector((state) => state.userData.userImage);

  console.log("<><>", reduxUserEmail, reduxUserName, reduxUserImage);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoutHandler = () => {
    if (reduxUserEmail) {
      window.open("http://localhost:5000/auth/logout", "_self");
      navigate("/");
    }
  };

  return (
    <div className="navbar-container position-relative p-0">
      <p>
        <img
          src="./sideimg/side1.png"
          className=" position-absolute rotate w-25"
          alt="..."
        />
      </p>
      <Container fluid>
        <div
          className={` w-100 text-center mt-3 image-container ${
            scrolled ? "image-scroll-up" : ""
          }`}
        >
          <img src="./logo.png" className="img-fluid" alt="..." />
        </div>
        <Navbar
          collapseOnSelect
          expand="sm"
          className={`d-flex flex-column ${scrolled ? "sticky" : ""}`}
        >
          <div className="pt-2">
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="Togglecolor"
            />
          </div>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto pb-2">
              <Nav.Link href="/home" className="font_white font_hover ">
                Home
              </Nav.Link>
              <Nav.Link href="/About" className="font_white font_hover">
                About us
              </Nav.Link>
              <Nav.Link href="/Ourmenu" className="font_white font_hover">
                Our menu
              </Nav.Link>
              <Nav.Link href="/Gallery" className="font_white font_hover">
                Gallery
              </Nav.Link>
              <Nav.Link href="/Contact" className="font_white font_hover">
                Contact
              </Nav.Link>
            </Nav>
            <Nav>
              {reduxUserImage ? (
                <div className="center">
                  <img
                    src={reduxUserImage}
                    width={40}
                    height={40}
                    alt=""
                    className="mx-2 rounded-circle"
                  />
                </div>
              ) : (
                <></>
              )}
              {reduxUserEmail || reduxUserImage ? (
                <Button
                  onClick={() => {
                    logoutHandler();
                  }}
                >
                  Logout
                </Button>
              ) : (
                <></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

export default Navbars;
