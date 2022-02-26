import React from "react";
import {Slide, Dialog} from '@mui/material';
import {Button} from '@mui/material'
import img from '../../../constants/imageList';
import {useHistory} from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});
function PopupPayment(props) {
      const history = useHistory();
      const {isOpen, setIsOpen} = props;
      const url = "/Frontend/Momo-booking-step-1";
      // const handleClose = () => {
      //       setIsOpen(false);
      //       localStorage.removeItem('booking');
      //       // history.push('/Frontend/Home')
      // };
      const gotoAppointment=()=>{
            setIsOpen(false);
            history.push(`${url}`);
      }
      return (
            <div>
                  <Dialog
                        open={isOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        // onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                  >
                        <div className="cus-popup-success">
                              <img src={img.imgPayment} alt="" />
                              <h1>Thanh toán thành công</h1>
                              <p> Đặt hẹn ngay !</p>
                              {/* <div className="cus-popup-success__control">
                                    <Button className="cus-cart-dock__button cus-popup-delete__btn" onClick={handleClose}>Để sau</Button> 
                                    <Button className="cus-cart-dock__button cus-popup-delete__btn" onClick={gotoAppointment}>Đặt hẹn</Button>
                              </div> */}
                              <div className="cus-popup-success__control">
                                    <Button className="cus-cart-dock__button cus-popup-delete__btn alone" onClick={gotoAppointment}>Đặt hẹn</Button>
                              </div>
                        </div>
                  </Dialog>
            </div>
      );
}

export default PopupPayment;