import React from "react";
function SocialSignUpButton() {
    return (
      <div className="social-button">
        <button className="social-google-button mt-2">
          <img
            src="https://workspacetips.io/cdn/images/google/google_icon.png"
            alt="Google logo"
            className="google-logo"
          />
          Sign up with Google
        </button>
      </div>
    );
}
export default SocialSignUpButton;