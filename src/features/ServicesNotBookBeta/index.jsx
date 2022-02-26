import React, { useContext, useState } from 'react';
//import services from '../../dataMyServices';
//import OrgItem from './components/OrgItem';
//import OrgSelect from './components/OrgSelect';
import PopupPayment from '../BookingStep/components/PopUpWarning';
import StepChooseBranch from './bookingStep/StepChooseBranch';
import StepChooseTime from './bookingStep/StepChooseTime';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppProvider';
import orderOrgApi from '../../apis/orderOrg';
import OrderItem from './components/OrderItem';
import {CircularProgress} from '@mui/material'

// onload event 
window.addEventListener("scroll", function () {
      const scrolled = window.scrollY;
      var cartBottom = document.querySelector(".my-ser-wrap__button");

      var windowPosition = scrolled > 30;
      if (cartBottom) {
            cartBottom.classList.toggle("my-ser-wrap__button-show", windowPosition);
            const scrollable =
                  document.documentElement.scrollHeight - window.innerHeight;
            if (Math.ceil(scrolled) >= scrollable) {
                  cartBottom.classList.remove("my-ser-wrap__button-show");
            }
      }
});
//////


function ServicesNotBookBeta(props) {
      const {
            tab
      } = props;
      const tk = ((JSON.parse(sessionStorage.getItem('userToken')))?.context.token) || '';
      const {
            openNextBranches,
            setOpenNextBranches,
            serBooking,
            orgBooking
      } = useContext(AppContext)
      const [isOpen, setIsOpen] = useState(false);
      const [nextStepTime, setNextStepTime] = useState(false);
      //const [servicesUser, setServicesUser] = useState([])
      const [data, setData] = useState({
            servicesUser: [],
            loadMore: false,
            page: 1,
            totalItem: 1
      })

      useEffect(() => {
            async function handleGetServicesUser() {
                  try {
                        const res = await orderOrgApi.getServicesUser({ token: tk, page: data.page })
                        //setServicesUser(res.data.context.data)
                        setData({
                              ...data,
                              servicesUser:[...data.servicesUser,...res.data.context.data],
                              totalItem: res.data.context.total,
                              loadMore:false
                        })
                  } catch (error) {
                        setData({...data, loadMore:false})
                        console.log(error)
                  }
            }
            handleGetServicesUser();
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data.page])

      const gotoBookingStep = () => {
            if (orgBooking?.branches.length === 0) {
                  setNextStepTime(true)
            } else {
                  setOpenNextBranches(true)
            }
      }
      const handleViewMore=()=>{
            setData({
                  ...data,
                  page: data.page + 1,
                  loadMore:true
            })
      }
      return (
            <>
                  <div
                        className="my-ser-wrap"
                        style={tab === 1 ? { display: 'block' } : { display: 'none' }}
                  >
                        {
                              data.servicesUser.map((item, index) => (
                                    <OrderItem
                                          servicesUser={data.servicesUser}
                                          key={index}
                                          orderItem={item}
                                          setIsOpen={setIsOpen}
                                    />
                              ))
                        }
                        {
                              data.totalItem <= data.servicesUser.length ?
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
                                                                  data.servicesUser.length === 0 ?
                                                                        'Không có dịch vụ nào'
                                                                        :
                                                                        `Xem thêm đơn hàng`
                                                            }
                                                      </button>
                                          }
                                    </div>
                        }
                        <div className="my-ser-wrap__button">
                              <span className="my-ser-wrap__button-head">
                                    Đã chọn <span>{serBooking.length}</span> dịch vụ
                              </span>
                              <button
                                    style={serBooking.length === 0 ? { opacity: '0.4' } : { opacity: '1' }}
                                    onClick={gotoBookingStep}
                              >
                                    Đặt hẹn ngay
                              </button>
                        </div>
                  </div>
                  {/* dialog & step */}
                  <PopupPayment
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        reason="Bạn chỉ đặt hẹn các dịch vụ cùng lúc tại một Order. Nếu bạn chọn đặt hẹn dịch vụ tại “Order 2”, các dịch vụ bạn chọn ở “Order 1” sẽ bị hủy.
                        Bạn có muốn tiếp tục?"
                  />
                  <StepChooseBranch
                        open={openNextBranches}
                        setOpen={setOpenNextBranches}
                        branches={orgBooking?.branches}
                  />
                  {/* if org null branch */}
                  <StepChooseTime
                        open={nextStepTime}
                        setOpen={setNextStepTime}
                        is_dialog={true}
                  />
            </>
      );
}

export default ServicesNotBookBeta;