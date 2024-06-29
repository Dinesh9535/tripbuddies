import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header3() {
  const navigate = useNavigate();

  const pageNavigate = (pageName) => {
    navigate(pageName);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addClass, setAddClass] = useState(false);
  const token = localStorage.getItem('token');


  // Add a class to the element when scrolled 50px
  const handleScroll = () => {
    if (window.scrollY >= 50) {
      setAddClass(true);
    } else {
      setAddClass(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={`header -type-3 js-header ${addClass ? "-is-sticky" : ""}`}
      >
        <div className="header__container container">
          <div className="header__logo">
            <Link to="/" className="header__logo">
              <img src="/img/logo-b.svg" alt="logo icon" />
            </Link>
          </div>

          <div className="headerMobile__right">
            <button
              onClick={() => pageNavigate("/tour-list-1")}
              className="d-flex">
              <i className="icon-search text-18"></i>
            </button>

            <button
              onClick={() => pageNavigate("/login")}
              className="d-flex ml-20" >
              <i className="icon-person text-18"></i>
            </button>
          </div>

          <div className="header__right">
          { token ? (
            
            <Link to="/" onClick={handleLogout} className="button -sm -outline-dark-1 rounded-200 text-dark-1 ml-30" >
              Log Out
            </Link>

              ) : ( 
                <>
                <Link to="/register" className="ml-30">
                Create an Account
                </Link>
    
                <Link to="/login" className="button -sm -outline-dark-1 rounded-200 text-dark-1 ml-30" >
                  Log in
                </Link>
                </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
