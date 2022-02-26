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
                        headerTitle='Lịch sử đơn hàng'
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
                                                            title='Bạn không có đơn hàng !'
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
                                                                        'Không có đơn hàng nào'
                                                                        :
                                                                        `Xem thêm đơn hàng`
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
                        title="Yêu cầu truy cập thông tin"
                        reason={
                              "Cho phép sử dụng thông tin <b>Họ tên, Số điện thoại, Email</b> của bạn để bắt đầu trải nghiệm thiên đường làm đẹp"
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