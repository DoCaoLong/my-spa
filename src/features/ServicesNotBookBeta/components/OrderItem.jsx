import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import organizationApi from '../../../apis/organizationApi';
import { AppContext } from '../../../context/AppProvider';
import {Checkbox} from '@mui/material';
import img from '../../../constants/imageList';

function OrderItem(props) {
      const { orderItem, setIsOpen } = props;
      const {serBooking, setSerBooking, setOrgBooking, setOrderId, orderId} = useContext(AppContext)
      const [org, setOrg] = useState();
      const tk = ((JSON.parse(sessionStorage.getItem('userToken')))?.context.token) || '';
      useEffect(() => {
            async function handleGetOrgDetail() {
                  try {
                        const res = await organizationApi.getById({
                              id: orderItem?.organization_id, token: tk, branches: true
                        })
                        setOrg(res.data.context)
                  } catch (error) {
                        console.log(error)
                  }
            }
            handleGetOrgDetail()
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      useEffect(()=>{
            if(serBooking.length === 0){
                  setOrderId()
            }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[serBooking.length])
      const firstItem = serBooking[0];
      const handleChooseService = (ser) =>{
            setOrderId(orderItem.id)
            setOrgBooking(org)
            if (firstItem && firstItem.order_id !== ser.order_id) {
                  setIsOpen(true)
                  setSerBooking([ser])
            } else {
                  setSerBooking(prev => {
                        const isChoose = serBooking.includes(ser);
                        if (isChoose) {
                              return serBooking.filter(item => item !== ser)
                        } else {
                              return [...prev, ser]
                        }
                  })
            }
      }
      const handleChooseOrg=()=>{
            setOrgBooking(org);
            setOrderId(orderItem.id)
            setSerBooking(orderItem.services)
      }
      return (
            <>
                  <h3
                        //id={org_id}
                        className="flex-row-sp my-ser__org"
                        onClick={handleChooseOrg}
                  >
                        <div
                              className="flex-row"
                        >
                              <Checkbox
                                    checked={orderItem.id === orderId}
                                    inputProps={{ 'aria-label': 'controlled' }}
                              />
                              <div>{org?.name}</div>
                        </div>
                        <span>{orderItem.created_at}</span>
                  </h3>
                  <ul>
                        {
                              orderItem?.services?.map((ser, index) => (
                                    <li
                                          key={index}
                                          onClick={() => handleChooseService(ser)}
                                    >
                                          <div className="flex-row my-ser__org-ser-item">
                                                <Checkbox
                                                      checked={serBooking.includes(ser)}
                                                      inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                                <div className="flex-row-sp item">
                                                      <img
                                                             src={org?.image_url}
                                                             onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }}
                                                             alt=""
                                                      />
                                                      <div className="item-cnt">
                                                            {/* <p className='ser-name'>{ser.serviceable.id}</p> */}
                                                            <p className="ser-org">{org?.name}</p>
                                                            <span className="flex-row ser-quantity">
                                                                  Số buổi:
                                                                  <p>{ser.quantity}</p>
                                                                  Thời gian:
                                                                  <p>{ser.duration} phút</p>
                                                            </span>
                                                            <p className="ser-price">
                                                                  {/* {formatNumber(ser.price)}đ */}
                                                            </p>
                                                      </div>
                                                </div>
                                          </div>
                                    </li>
                              ))
                        }
                  </ul>
            </>
      );
}

export default OrderItem;