import React from 'react';
import { Dialog } from '@mui/material';
import {Button} from '@mui/material';
import * as Sentry from "@sentry/react";
// import { set } from 'lodash';
// import {useHistory} from 'react-router-dom'

//const title='Có lỗi xảy ra \n Vui lòng thử lại sau.'
function Error(props) {
      // const history = useHistory();
      const scope = new Sentry.Scope();
      const {open, setOpen, title,  error} = props;
      let message = '';
      scope.setTag("section", error);
      const handleClose=()=>{
            Sentry.captureException(new Error("something went wrong"), () => scope);
            (error.response?.status === 429 ) && window.location.reload();
            setOpen(false);
      }
      switch (error?.response?.status) {
            case 400:
                  message = 'không tìm thấy trang !';
                  break;
            case 404: 
                  message = 'không tìm thấy trang !';
                  break;
            case 500:
                  message = 'Hệ thống đã xảy ra lỗi, thử lại sau nha !';
                  break;
            default:
                  message = 'Đã xảy ra lỗi thử lại sau nha!';
                  break;
      }
      return (
            <Dialog
                  open={open || false}
                  onClose={handleClose}
            >
                  <div className="cus-popup-success">
                        <h1 className="pdb-4 nunito-regular-text-bold-sm" style={{ marginTop: 0 }}>Lưu ý! </h1>
                        <p 
                              style={{whiteSpace:'pre-line'}}
                              className="pdb-24"
                        >
                              {(title)||''} {(error)?error.response?.status:' '}
                              <br/>
                              {(error)&&message}
                        </p>
                        <Button
                              className="cus-cart-dock__button cus-popup-delete__btn"
                              style={{ width: '100%' }}
                              onClick={handleClose}
                        >
                              Đã hiểu
                        </Button>
                  </div>
            </Dialog>
      );
}

export default Error;