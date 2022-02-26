import React from 'react';
import { Dialog } from '@mui/material'

function NotiBooking(props) {
      const {open, setOpen} = props;
      return (
            <Dialog
                  open={open}
                  onClose={() => setOpen(false)}
            >
                  <div className='order-noti'>
                        <span>Thông báo</span>
                  </div>
            </Dialog>
      );
}

export default NotiBooking;