import React, {useEffect,useState} from "react";
import { useDispatch, } from "react-redux";
import { login } from "../redux/accountSlice";
import Account from "../features/Account/index";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import PageResultDetail from "../features/PageResult/index";
import ServicePack from "../features/ServicePack/index";
import SearchResult from "../features/SearchResult/index";
import Cart from "../features/Cart/index";
import Map from "../features/Map/index";
import CartConfirm from "../features/CartConfirm/index";
import CartPayment from "../features/CartPayment/index";
import HomeIndex from "../features/Home/index";
import PageFilterHome from '../features/PageFilterHome/index';
import PageViewMore_demo from "../features/PageViewMore/index_11";
import PageViewMore from "../features/PageViewMore";
import Calendar from "../features/Calendar";
import BookingStep1 from "../features/BookingStep/FirstStep";
import BookingStep2 from "../features/BookingStep/SecondStep";
import BookingStep3 from "../features/BookingStep/ThirdStep";
import BookingStep4 from "../features/BookingStep/FouthStep";
import BookingConfirmStep from "../features/BookingStep/ConfirmStep";
import PageViewBranch from '../features/PageViewBranch/index';
import accountApi from "../apis/accountApi";
import Endow from '../features/EndowDetail/index';
import EndowViewMore from '../features/EndowDetail/viewMore';
import ProductDetail from '../features/ProductDetail/index';
import ServiceDetail from '../features/ServiceDetail/index';
import ComboDetail from '../features/ComboDetail/index';
import OrdersHistory from '../features/OrdersHistory/index';
import OrderDetail from '../features/OrderDetail/index';
import ServicesUser from '../features/ServicesUser/index';
import User_guide from '../features/Userguide';

import AppointmentDeQr from '../features/AppointmentDetail/AppointmentDeQr';
import Error from '../features/Error';

function RouterConfig(props) {
  const dispatch = useDispatch();
  const urlSearchParams = new URLSearchParams(window.location.search);
   // Error catch 
  const [openError, setOpenError] = useState({
    openOther: false,
    error:'',
  });
  // -----------
  const params = Object.fromEntries(urlSearchParams.entries());
  async function handleLogin(props) {
    try {
      //console.log('props',props);
      //__________________________
      const res = await accountApi.loginUser(props);
      res.data.context.email = props.email; 
      res.data.context.name = props.name;
      res.data.context.fullname = props.name;
      res.data.context.phone = props.phone;
      sessionStorage.setItem("userToken", JSON.stringify(res.data));
      sessionStorage.setItem('momo-token', res.data.context.token)
      dispatch(login(res.data));
      //console.log('id',params.requestId);
      // if(params.requestId){
      //   // alert('mes');
      //   window.location.assign('/Frontend/Momo-layout-payment/thành%20công');
      // }
      // window.location.assign('/Frontend/Momo-layout-payment/momo');
      //__________________________
    } catch (errs) {
      //console.log(errs);
      setOpenError({ openOther:true, error: errs })
      sessionStorage.setItem("userToken", JSON.stringify(errs));
      
      window.location.assign('/Frontend/');
    }
  }
  // const handleMessage = (e) => {
  //   alert(JSON.stringify(e));
  // }
  useEffect(()=>{
    if (params.momo && params.telephone) {
      handleLogin(params);
    }
    // document.addEventListener('message', (e)=>handleMessage(e));
    // return () => {
    //   window.removeEventListener('message', handleMessage());
    // }
  })

 


  const routers = [
    {
      path: "/Frontend/Home",
      component: HomeIndex,
    },
    {
      path: '/Frontend/Filter-result/',
      component: PageFilterHome
    },
    {
      path: "/Frontend/Account-detail",
      component: Account,
    },
    {
      path: "/Frontend/page-View-more/:code",
      component: PageViewMore_demo,
    },
    {
      path: "/Frontend/View-more/:code",
      component: PageViewMore,
    },
    {
      path: "/Frontend/View-more-branch/:id",
      component: PageViewBranch
    },
    {
      path: "/Frontend/Momo-layout-detail/:id",
      component: PageResultDetail,
    },
    {
      path: "/Frontend/Service-pack",
      component: ServicePack,
    },
    {
      path:'/Frontend/My-services',
      component: ServicesUser
    },
    {
      path: "/Frontend/Search-result/:searchText",
      component: SearchResult,
    },
    {
      path: "/Frontend/Momo-layout-cart/:id",
      component: Cart,
    },
    {
      path: "/Frontend/Momo-layout-confirm-payment/:focusEvent",
      component: CartConfirm,
    },
    {
      path: "/Frontend/Momo-layout-payment/:message",
      component: CartPayment,
    },
    {
      path: "/Frontend/Map",
      component: Map
    },
    {
      path: "/Frontend/Calendar",
      component: Calendar,
    },
    {
      path: "/Frontend/Momo-booking-step-1",
      component: BookingStep1,
    },
    {
      path: "/Frontend/Momo-booking-step-2",
      component: BookingStep2,
    },
    {
      path: "/Frontend/Momo-booking-step-3",
      component: BookingStep3,
    },
    {
      path: "/Frontend/Momo-booking-step-4",
      component: BookingStep4,
    },
    {
      path: "/Frontend/Momo-booking-step-5",
      component: BookingConfirmStep,
    },
    {
      path: '/Frontend/Endow-detail/',
      component: Endow
    },
    {
      path: '/Frontend/ViewMore/:orgId',
      component: EndowViewMore
    },
    {
      path: '/Frontend/Detail/',
      component: ProductDetail
    },
    {
      path: '/Frontend/Service-detail/',
      component: ServiceDetail
    },
    {
      path: '/Frontend/Combo-detail/',
      component: ComboDetail
    },
    {
      path: '/My-orders',
      component: OrdersHistory
    },
    {
      path: '/Order-detail',
      component: OrderDetail
    },
    {
      path:'/qr',
      component: AppointmentDeQr
    },
    {
      path: '/Frontend/User-guide',
      component: User_guide
    },
    //---------------------
    {
      path: "/",
      component: HomeIndex,
    },

  ];
  return (
    <>
    <BrowserRouter>
        <Switch>
          {/* <Redirect exact from="/?partnerCode"path="/Frontend/Momo-layout-payment/:message"/> */}
          <Redirect exact from="/" to="/Frontend/Home" />
          {routers.map((item, index) => (
            <Route key={index} path={`${item.path}`} component={item.component} />
          ))}
        </Switch>
      </BrowserRouter>
      <Error
            open={openError.openOther}
            setOpen={setOpenError}
            error={openError.error}
      />
    </>
  );
}
export default RouterConfig;
