import React from "react";
import { Slide, Dialog } from "@mui/material";
import { Button } from "@mui/material";
import img from "../../../constants/imageList";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearAllCarts, addCart } from '../../../redux/CartSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function PopUpRequestLocation(props) {
  //const {id} = useParams()
  const dispatch = useDispatch();
  const history = useHistory();
  const { isOpen, setIsOpen, newItemCart } = props;
  const handleAccept = () => {
    dispatch(clearAllCarts())
    const action = addCart(newItemCart)
    dispatch(action)
    setIsOpen(false)
  }
  const handleClose = () => {
    setIsOpen(false)
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        style={{
          zIndex: '1400'
        }}
      >
        <div className="cus-popup-success">
          <img src={img.LocationRequest} alt="" />
          <h1 className="pdt-24 pdb-4 nunito-regular-text-bold-sm">
            {props.title}
          </h1>

          <p className="pdb-24">{props.reason}</p>
          <div className="cus-popup-success__control">
            <Button
              className="cus-cart-dock__button"
              style={{ width: "100%", backgroundColor: 'var(--bgWhite)' }}
              onClick={handleAccept}
            >
              Đồng ý
            </Button>
            <Button
              className="cus-cart-dock__button cus-popup-delete__btn"
              style={{ width: "100%" }}
              onClick={() => history.push("/Frontend/Momo-layout-cart/" + newItemCart?.locationId)}
            >
              Xem giỏ hàng
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default PopUpRequestLocation;
