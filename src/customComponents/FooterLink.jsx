import React from "react";

import { NavLink } from "react-router-dom";

function FooterLink({ message, linkText, linkTo }) {
  return (
    <div className="form-footer-link">
      <p>{message}</p>
      <NavLink to={linkTo} className="form-link">
        {linkText}
      </NavLink>
    </div>
  );
}

export default FooterLink;
