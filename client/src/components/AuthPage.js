// AuthPage.js
import React from 'react';
import './Styles/AuthPage.css'; // Import CSS for shared styles

const AuthPage = ({ children, goToPage, buttonLabel, sideText }) => {
  return (
    <div className=" container-fluid  auth-container">
      <div className=" atos-image row full-height">
        <div className="col-6  auth-side-text d-flex align-items-center justify-content-center text-center">
          
          <div className="extra-top">
            <h4>{sideText}</h4>
            <button className="btn btn-dark mt-3" onClick={() => { window.location.href = goToPage; }}>
              {buttonLabel}
            </button>
          </div>
        </div>
        <div className="col-6 d-flex align-items-center justify-content-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
