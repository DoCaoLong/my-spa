import React from "react";
import PropTypes from "prop-types";
import Img from "../../../constants/imageList";
import { checkBranch } from "../../../redux/serviceBookingListSlice";
import { useDispatch } from "react-redux";

ServiceItem.propTypes = {
      serviceItem: PropTypes.object
};
ServiceItem.defaultProps = {
      serviceItem: {}
};

function ServiceItem({
      branchItem,
      setBookingList,
      setBrBooking
}) {
      const dispatch = useDispatch();
      const handleCheckBox = (e) => {
            if (setBrBooking) {
                  setBrBooking(branchItem);
            }
            const action = checkBranch({ ...branchItem });
            dispatch(action);
      };
      return (
                <React.Fragment >
                    <div className="flex-box-row pdt-12 pdb-12">
                              <label htmlFor={"cb"+branchItem.id} className="cus-cart-branch-list__item-img">
                                    <img className="image-size" src={branchItem.image_url||''} onError={(e)=>{e.target.src=Img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} alt="" />
                              </label>
                              <div className="flex-box-col pd-4 cus-cart-branch-list__item-content ml-8">
                                    <input type="radio"  onChange={handleCheckBox}  name="branch_check" id={"cb"+branchItem.id} className="hidden"/>
                                    <label className="montserrat-text-md text-black-color pdb-4" htmlFor={"cb"+branchItem.id}>
                                          {branchItem.name}
                                          <img className="branch-check_icon pdl-10" src={Img.union} alt=""/>
                                    </label>
                                    <label htmlFor={"cb"+branchItem.id} className="pdt-4">
                                    <div className="flex-box-row">
                                          <img className="icon pdr-8" src={Img.mapPin} alt="map pin icon" />
                                          <span className="montserrat-text-sm text-grey-color">
                                                {branchItem.full_address}
                                          </span>
                                    </div>
                                    </label>
                              </div>
                    </div>
                <hr className="grey-line cart-line" />
                </React.Fragment>
      );
}

export default ServiceItem;