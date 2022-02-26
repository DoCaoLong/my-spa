import React, { useState } from "react";
import PropTypes from "prop-types";
import img from '../../../constants/imageList';
import {Checkbox} from "@mui/material";
ServiceItem.propTypes = {
      serviceItem: PropTypes.object
};
ServiceItem.defaultProps={
      serviceItem:{}
};
function ServiceItem({
      serviceItem,
      handleCheck
}) {
      const [isCheck, setIsCheck]=useState(serviceItem.isBooking);
      var isBooking = isCheck;
      const handleCheckBox=(e)=>{
            setIsCheck(e.target.checked);
            isBooking = e.target.checked
            handleCheck({...serviceItem,isBooking});
      };
      return (
            <div>
                  <>
                  <div className="cus-cart-list__item">
                        <Checkbox
                              className="cus-checkbox__cart"
                              size="small"
                              checked={isCheck}
                              onChange={handleCheckBox}
                              id={"check"+serviceItem.id}
                        />
                        <label className="cus-cart-list__item-img" htmlFor={"check"+serviceItem.id}><img className="image-size"  src={(serviceItem.image)?serviceItem.image_url:''} onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} alt="" /></label>
                        <label className="cus-cart-list__item-name" htmlFor={"check"+serviceItem.id}>
                              {serviceItem.serviceName}
                        </label>
                  </div>
                  <hr className="grey-line cart-line" />
                  </>
            </div>
      );
}

export default ServiceItem;