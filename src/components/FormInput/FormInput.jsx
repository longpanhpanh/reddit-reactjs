import { useState } from "react";

import "./FormInput.scss";

const FormInput = (props) => {
  const { label, onChange, id, errorMessage, ...inputProps } = props;

  const [touched, setTouched] = useState(false);

  return (
    <div className="form-group row m-3">
      <label className="col-md-4 col-form-label text-md-right">{label}</label>
      <div className="col-md-6">
        <input
          className="form-control"
          {...inputProps}
          onChange={onChange}
          onBlur={(e) => setTouched(true)}
          focused={touched.toString()}
        />
        <span className="error-message">{errorMessage}</span>
      </div>
    </div>
  );
};

export default FormInput;
