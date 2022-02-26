import React from "react";
import {Slide, Dialog} from '@mui/material';
import {Button} from '@mui/material'
// import img from '../../../constants/imageList';

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});
function warningPopUp(props) {
      const {isOpen, setIsOpen} = props;
      const handleClose = () => {
            setIsOpen(false);
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
                              {/* <img src={img.imgPayment} alt="" /> */}
                              <h1 className="pdb-4 nunito-regular-text-bold-sm" style={{marginTop: 0}}>Lưu ý! </h1>
                              <p className="pdb-24">{props.reason}</p>
                              <Button className="cus-cart-dock__button cus-popup-delete__btn" style={{width: '100%'}} onClick={handleClose}>Đã hiểu</Button>
                        </div>
                  </Dialog>
            </div>
      );
}

export default warningPopUp;