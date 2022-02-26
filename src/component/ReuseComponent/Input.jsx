import React, { useState } from "react";
import PropTypes from "prop-types";
import img from "../../constants/imageList";
Input.propTypes = {
  labelClass: PropTypes.string,
  labelFor: PropTypes.any,
  labelText: PropTypes.string,
  inputClass: PropTypes.string,
  Type: PropTypes.string,
  InputId: PropTypes.any,
  value: PropTypes.any,
  name: PropTypes.any,
};
Input.defaultProps = {
  labelClass: "",
  labelFor: "",
  labelText: "",
  inputClass: "",
  Type: "",
  InputId: "",
  value: "",
  name: "",
};
function Input({
  labelClass,
  labelFor,
  labelText,
  inputClass,
  Type,
  InputId,
  value,
  setValue,
  name,
  ...others
}) {
  const [oldValue, setNewValue] = useState(value);
  const handleOnChange = (props) => {
    if(props){
      setNewValue(props.value);
      setValue(props);
    }
  };
  return (
    <>
      <label
        className={
          labelClass ||
          "form-checkin-lable nunito-text-tool-tip text-grey-color"
        }
      >
        {labelText}
      </label>
      <div className="flex-box-row position-relative">
        <input
          className={inputClass || "nunito-text-md text-black-color"}
          id={InputId}
          type={Type || "text"}
          value={oldValue}
          {...others}
          name={name}
          onChange={(e) => {
            handleOnChange(e.target);
          }}
        />
        {oldValue && (
          <img
            className="position-absolute"
            style={{ right: 0 }}
            src={img.xCircle} 
            onClick={()=>setNewValue("")}
            alt=""
          />
        )}
      </div>
    </>
  );
}
export default Input;
