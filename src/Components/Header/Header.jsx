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
              <Link to="/all-tags" onClick={handletoggleBtn}>
                <i className="fa-solid fa-tag"></i> Manage Course Category
              </Link>
            </li>
            <li>
              <Link to="/all-category" onClick={handletoggleBtn}>
                <i className="fa-solid fa-tag"></i> Manage Course
              </Link>
            </li>
            <li>
              <Link to="/all-products" onClick={handletoggleBtn}>
                <i className="fa-solid fa-layer-group"></i> Manage Course Details
              </Link>
            </li>
            <li>
              <Link to="/all-users" onClick={handletoggleBtn}>
                <i className="fa-solid fa-user"></i> All Users
              </Link>
            </li>
            {/* Uncomment the lines below if you want to include them */}
            {/* <li><Link to="/all-banners" onClick={handletoggleBtn}><i className="fa-regular fa-images"></i> Manage Banners</Link></li>
            <li><Link to="/all-shop-banners" onClick={handletoggleBtn}><i className="fa-brands fa-unsplash"></i> Manage Shop Banners</Link></li>
            <li><Link to="/all-voucher" onClick={handletoggleBtn}><i className="fa-brands fa-cc-discover"></i> Manage Voucher</Link></li>
            <li><Link to="/all-orders" onClick={handletoggleBtn}><i className="fa-solid fa-truck-arrow-right"></i> Manage Orders</Link></li> */}
            
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
