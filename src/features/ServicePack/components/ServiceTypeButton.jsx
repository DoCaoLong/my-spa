import React from 'react';
import {Button} from '@mui/material';
import {useHistory} from 'react-router-dom'

function ServiceTypeButton({buttonTitle, url}) {
      const history = useHistory();
      return (
            <div className="cus-cart-dock">
                  <div className="cus-cart-dock__header">
                        <span>Tổng số lượng</span>
                        <p className="text-grey-color">{`(30 dịch vụ)`}</p>
                  </div>
                  <Button
                        onClick={() => history.push(url)}
                        className="cus-button"
                  >
                        {buttonTitle}
                  </Button>
            </div>
      );
}

export default ServiceTypeButton;