import React, { useState } from 'react';
import Header from '../Header';
//import services from '../../dataMyServices';
//import ServicesNotBook from '../ServicesNotBook';
import ServicesBooked from '../ServicesBooked';
import ServicesNotBookBeta from '../ServicesNotBookBeta';
//import orderOrgApi from '../../apis/orderOrg';
import PopUpLogin from '../Cart/components/PopUpLogin';
import Error from '../Error';
//import { CircularProgress } from '@mui/material';
import '../../assets/style/my-services.css'

function ServicesUser() {
      const tabs = [
            { id: 1, title: 'Chưa đặt hẹn' },
            { id: 2, title: 'Đã đặt hẹn' }
      ]
      const [tab, setTab] = useState(1);
      //const [services, setServices] = useState([]);
      //const [loading, setLoading] = useState(false);

      //const [servicesUser, setServicesUser] = useState([])
      //const tk = ((JSON.parse(sessionStorage.getItem('userToken')))?.context.token) || '';
      //const tk = '413|vzYArAdwXqwUWPIdgXM0f3MeJ5DW4xBVoDASFzxh'

      // Error catch 
      const [openError, setOpenError] = useState({
            openUnAuth: false,
            openOther: false,
            error: '',
      });
      // -----------
      const handleSetTab = (id) => {
            setTab(id)
      }
      //get services user

      // async function getServicesUser() {
      //       try {
      //             const res = await orderOrgApi.getServicesUser({ token: tk });
      //             setServicesUser(res.data.context.data);
      //       } catch (error) {
      //             console.log(error)
      //       }
      // }

      // useEffect(() => {
      //       async function HandleGetServicesUser() {
      //             setLoading(true)
      //             try {
      //                   const response = await orderOrgApi.getOrderServices({ token: tk });
      //                   setServices(response?.data.context.data)
      //                   setLoading(false)
      //                   console.log(response)
      //             } catch (err) {
      //                   setLoading(false);
      //                   switch (err.response?.status) {
      //                         case 401:
      //                               return setOpenError({ ...openError, openUnAuth: true });
      //                         default:
      //                               return setOpenError({ openOther: true, error: err });
      //                   }
      //             }
      //       }
      //       HandleGetServicesUser();
      //       getServicesUser()
      // }, [])
      // //get org_id list
      //const [orgAll, setOrgAll] = useState([]);
      //
      return (
            <>
                  <div className="wraper padding-unset-bottom page-servicepack">
                        <div className="booking-cart background-white">
                              <div className="page-title bg-dark-blue-color">
                                    <Header
                                          headerTitle="Gói dịch vụ"
                                          urlPrev="/"
                                    />
                                    <div className="booking-status flex-box-row nunito-text-md">
                                          {
                                                tabs.map(item => (
                                                      <div
                                                            key={item.id}
                                                            onClick={() => handleSetTab(item.id)}
                                                            className="item tab1"
                                                            style={tab === item.id ?
                                                                  { backgroundColor: 'var(--bgWhite)', color: 'var(--purple)' }
                                                                  :
                                                                  {}
                                                            }
                                                      >
                                                            {item.title}
                                                      </div>
                                                ))
                                          }
                                    </div>
                              </div>
                              <>
                                    {/* <ServicesNotBook
                                                      tab={tab}
                                                      orgAll={orgAll}
                                                      setOrgAll={setOrgAll}
                                                      services={services}
                                                /> */}
                                    <ServicesNotBookBeta
                                          tab={tab}
                                    // orgAll={orgAll}
                                    // setOrgAll={setOrgAll}
                                    // services={services}
                                    />
                                    <ServicesBooked
                                          tab={tab}
                                    // orgAll={orgAll}
                                    // setOrgAll={setOrgAll}
                                    // services={services}
                                    />
                              </>
                        </div>
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

export default ServicesUser;