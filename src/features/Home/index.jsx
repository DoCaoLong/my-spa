import React, { useEffect, useState, useContext } from "react";
import Head from "../../component/HeadTag/default";
import HomeBot from "./components/HomeBot";
import HomeTop from "./components/HomeTop";
//import HomeOrgFavorite from './components/HomeOrgFavorite'
// import HomeSale from "./components/HomeSale";
import Footer from "../../component/ViewCommon/FooterWrap";
import { Home } from "../../component/Constant/MetaConst";
// import organizationApi from "../../apis/organizationApi";
//import PopUpRequestLocation from "./components/PopUpRequestLocation";
// import PopUpLogin from "./components/PopUpLogin";
import { motion } from 'framer-motion';
import framerConfig from '../../utils/framerConfig';
import "../../assets/style/userguide.css";
import { AppContext } from '../../context/AppProvider'
import Error from '../Error';


function HomeIndex(props) {
  const userToken = sessionStorage.getItem("userToken");
  // const [organization, setOrganization] = useState();
  const { setChooseCateSer, setOrgBooking, setSerBooking, setBrBooking } = useContext(AppContext)
  //---------------------
  //let isLocate=false
  // if (!locationAccept) {
  //   isLocate = true;
  // }
  if (!userToken) {
    // isUser = true;
  }
  //const [popUp, setPopUp] = useState(isLocate);
  // const [popUpLogin, setPopUpLogin] = useState(isUser);
  const [openError, setOpenError] = useState({
    openOther: false,
    error: '',
  });

  const locate = JSON.parse(sessionStorage.getItem('locationAccept'));
  const [userLocation, setUserLocation] = useState(locate);
  useEffect(() => {
    if (!locate) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude
        })
      })
    }
  }, [locate])
  sessionStorage.setItem("locationAccept", JSON.stringify(userLocation));

  useEffect(() => {
    setChooseCateSer();
    setOrgBooking()
    setSerBooking([]);
    setBrBooking()
    // if(!userToken){
    //   // setPopUpLogin(true);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken])
  //alert(locationAccept)
  return (
    <motion.div
      className="wrapper"
      style={{ backgroundColor: "#eeedf2" }}
      variants={framerConfig}
      initial='hidden'
      animate='show'
      exit={{
        opacity: 0, transition: { delay: 10.9 }
      }}
    >
      <Head Title={Home.title} Description={Home.description}></Head>
      <HomeTop />
      {/* <HomeSale /> */}
      {/* <HomeOrgFavorite/> */}
      <HomeBot />
      <Footer ActiveIcon="homeIconActive" />
      {/* <PopUpRequestLocation
        isOpen={popUp}
        setIsOpen={setPopUp}
        title="Yêu cầu truy cập vị trí!"
        reason="Cho phép Myspa truy cập vị trí hiện tại của bạn để có trải nghiệm tốt hơn"
      /> */}
      {/* <PopUpLogin
        isOpen={popUpLogin}
        setIsOpen={setPopUpLogin}
        title="Yêu cầu truy cập thông tin"
        reason={
          "Cho phép sử dụng thông tin <b>Họ tên, Số điện thoại, Email</b> của bạn để bắt đầu trải nghiệm thiên đường làm đẹp"
        }
      /> */}
      <Error
        open={openError.openOther}
        setOpen={setOpenError}
        error={openError.error}
      />
    </motion.div>
  );
}

export default HomeIndex;
