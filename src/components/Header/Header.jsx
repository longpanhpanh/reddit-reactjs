import React from "react";
import { Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { logout } from "../../redux/userSlice";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "./Header.scss";

const Header = () => {
  const auth = useAuth();
  const loggedIn =
    auth.username && JSON.parse(localStorage.getItem("user"))?.username;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const handleLogout = async (e) => {
    e.preventDefault();

    localStorage.removeItem("user");
    try {
      await axiosPrivate.post("/auth/logout", {
        username: auth.username,
        refreshToken: auth.refreshToken,
      });
      dispatch(logout());
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleToProfile = () => {
    navigate("/user/profile");
  };

  return (
    <header>
      <Navbar className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="flex-grow-1">
          <Link aria-label="Home" className="logo" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="reddit-icon-svg"
            >
              <g>
                <circle fill="#FF4500" cx="10" cy="10" r="10"></circle>
                <path
                  fill="#FFF"
                  d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"
                ></path>
              </g>
            </svg>
            <span className="reddit-text">Spring Reddit Clone</span>
          </Link>
        </div>
        <div className="flex-grow-1">
          {!loggedIn ? (
            <div className="float-right d-flex p-2 justify-content-end">
              <Link to="/registration" className="float-right sign-up mr-2">
                Sign up
              </Link>

              <Link to="/login" className="float-right login mr-2">
                Login
              </Link>
            </div>
          ) : (
            <div
              className="d-flex justify-content-end"
              style={{ marginRight: "15px" }}
            >
              <div className="avatar">
                <img
                  src="https://i.pinimg.com/474x/eb/c8/82/ebc882ee454681ad38fcf9380342bc03.jpg"
                  alt=""
                />
              </div>
              <Dropdown as={ButtonGroup}>
                <Button variant="success" style={{ minWidth: "100px" }}>
                  {loggedIn}
                </Button>

                <Dropdown.Toggle
                  split
                  variant="success"
                  id="dropdown-split-basic"
                />

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleToProfile}>
                    Profile
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
