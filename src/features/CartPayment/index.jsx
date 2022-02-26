import React,{ useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTotal, clearAllCarts} from '../../redux/CartSlice';
import img from '../../constants/imageList';
import {Button} from '@mui/material';
import {useParams,useHistory} from 'react-router-dom';
import PopupPayment from './components/PopupPayment';

function CartPayment(props) {
      const {message} = useParams();
      const history = useHistory();
      const dispatch = useDispatch();
      const [isOpen, setIsOpen] = useState(false);
      const carts = useSelector((state)=> state.carts);
      useEffect(()=>{
            dispatch(getTotal());
      },[carts, dispatch])
      
      
    
      const listService = JSON.parse(localStorage.getItem('booking'))||[];
      console.log('list service', listService.length);
      useEffect(()=>{
            // alert(message);
            if(message === 'success') {
                  (listService && listService.length !== 0) && setIsOpen(true);
                  localStorage.removeItem('myspa-cart');
                  dispatch(clearAllCarts())
            }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[message])
      return (
            <>
            <div className="cus-payment">
                  <div className="cus-payment__container">
                        <img src={img.imgPayment2} alt="" />
                        <span>
                              Thanh toán {(message === 'success') ? 'thành công': message}
                              {/* order. */}
                        </span>
                        <h1>
                              {
                              // sessionStorage.getItem('userToken')||'oke'
                              }
                              {/* {formatNumber(carts.cartTotalAmount)} đ */}
                        </h1>
                        <Button
                              // onClick={()=>window.location.assign('/Frontend/')}
                              onClick={()=>history.push('/')}
                              className="cus-cart-dock__button btn-momo-payment"
                        >
                              Về trang chủ
                        </Button>
                  </div>
                  <PopupPayment
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                  />
            </div>
            </>
      );
}
export default CartPayment;