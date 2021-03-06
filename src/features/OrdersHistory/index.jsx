import React, { useState } from 'react';
import './OrdersHistory.css';
import Header from '../Header';
//import myOrders from '../../dataOrders';
import OrderItem from './components/OrderItem'
import { useEffect } from 'react';
import orderOrgApi from '../../apis/orderOrg';
import { CircularProgress } from '@mui/material';
import PopUpLogin from '../Cart/components/PopUpLogin';
import Error from '../Error';
import PageNullResult from '../PageNotResult/index';
function OrdersHistory(props) {
      const [data, setData] = useState({
            orders: [],
            page: 1,
            totalItem: 1,
            loading: false,
            loadMore: false
      })

      const [openError, setOpenError] = useState({
            openUnAuth: false,
            openOther: false,
            error: '',
      });
      const tk = ((JSON.parse(sessionStorage.getItem('userToken')))?.context.token) || '';
      useEffect(() => {
            //setLoading(true)
            if (data.page === 1) {
                  setData({ ...data, loading: true })
            }
            async function handleGetOrders() {
                  try {
                        const res = await orderOrgApi.getOrders({ token: tk, page: data.page });
                        setData({
                              ...data,
                              orders: [...data.orders, ...res.data.context.data],
                              totalItem: res.data.context.total,
                              loading: false,
                              loadMore: false
                        })
                  } catch (err) {
                        setData({ ...data, loading: false, loadMore: false })
                        setOpenError({ openUnAuth: true, openOther: true, error: err })

                  }
            }
            handleGetOrders()
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data.page])
      const handleViewMore = () => {
            setData({
                  ...data,
                  page: data.page + 1,
                  loadMore: true
            })
      }
      return (
            <>
                  <Header
                        headerTitle='L???ch s??? ????n h??ng'
                  />
                  <div id="list__order" className="or-cnt">
                        {
                              data.loading === true ?
                                    <div className="search__loading-spinner"><CircularProgress color="primary" /></div>
                                    :
                                    <ul className="or-cnt_list">
                                          {
                                                data.orders.length === 0 ?
                                                      <PageNullResult
                                                            title='B???n kh??ng c?? ????n h??ng !'
                                                      />
                                                      :
                                                      data.orders.map((item, index) => (
                                                            <OrderItem
                                                                  item={item}
                                                                  key={index}
                                                            />
                                                      ))
                                          }
                                    </ul>
                        }
                        {
                              data.totalItem <= data.orders.length ?
                                    <></>
                                    :
                                    <div className="tab-products__btn">
                                          {
                                                data.loadMore === true ? <div className="search__loading-spinner"><CircularProgress color="primary" /></div>
                                                      :
                                                      <button
                                                            onClick={handleViewMore}
                                                      >
                                                            {
                                                                  data.orders.length === 0 ?
                                                                        'Kh??ng c?? ????n h??ng n??o'
                                                                        :
                                                                        `Xem th??m ????n h??ng`
                                                            }
                                                      </button>
                                          }
                                    </div>
                        }
                  </div>
                  {/* show err */}
                  <PopUpLogin
                        isOpen={openError.openUnAuth}
                        setIsOpen={setOpenError}
                        title="Y??u c???u truy c???p th??ng tin"
                        reason={
                              "Cho ph??p s??? d???ng th??ng tin <b>H??? t??n, S??? ??i???n tho???i, Email</b> c???a b???n ????? b???t ?????u tr???i nghi???m thi??n ???????ng l??m ?????p"
                        }
                  />
                  <Error
                        open={openError.openOther}
                        setOpen={setOpenError}
                        error={openError.error}
                  />
            </>
      );
}

export default OrdersHistory;