import React from 'react';
import { Dialog, Slide, Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { clearByCheck } from '../../../../redux/CartSlice';
import Header from '../../../Header';
import img from '../../../../constants/imageList';
import formatNumber from '../../../../commons/formatPrice';


const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="left" ref={ref} {...props} />;
});

function RemoveSelect(props) {
      const { open, setOpen } = props;
      const dispatch = useDispatch();
      const carts = useSelector((state) => state.carts);
      const cartList = carts.cartItems
      const [listSelect, setListSelect] = useState([])
      const onSelectItem = (itemCart) => {
            const isChoose = listSelect.includes(itemCart);
            setListSelect(prev => {
                  if (isChoose) {
                        return listSelect.filter(item => item !== itemCart)
                  } else {
                        return [...prev, itemCart]
                  }
            })
      }
      //console.log(listSelect)
      const intersection = cartList.filter(x => !listSelect.includes(x));
      //console.log(intersection)


      console.log(intersection)

      const removeSelectClick = () => {
            if (listSelect.length > 0) {
                  dispatch(clearByCheck(intersection))
                  setOpen(false)
            }
      }

      return (
            <Dialog
                  open={open}
                  fullScreen
                  TransitionComponent={Transition}
            >
                  <Header
                        headerTitle='Xóa sản phẩm / dịch vụ'
                        setOpenForm={setOpen}
                  />
                  <div className="cart-delete">
                        <div className="cart-delete__title">
                              Chọn Sảm phẩm/ dịch vụ muốn xóa
                        </div>
                        <ul>
                              {
                                    cartList.map((item, index) => (
                                          <div
                                                key={index}
                                                onClick={() => onSelectItem(item)}
                                          >
                                                <div className="cus-cart-list__item">
                                                      <Checkbox
                                                            className="cus-checkbox__cart"
                                                            size="small"
                                                            checked={listSelect.includes(item)}
                                                      />
                                                      <div className="cus-cart-list__item-img">
                                                            <img src={item.image_url || ''} alt="" onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }} />
                                                      </div>
                                                      <div className="cus-cart-list__item-name">
                                                            {item.serviceName}
                                                      </div>
                                                      <div className="cus-cart-list__item-price">
                                                            <span>{formatNumber(item.quantity * item.price)} đ</span>
                                                      </div>
                                                </div>
                                                <hr className="grey-line cart-line" />
                                          </div>
                                    ))
                              }
                        </ul>
                  </div>
                  <div className="cus-cart-dock cart-delete__dock">
                        <button
                              style={listSelect.length > 0 ? { opacity: 1 } : { opacity: 0.4 }}
                              className='cart-delete__btn'
                              onClick={removeSelectClick}
                        >
                              Xóa ({listSelect.length}) items  đã chọn
                        </button>
                  </div>
            </Dialog>
      );
}

export default RemoveSelect;