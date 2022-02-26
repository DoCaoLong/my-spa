import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './OrderDetail.css';
import img from '../../constants/imageList';
import formatNumber from '../../utils/formatPrice';
import OrderContent from './components/OrderContent';
import { Dialog, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="left" ref={ref} {...props} />;
});


function OrderDetail(props) {
      const { openDetail, setOpenDetail, detail, org } = props;
      
      const [date, setDate] = useState([])
      useEffect(() => {
            if (openDetail === true) {
                  setDate(detail.created_at.split(' '));
                  //console.log('open dialog');
                  //console.log(detail);
                  
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [openDetail])
      // get list item 
      return (
            <>
                  <Dialog
                        open={openDetail}
                        fullScreen
                        TransitionComponent={Transition}
                  >
                        <Header
                              headerTitle="Chi tiết đơn hàng"
                              setOpenForm={setOpenDetail}
                        />
                        {
                              openDetail === true ?
                                    <div className="order-de">
                                          <div className="order-de__head">
                                                <div className="order-de__head-date">
                                                      <span>Ngày Order: {date[0]}</span>
                                                      <span>Thời gian: {date[1]}</span>
                                                </div>
                                                <div className="or-cnt_list-item__head">
                                                      <img
                                                            src={org?.image_url}
                                                            onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }}
                                                            alt=""
                                                      />
                                                      <div className="or-cnt_list-item__head-cnt">
                                                            <span className="item__org-name">
                                                                  {org?.name}-{org?.id}
                                                            </span>
                                                            <p className="item__org-address">
                                                                  {org?.full_address}
                                                            </p>
                                                            <p className="item__org-count">
                                                                  {formatNumber(detail.amount)}đ
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                          <OrderContent
                                                detail={detail}
                                                org={org}
                                                openDetail={openDetail}
                                           />
                                    </div>
                                    :
                                    <></>
                        }
                  </Dialog>
            </>
      );
}

export default OrderDetail;