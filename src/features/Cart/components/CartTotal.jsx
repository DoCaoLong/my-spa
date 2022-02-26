import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTotal} from '../../../redux/CartSlice';
import {useHistory} from 'react-router-dom';
import formatNumber from '../../../commons/formatPrice';
import {Button} from '@mui/material'
// import {addService} from "../../../redux/serviceBookingListSlice";
import paymentApi from "../../../apis/paymentApi";
import {reduceCart} from "../../../utils/customFunc";
function CartTotal(props) {
      const {
            buttonTitle,
            payment,
            // setLoading,
            setPaymentId,
            url
      } = props;
      const [disableButton, setDisableButton] = useState(true);
      const history = useHistory();
      const dispatch = useDispatch();
      const carts = useSelector((state)=> state.carts);
      useEffect(()=>{
            dispatch(getTotal());
      },[carts, dispatch]);
      useEffect(()=>{
            if(carts.cartTotalAmount > 0){
                  setDisableButton(false);
            }else{
                  setDisableButton(true);
            }
      }, [carts.cartTotalAmount]);
      const gotoNextPage=()=>{
            if(url){
                  history.push(`${url}`);
            }
      }
      const cartBooking = carts.cartItems?.filter(item => item.isConfirm === true);
      // payment gaywate 
      const goPayment = () => {
            try {
                  //console.log(cartBooking);
                  sendPayment();
                  const listService = cartBooking?.filter(item => item.elementType === 'service');
                  const listCombo = cartBooking?.filter(item => item.elementType === 'combo' && item.serviceList.length > 0);
                  localStorage.setItem('booking',JSON.stringify([].concat(listService,listCombo)));
                  // localStorage.removeItem('myspa-cart');
                  // dispatch(clearAllCarts());
            } catch (err) {
                  //console.log('Thanh toan that bai !', err);
                  gotoNextPage();
            }
      }
      
      async function sendPayment() {
            //__________________________
            //======== cancel by user 
            // setDisableButton(true);
            //======== end 
            try{
                  const res = await paymentApi.getMethod();
                  const resData = await res.data.context;
                  //console.log('res',resData);
                  let tk = ((JSON.parse(sessionStorage.getItem('userToken'))).context.token)||'';
                  let bill =  {carts:reduceCart(cartBooking),method:resData,token:tk};
                  //console.log('bill',bill);
                  //__________________________

                  const payments = await paymentApi.sendPayment(bill);
                  const deepUrl =  payments.data.context.payment_gateway.extra_data.deeplinkMiniApp;
                  const paymentId =  payments.data.context.payment_gateway.id;
                  // const orderId = payments.data.context.id;
                  // localStorage.setItem('Momo_orderId',orderId);
                  // console.log('');
                  if(paymentId){
                        setPaymentId(paymentId);
                  }
                  //======== cancel by user 
                  // setLoading(true);
                  //======== end 
                  if(deepUrl){
                        (deepUrl)&& (window.location.assign(deepUrl));
                  }
            //__________________________
            } catch (err) {
                  //======== cancel by user 
                        // setLoading(false);
                  //======== end 
                  console.log('edrr',err);
                  // setCount(-1);
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
                              break;
                  }
                  history.push(`/Frontend/Momo-layout-payment/${message}`);
            }
      }
      return (
            <div>
                  <hr className="purple-line purple-line-cart" />
                  <div className="cus-cart-list__total-amount">
                        <span>Tổng tiền</span>
                        <span>
                              {formatNumber(carts.cartTotalAmount)}
                              đ</span>
                  </div>
                  <div className="cus-cart-dock">
                        <div className="cus-cart-dock__header">
                              <div className="cus-cart-dock__header-left">
                                    <span>Tổng tiền</span>
                                    <span>
                                          ({carts.cartTotalQuantity} sản phẩm)
                                          </span>
                              </div>
                              <div className="cus-cart-dock__header-right">
                                    {formatNumber(carts.cartTotalAmount)} đ
                              </div>
                        </div>
                        <Button
                              disabled={disableButton}
                              onClick={(payment)?(goPayment):(gotoNextPage)}
                              className="cus-cart-dock__button"
                        >
                              {buttonTitle}
                        </Button>
                  </div>
            </div>
      );
}

export default CartTotal;