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
                                                                        'Kh??ng c?? d???ch v??? n??o'
                                                                        :
                                                                        `Xem th??m ????n h??ng`
                                                            }
                                                      </button>
                                          }
                                    </div>
                        }
                        <div className="my-ser-wrap__button">
                              <span className="my-ser-wrap__button-head">
                                    ???? ch???n <span>{serBooking.length}</span> d???ch v???
                              </span>
                              <button
                                    style={serBooking.length === 0 ? { opacity: '0.4' } : { opacity: '1' }}
                                    onClick={gotoBookingStep}
                              >
                                    ?????t h???n ngay
                              </button>
                        </div>
                  </div>
                  {/* dialog & step */}
                  <PopupPayment
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        reason="B???n ch??? ?????t h???n c??c d???ch v??? c??ng l??c t???i m???t Order. N???u b???n ch???n ?????t h???n d???ch v??? t???i ???Order 2???, c??c d???ch v??? b???n ch???n ??? ???Order 1??? s??? b??? h???y.
                        B???n c?? mu???n ti???p t???c?"
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