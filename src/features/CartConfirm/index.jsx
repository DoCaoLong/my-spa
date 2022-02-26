import React, {useState, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams } from 'react-router-dom';
import img from '../../constants/imageList';
import formatNumber from '../../commons/formatPrice';
import CartTotal from '../Cart/components/CartTotal';
import Header from "../Header/index";
import Head from '../../component/HeadTag/default';
import Loading from "../../utils/loadingOptions";
import {View_cart_confirm} from '../../component/Constant/MetaConst';
import {Button} from '@mui/material'
import scrollTop from '../../utils/scrollTop';
import paymentApi from "../../apis/paymentApi";
import * as Sentry from "@sentry/react";
import {clearAllCarts} from '../../redux/CartSlice';
import {
      CANCELED_BY_USER, 
      CANCELED,
      PAID,
      PENDING
}
from '../../constants/statusMessage';
const timerRender = [0]
function CartConfirm(props) {
      const history = useHistory();
      const dispatch = useDispatch();
      const {focusEvent} = useParams();      
      const buttonTitle = "Xác nhận thanh toán";
      const url="/Frontend/Momo-layout-payment";
      const headerTitle="Thanh toán";
      const carts = useSelector((state) => state.carts);
      const cartListPayment = carts.cartItems.filter(item => item.isConfirm === true);
      const [loading,setLoading] = useState(false);
     
      const [paymentId, setPaymentId] = useState();
      const [btn,disableBtn] = useState(false);
      // const [focus, setFocus] = useState(focusEvent);
      const tk = ((JSON.parse(sessionStorage.getItem('userToken'))).context.token)||'';

      
      const scope = new Sentry.Scope();
      const intervalRef = useRef(null)
      async function getStatus(bool){
            let message;
            try{
            const paymentStatus = await paymentApi.getStatus({paymentId:paymentId,cancel:(bool)||false,token:tk});
            // await //console.log('payment status',paymentStatus);
            const status = await paymentStatus.data.context.status;
            
            

            switch(status){
                  case CANCELED_BY_USER:
                  // //console.log('status',status);
                  setLoading(false);
                  message = 'đã huỷ';
                  localStorage.removeItem('myspa-cart');
                  dispatch(clearAllCarts());
                  history.push(`/Frontend/Momo-layout-payment/${message}`);
                  scrollTop();
                  break;
                  case CANCELED:
                  // //console.log('status',status);
                  message = 'thanh toán thất bại';
                 
                  history.push(`/Frontend/Momo-layout-payment/${message}`);
                  //
                  scrollTop();
                  break;
                  case PAID:
                  // //console.log('status',status);
                  setLoading(false);
                 
                  message = 'thành công';
                  history.push(`/Frontend/Momo-layout-payment/${message}`);
                  scrollTop();
                  break;
                  case PENDING:
                  // //console.log('status',count);
                  if(timerRender[0] < 1) {
                        setLoading(false);
                        message = 'thanh toán thất bại! lỗi hệ thống';
                        history.push(`/Frontend/Momo-layout-payment/${message}`);
                  }
                  break;
                  default:
                  break;
            }
            //__________________________
            } catch (err) {
                  setLoading(false);
                  //console.log('edrr',err);
                  scope.addBreadcrumb({
                        category: "payment",
                        message: "Payment failed err response " + JSON.stringify(err),
                        level: Sentry.Severity.Info,
                  });
                  let message = 'thanh toán thất bại!';
                  switch (err.response?.status) {
                        case 404:
                              message = 'Không tìm thấy trang';
                              break;
                        case 500:
                              message = 'Lỗi Server !\n Vui lòng thử lại sau.';
                              break;
                        default:
                              message = 'thanh toán thất bại! Lỗi đường truyền mạng!';
                              
                              Sentry.captureException(new Error("something went wrong"), () => scope);
                              break;
                  }
                  history.push(`/Frontend/Momo-layout-payment/${message}`);
            }
      }
      //======== cancel by user 
      function handleCancel() {
            getStatus(true);
            disableBtn(true);
            clearInterval(intervalRef.current);
      }
      // const setInter = () => {
      //       timerRender[0] = 150
      //       intervalRef.current = setInterval(()=>{
      //             console.log(timerRender[0]);
      //             if(timerRender[0] > 0) {
      //                   timerRender[0] -= 1
      //             // (status === true)?getStatus(true):getStatus()
      //             getStatus()
      //             }
      //             else {
      //             return  clearInterval(intervalRef.current)}
      //       },4000)
      // }
      //======== end 
      // useEffect(()=>{
      //       if(paymentId) {
      //             setInter()
      //       }
      // // eslint-disable-next-line react-hooks/exhaustive-deps
      // },[paymentId])
      // useEffect(()=>{
      //       if(focus==='focus'){
      //             paymentApi.getStatus({paymentId:paymentId,cancel:true,token:tk});
      //             setLoading(false);
      //             setFocus('')
      //       }
      // // eslint-disable-next-line react-hooks/exhaustive-deps
      // },[])
      return (
            <>
            {loading ? (
                  <>
                  <Loading/>
                  <Button
                        onClick={handleCancel}
                        disabled={btn}
                        className="cus-cart-dock__button cus-cancel_button "
                  >
                        Huỷ
                  </Button>
                  </>
              ) : ( 
            <div>
                  <Head 
                        Title={View_cart_confirm.title}
                        Description={View_cart_confirm.description}
                  />
                  {(focusEvent==='focus')
                        ? 
                        <Header
                              headerTitle={headerTitle}
                              urlPrev='/Frontend/'
                        />
                        :
                        <Header
                              headerTitle={headerTitle}
                        />
                  }
                  <div className="cus-cart-list">
                        <div className="cus-cart-header__service">
                              <span className="cus-cart-header__service-left">Dịch vụ/Sản phẩm</span>
                              <span className="cus-cart-header__service-right">Thành tiền</span>
                        </div>
                        <hr className="grey-line cart-line" />
                        {
                              cartListPayment?.map(item => (
                                    <div key={item.cartItemID}>
                                          <div className="cus-cart-list__item">
                                                <div className="cus-cart-list__item-img">
                                                      <img  src={item?.image_url} onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}}  alt="" />
                                                </div>
                                                <div className="cus-cart-list__item-name">
                                                      {item?.serviceName}
                                                </div>
                                                <div className="cus-cart-list__item-price cus-item-quantity">
                                                      <span>{formatNumber(item?.price)} đ</span>
                                                      <p>x{item?.quantity}</p>
                                                </div>
                                          </div>
                                          <hr className="grey-line cart-line" />
                                    </div>
                              ))
                        }
                        <CartTotal
                              buttonTitle={buttonTitle}
                              setPaymentId={setPaymentId}
                              url={url}
                              setLoading={setLoading}
                              payment={true}
                              cartListPayment={cartListPayment}
                        />
                  </div>
            </div>
            )}
            </>
      );
}

export default CartConfirm;