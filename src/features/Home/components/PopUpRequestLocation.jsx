import React, { useEffect, useState } from "react";
import { Slide, Dialog } from "@mui/material";
import { Button } from "@mui/material";
import img from "../../../constants/imageList";
import { useHistory } from "react-router-dom";
import scrollTop from "../../../utils/scrollTop";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function PopUpRequestLocation(props) {
  const history = useHistory();
  const { isOpen, setIsOpen } = props;
  const locate = JSON.parse(sessionStorage.getItem('locationAccept'));
  const [userLocation, setUserLocation] = useState(locate);
  useEffect(() => {
    if (!locate) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude
        })
      })
    }
  }, [locate])
  sessionStorage.setItem("locationAccept", JSON.stringify(userLocation));
  const handleClose = () => {
    setIsOpen(false);
    history.push("/Frontend/Home");
    scrollTop();
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="cus-popup-success">
          <img src={img.LocationRequest} alt="" />
          <h1 className="pdt-24 pdb-4 nunito-regular-text-bold-sm">
            Yêu cầu truy cập vị trí!{" "}
          </h1>

          <p className="pdb-24">{props.reason}</p>
          <div className="cus-popup-success__control">
            <p></p>
            <Button
              className="cus-cart-dock__button cus-popup-delete__btn"
              style={{ width: "100%" }}
              onClick={handleClose}
            >
              Đã hiểu
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default PopUpRequestLocation;
