import React from "react";

function FormInput({ label, type = "text", placeholder, value, setValue, error }) {
    return (
      <div className="form-group">
        <label className="form-label">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input-field"
        />
        {error && <p className="form-error">{error}</p>}
      </div>
    );
  }
  
  export default FormInput;
  