import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import image from './logo.c57561d803b277bebe44.png'

const Header = () => {
  const [sidetoggle, setSideToggle] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handletoggleBtn = () => {
    setSideToggle(!sidetoggle);
  };

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("login");
    
    // Navigate to the login page
    window.location.href="/"
  };

  return (
    <>
      <header>
        <div className="top-head">
          <div className="right">
            {/* <h2>N.I.M.T Admin Panel</h2> */}
            <img src={image} alt="" style={{width:50}}/>
            <div className="bar" onClick={handletoggleBtn}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="left">
            <a href="" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-globe"></i>
              Go To Website
            </a>

            <div className="logout" onClick={handleLogout}>
              Log Out <i className="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>
        </div>

        <div className={`rightNav ${sidetoggle ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/dashboard" onClick={handletoggleBtn}>
                <i className="fa-solid fa-gauge"></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/all-users" onClick={handletoggleBtn}>
                <i className="fa-solid fa-user"></i> All Enquery
              </Link>
            </li>
            <li>
              <Link to="/all-gallery" onClick={handletoggleBtn}>
                <i className="fa-solid fa-layer-group"></i> Manage Gallery
              </Link>
            </li>
            <li>
              <Link to="/all-news" onClick={handletoggleBtn}>
                <i className="fa-solid fa-layer-group"></i> Manage News
              </Link>
            </li>
            <li>
              <Link to="/all-course-category" onClick={handletoggleBtn}>
                <i className="fa-solid fa-tag"></i> Manage Course Category
              </Link>
            </li>
            <li>
              <Link to="/all-course" onClick={handletoggleBtn}>
                <i className="fa-solid fa-tag"></i> Manage Course
              </Link>
            </li>
            <li>
              <Link to="/all-course-details" onClick={handletoggleBtn}>
                <i className="fa-solid fa-layer-group"></i> Manage Course Details
              </Link>
            </li>
            <button className='logout mb-5' onClick={handleLogout}>
              Log Out <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
