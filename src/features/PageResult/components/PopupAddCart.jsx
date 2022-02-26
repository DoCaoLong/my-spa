import React, { useEffect } from 'react';
import { Dialog } from '@mui/material';
import img from '../../../constants/imageList';

function PopupAddCart(props) {
      const { open, setOpen, name } = props;
      const handleClose = () => {
            setOpen(false)
      }
      useEffect(() => {
            if (open === true) {
                  const timer = setTimeout(() => {
                        handleClose();
                  }, 800);
                  return () => clearTimeout(timer)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [open])
      return (
            <Dialog
                  open={open}
                  onClose={() => setOpen(false)}
            >
                  <div className="add-cart-noti">
                        <img src={img.checCirclePurple} alt="" />
                        <span
                              className="add-cart-noti__title"
                        >
                              Đã thêm "{name}" vào giỏ hàng 
                        </span>
                  </div>
            </Dialog>
      );
}

export default PopupAddCart;