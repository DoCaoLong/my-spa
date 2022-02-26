import React from 'react';
import { Slide, Dialog, Button } from '@mui/material';
import { clearByCheck } from '../../../redux/CartSlice';
import { useDispatch } from 'react-redux';
//import {useHistory} from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});


function PopupDeleteAll(props) {
      //const history = useHistory();
      const { dialogAll, setDialogAll, keepCart, confirmList } = props;
      const dispatch = useDispatch();
      const handleClose = () => {
            setDialogAll(false);
      };
      const handleDeleteClick = () => {
            dispatch(clearByCheck(keepCart))
            setDialogAll(false)
      }
      return (
            <div>
                  <Dialog
                        open={dialogAll}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                  >
                        <div className="cus-popup-delete">
                              <div className="cus-popup-delete__text">Bạn muốn xóa {confirmList.length} (items) trong giỏ hàng không ?</div>
                              <div className="cus-popup-delete__control">
                                    <Button className="cus-cart-dock__button cus-popup-delete__btn" onClick={handleClose}>Hủy</Button>
                                    <Button className="cus-cart-dock__button cus-popup-delete__btn" onClick={handleDeleteClick}>Đồng ý</Button>
                              </div>
                        </div>
                  </Dialog>
            </div>
      );
}

export default PopupDeleteAll;