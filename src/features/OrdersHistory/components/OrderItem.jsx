import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import img from '../../../constants/imageList';
import formatNumber from '../../../utils/formatPrice';
import organizationApi from '../../../apis/organizationApi';
import {card_loading} from '../../Loading/CartItem';
import OrderDetail from '../../OrderDetail/index';
import Error from '../../Error';

import {
      CANCELED_BY_USER, 
      CANCELED,
      PAID,
      PENDING
}
from '../../../constants/statusMessage';
function OrderItem(props) {
      const { item } = props;
      const [loadingItem, setLoadingItem] = useState(false);
      const [openDetail, setOpenDetail] = useState(false);
      const status = item.status;
      const tk = ((sessionStorage.getItem('userToken'))?JSON.parse(sessionStorage.getItem('userToken')).context.token:'');
      const [openError, setOpenError] = useState({
            openOther: false,
            error:'',
      });
      const [org, setOrg] = useState()
      const ordersStatus = (status) => {
            switch (status) {
                  case CANCELED:
                        return <span className="or-cnt_list-item__status">Đã hủy</span>;
                  case CANCELED_BY_USER:
                        return <span className="or-cnt_list-item__status">Đã hủy</span>;
                  case PENDING:
                        return <span style={{ backgroundColor: '#F9D646' }} className="or-cnt_list-item__status">Đang xử lý...</span>;
                  case PAID:
                        return <span style={{ backgroundColor: '#28DE7E' }} className="or-cnt_list-item__status">Hoàn thành</span>;
                  default:
                        break;
            }
      }
      useEffect(() => {
            setLoadingItem(true)
            async function handleGetOrg() {
                  try {
                        const res = await organizationApi.getById({id:item.organization_id, token: tk})
                        setOrg(res.data.context)
                        setLoadingItem(false)
                  } catch (err) {
                        //console.log(err);
                        setLoadingItem(false)
                        setOpenError({ openOther:true, error: err })
                  }
            }
            handleGetOrg()
      }, [item.organization_id, tk])
      const count = item?.items_product?.length + item?.items_service?.length + item?.items_treatment_combo?.length
      return (
            loadingItem === true ?
                  card_loading()
                  :
                  <>
                        <li>
                              <div className="or-cnt_list-item">
                                    {ordersStatus(status)}
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
                                                      {formatNumber(item?.amount)}đ ({count} items)
                                                </p>
                                          </div>
                                    </div>
                                    <div className="or-cnt_list-item__bottom">
                                          <span>
                                                Ngày: {item?.created_at}
                                          </span>
                                          <span
                                                onClick={()=>setOpenDetail(true)}
                                          >
                                                Xem chi tiết
                                                <img color='var(--purple)' src={img.arrow_right_purple} alt="" />
                                          </span>
                                    </div>
                              </div>
                        </li>
                        <Error
                              open={openError.openOther}
                              setOpen={setOpenError}
                              error={openError.error}
                        />
                        <OrderDetail
                              openDetail={openDetail}
                              setOpenDetail={setOpenDetail}
                              detail={item}
                              org={org}
                        />
                  </>
      );
}

export default OrderItem;