import React from 'react';
import {Slide, Dialog, Button} from '@mui/material';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});
function PopupDeleteItem(props) {
      const {dialogAll, setDialogAll, handleDelete, cartItem} = props;
      const history = useHistory();
      const carts = useSelector((state)=> state.carts);
      const handleDeleteClick = () => {
            if (carts.cartItems.length === 1 && handleDelete) {
                  handleDelete(cartItem);
                  history.goBack();
            }
            else if (handleDelete) {
                  handleDelete(cartItem)
            }
            setDialogAll(false)
      }
      const handleClose = () => {
            setDialogAll(false);
      };
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
                              <div className="cus-popup-delete__text">Bạn muốn xóa {cartItem.serviceName} không ?</div>
                              {/* <div className="cus-popup-delete__text cus-popup-delete__text-product">{cartItem.serviceName}</div> */}
                              <div className="cus-popup-delete__control">
                                    <Button className="cus-cart-dock__button cus-popup-delete__btn" onClick={handleClose}>Hủy</Button>
                                    <Button className="cus-cart-dock__button cus-popup-delete__btn" onClick={handleDeleteClick}>Đồng ý</Button>
                              </div>
                        </div>
                  </Dialog>
            </div>
      );
}

export default PopupDeleteItem;