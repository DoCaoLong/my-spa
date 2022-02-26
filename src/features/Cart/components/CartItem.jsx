import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {checkConfirmCart, descCart, removeCartItem, ascCart} from '../../../redux/CartSlice'
import {Checkbox} from '@mui/material';
import formatNumber from '../../../commons/formatPrice';
import PopupDeleteItem from './PopupDeleteItem';
import img from "../../../constants/imageList";

function CartItem(props) {
      const [dialogAll, setDialogAll] = useState(false);
      const dispatch = useDispatch()
      const {cartItem} = props;
      const [isCheck, setIsCheck]=useState(cartItem.isConfirm);
      const isConfirm = isCheck;
      const handleCheckBox=(e)=>{
            setIsCheck(e.target.checked);
            const action = checkConfirmCart({...cartItem, isConfirm});
            dispatch(action)
      }
      const handleAscCartItem=(serviceValue)=>{
            const action = ascCart(serviceValue);
            dispatch(action)
      }
      const handleDescCart=(serviceValue)=>{
            if (serviceValue.quantity === 1) {
                  setDialogAll(true);
            } else {
                  const action = descCart(serviceValue);
                  dispatch(action);
            }
      }
      const handleDeleteItem=(cartItem)=>{
            const action = removeCartItem(cartItem);
            dispatch(action)
      }
      return (
            <div>
                  <div className="cus-cart-list__item">
                        <Checkbox
                              className="cus-checkbox__cart"
                              size="small"
                              checked={isCheck}
                              onChange={handleCheckBox}
                        />
                        <div className="cus-cart-list__item-img">
                              <img src={cartItem.image_url||''}  alt="" onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}}  />
                        </div>
                        <div className="cus-cart-list__item-name">
                              {cartItem.serviceName}
                        </div>
                        <div className="cus-cart-list__item-price">
                              <span>{formatNumber(cartItem.quantity * cartItem.price)} đ</span>
                              <div className="cus-cart-list__item-control">
                                    <button
                                          onClick={() => handleDescCart(cartItem)}
                                    >
                                          -
                                    </button>
                                    <h5>{cartItem.quantity}</h5>
                                    <button
                                          onClick={() => handleAscCartItem(cartItem)}
                                    >
                                          +
                                    </button>
                              </div>
                        </div>
                  </div>
                  <hr className="grey-line cart-line" />
                  <PopupDeleteItem
                        dialogAll={dialogAll}
                        setDialogAll={setDialogAll}
                        cartItem={cartItem}
                        handleDelete={handleDeleteItem}
                  />
            </div>
      );
}

export default CartItem;