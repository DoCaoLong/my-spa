import React, {useContext} from "react";
import { useDispatch } from "react-redux";
import {Slide, Dialog} from '@mui/material';
import {Button} from '@mui/material'
import img from '../../../constants/imageList';
import {useHistory} from 'react-router-dom'
import scrollTop from "../../../utils/scrollTop";
import {clearService} from "../../../redux/serviceBookingListSlice";
import { AppContext } from "../../../context/AppProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});
function PopupPayment(props) {
      const {setOpenNextBranches} = useContext(AppContext);
      const history = useHistory();
      const dispacth = useDispatch();
      const {
            isOpen, 
            setIsOpen, 
            inServices, 
            date
      } = props;
      const handleClose = () => {
            setIsOpen(false);
            dispacth(clearService())
            history.push('/Frontend/Home');
            scrollTop();
      };
      const handleBooking = () => {
            setIsOpen(false);
            if (inServices === true) {
                  setOpenNextBranches(false);
                  const dateArr = date.split('-')
                  history.push({
                        pathname: '/Frontend/Calendar',
                        state: {
                              date: parseInt(dateArr[2]),
                              month: parseInt(dateArr[1]),
                              year: parseInt(dateArr[0]),
                        }
                  });
            } else {
                  dispacth(clearService())
                  history.push('/Frontend/Calendar');
                  scrollTop();
            }
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
                              <img src={img.bookingSuccess} onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} alt="" />
                              <h1 className="pdt-24 pdb-4 nunito-regular-text-bold-sm">{props.title} </h1>

                              <p style={{whiteSpace:'pre-line'}} className="pdb-24">{props.reason}</p>
                              <div className="cus-popup-success__control">
                                    {
                                          (props.popUpType)?
                                          (
                                                <>
                                                <Button className="cus-cart-dock__button cus-popup-delete__btn" style={{width: '100%'}} onClick={handleClose}>Hoàn thành</Button>
                                                <Button className="cus-cart-dock__button cus-popup-delete__btn" style={{width: '100%'}} onClick={handleBooking}>Xem lịch hẹn</Button>
                                                </>
                                          )
                                          :
                                          (
                                                <Button className="cus-cart-dock__button cus-popup-delete__btn" style={{width: '100%'}} onClick={handleClose}>Về trang chủ</Button>
                                          )
                                    }
                                    
                              </div>
                        </div>
                  </Dialog>
            </div>
      );
}

export default PopupPayment;