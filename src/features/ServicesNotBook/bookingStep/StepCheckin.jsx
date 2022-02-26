import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Dialog, Slide } from '@mui/material';
import Header from '../../Header'
import { AppContext } from '../../../context/AppProvider';
import img from '../../../constants/imageList'
import { useState } from 'react';
import apointmentApi from '../../../apis/apointmentApi';
import { CircularProgress } from '@mui/material';
import PopUp from '../../BookingStep/components/PopUpSuccess';

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="left" ref={ref} {...props} />;
});

function StepCheckin(props) {
      const { openCheckin, setOpenCheckin } = props;
      const { timeBooking, brBooking, serBooking, orgBooking } = useContext(AppContext);
      const hourBooking = timeBooking?.activeTime.format('HH:mm');
      const dateBooking = timeBooking?.activeDate;
      const tk = ((JSON.parse(sessionStorage.getItem('userToken'))).context.token)||'';
      //const tk='96|6fDvnaGvBh9p7udZz2Tt1dfgwpIKLAjjh18uSuUQ'
      const [loading, setLoading] = useState(false);
      const [params, setParams] = useState({});
      const [errContent, setErrContent] = useState({
            title: '',
            reason: '',
            popUpType: true,
            inServices: false
      })
      const [popUp, setPopUp] = useState(false);
      const acc = (useSelector((state) => state.account.userInfo)) || {};
      const userInfo = acc;
      const service_ids = [];
      for (var item of serBooking) {
            const id = item.id
            service_ids.push(id);
      }
      useEffect(() => {
            if (brBooking) {
                  setParams({
                        service_ids: service_ids,
                        branch_id: brBooking?.id,
                        time_start: `${dateBooking?.format('YYYY-MM-DD')} ${hourBooking}:00`,
                        note: 'null'
                  })
            } else {
                  setParams({
                        service_ids: service_ids,
                        time_start: `${dateBooking?.format('YYYY-MM-DD')} ${hourBooking}:00`,
                        note: 'null'
                  })
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [brBooking, timeBooking])
      // handle submit services by user
      async function postServicesByUser(org_id, values) {
            setLoading(true);
            try {
                  await apointmentApi.postAppointment({org_id:org_id,values:values,token:tk})
                  //console.log(response);
                  setLoading(false);
                  setPopUp(true)
                  setErrContent({
                        title: 'Đặt hẹn thành công!',
                        reason: 'Nếu bạn muốn kiểm tra lịch hẹn đã đặt vui lòng ấn nút Xem lịch hẹn bên dưới nhé.',
                        popUpType: true,
                        inServices: true
                  })
            } catch (e) {
                  setPopUp(true);
                  setLoading(false);
                  switch (e.response?.status) {
                        case 401:
                              return setErrContent({
                                    title: 'Thông báo !',
                                    reason: 'Cho phép sử dụng thông tin \n Họ tên, Số điện thoại, Email \n của bạn để bắt đầu trải nghiệm thiên đường làm đẹp!',
                                    popUpType: false
                              })
                        default:
                              return setErrContent({
                                    title: 'Thông báo !',
                                    reason: 'Đặt hẹn thất bại vui lòng thử lại sau!',
                                    popUpType: false
                              })
                  }
            }
      }
      const handleSubmit = () => {
            if (!timeBooking || !serBooking || !orgBooking) {
                  //console.log('error')
            } else {
                  postServicesByUser(orgBooking.id, params)
            }
      }
      return (
            <>
                  <Dialog
                        fullScreen
                        open={openCheckin}
                        TransitionComponent={Transition}
                  >
                        <Header
                              headerTitle="Xác nhận thông tin đặt hẹn"
                              setOpenForm={setOpenCheckin}
                        />
                        <div style={{ height: '100%' }} className="page-confirm custom-padding">
                              <div className="confirm-wraper">
                                    <div className="confirm-item">
                                          <div className="confirm-header">
                                                <span className="confirm-text nunito-text-sm text-grey-color ">
                                                      Thông tin checkin
                                                </span>
                                          </div>
                                          <div className="confirm-body nunito-regular-text-bold-sm text-black-color">
                                                <span className="text-capitalize">{userInfo?.fullname}</span>
                                                <span className="pdt-2">{userInfo?.telephone}</span>
                                                <span className="pdt-2">{userInfo?.email}</span>
                                          </div>
                                    </div>
                                    <div className="confirm-item mt-16">
                                          <div className="confirm-header">
                                                <span className="confirm-text nunito-text-sm text-grey-color ">
                                                      Thời gian
                                                </span>
                                          </div>
                                          <div className="confirm-body nunito-regular-text-bold-sm text-black-color">
                                                <span className="text-capitalize">
                                                      {
                                                            timeBooking ?
                                                                  `${hourBooking}, Ngày ${dateBooking?.format('DD-MM-YYYY')}`
                                                                  :
                                                                  ''
                                                      }
                                                </span>
                                          </div>
                                    </div>
                                    <div className="confirm-item mt-16">
                                          <div className="confirm-header">
                                                <span className="confirm-text nunito-text-sm text-grey-color ">
                                                      {brBooking ? 'Chi nhánh' : 'Địa chỉ'}
                                                </span>
                                          </div>
                                          <div className="confirm-body  text-black-color">
                                                <div className="confirm-body-wrap">
                                                      <div className="confirm-body-content">
                                                            <span
                                                                  className="text-capitalize nunito-regular-text-bold-sm"
                                                            >
                                                                  {brBooking ? brBooking?.name : orgBooking?.name}
                                                            </span>
                                                            <span
                                                                  className="text-capitalize nunito-text-md pdt-4"
                                                            >
                                                                  {brBooking ? brBooking?.full_address : orgBooking?.full_address}
                                                            </span>
                                                      </div>
                                                      <div className="confirm-body-img">
                                                            <img className="" src={brBooking?.image_url || ''} onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }} alt="" />
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="confirm-item mt-16">
                                          <div className="confirm-header">
                                                <span className="confirm-text nunito-text-sm text-grey-color ">
                                                      Dịch vụ/Sản phẩm
                                                </span>
                                          </div>
                                          <hr className="confirm-line" />
                                          <div className="service-list nunito-regular-text-bold-sm text-black-color">
                                                {serBooking?.map((item, index) => (
                                                      <div key={index} className="service-item">
                                                            <div className="service-content">
                                                                  <div className="service-content-img">
                                                                        <img className="" src={index?.image_url || ''} onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }} alt="" />
                                                                  </div>
                                                                  <div className="flex-row-sp service-content-title">
                                                                        {item.service_name}
                                                                        {/* x{item.quantity} */}
                                                                  </div>
                                                            </div>
                                                      </div>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                              <div className="menu-bottom bg-white">
                                    <div className="flex-box-row">
                                          <div>
                                                <span className="nunito-text-md text-black-color">Tổng số lượng dịch vụ </span>
                                                <span className="nunito-text-md text-grey-color">
                                                      ( {(serBooking) && serBooking.length} dịch vụ )
                                                </span>
                                          </div>
                                    </div>
                                    <div className="flex-box-row">
                                          <div
                                                onClick={handleSubmit}
                                                className="btn-confirm-booking nunito-text-mmd bg-purple-color"
                                                style={{ margin: 'auto' }}
                                          >
                                                {loading === true ?
                                                      <div className="search__loading-spinner"><CircularProgress color="secondary" /></div>
                                                      :
                                                      'Xác nhận đặt hẹn'
                                                }
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <PopUp
                              isOpen={popUp}
                              setIsOpen={setPopUp}
                              inServices={errContent.inServices}
                              title={errContent.title}
                              reason={errContent.reason}
                              popUpType={errContent.popUpType}
                              date={dateBooking?.format('YYYY-MM-DD')}
                        />
                  </Dialog>
            </>
      );
}

export default StepCheckin;