import React, { useEffect, useState } from 'react';
import img from '../../../../constants/imageList';
import formatNumber from '../../../../utils/formatPrice';
import { useDispatch } from 'react-redux';
import { addCart } from '../../../../redux/CartSlice';
import { useHistory } from 'react-router-dom';
import slugify from '../../../../utils/formatUrlString';
import formatCartId from '../../../../utils/formatCartItemId';
import { useSelector } from 'react-redux'

function ComboItem(props) {
      const { combo, org, branchList, setIsOpen, setNewItemCart, imageDefault } = props;
      const history = useHistory();
      const dispatch = useDispatch();
      const [old_price, setOld_price] = useState(0);
      const [sale_price, setSale_price] = useState(0);
      // handle price from data
      useEffect(() => {
            if(combo.discount === 0 ){
                  setSale_price(combo.use_value);
            }
            else{
                  setOld_price(combo.use_value)
                  setSale_price(combo.price)
            }
            
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [combo.use_value, combo.price])
      const carts = useSelector((state) => state.carts);
      const cartsList = carts.cartItems
      const cartItemID = formatCartId(org.id, 3, combo.id)
      const itemInCart = cartsList.find(item => item.cartItemID === cartItemID)

      const discount = Math.round(sale_price / old_price * 100);
      //handle add cart
      const quantity = 1;
      const comboValue = {
            id: combo.id,
            categoryId: parseInt(`${1}${org.id}`),
            locationId: parseInt(org.id),
            org_name:org.name,
            cartItemID: cartItemID,
            image: combo.image,
            image_url: (combo.image)?combo.image_url:imageDefault,
            serviceName: combo.name,
            price: sale_price,
            quantity: quantity,
            isConfirm: true,
            isBooking: false,
            elementType: 'combo',
            serviceList: combo?.services,
            branchList: branchList
      }
      const handleAddCart = () => {
            const action = addCart(comboValue);
            const cartBottom = document.querySelector(".menu-bottom");
            cartBottom.classList.remove("menu-bottom-hide");
            const storageCart = JSON.parse(localStorage.getItem('myspa-cart'));
            if (storageCart && storageCart.length > 0) {
                  if (storageCart.findIndex((item) => item.locationId === comboValue.locationId) === 0) {
                        dispatch(action);
                  }
                  else {
                        setIsOpen(true);
                        setNewItemCart(comboValue)
                  }
            }
            else {
                  dispatch(action);
            }
      }
      const gotoPageDetail = () => {
            history.push({
                  pathname: `/Frontend/Combo-detail/${slugify(combo.name)}`,
                  search: `${combo.id},${org.id}`,
                  state: {
                        org: org,
                        combo: combo
                  }
            })
      }
      return (
            <li>
                  <div className="cb-cnt__item">
                        <img src={(combo.image)?combo.image_url:imageDefault} onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }} alt="" className="cb-cnt__item-img" />
                        <div className="cb-cnt__item-detail">
                              <span className="cb-cnt__item-detail_name">
                                    {combo.name}
                              </span>
                              <span
                                    style={combo.discount === 0 ? { display: 'none' } : {}}
                                    className="cb-cnt__item-detail_price-old"
                              >
                                    {formatNumber(old_price)}đ
                              </span>
                              <div className="cb-cnt__item-detail_bot">
                                    <div className="price">
                                          <span
                                                style={combo.discount === 0 ? { display: 'none' } : {}}
                                                className="discount"
                                          >
                                                giảm {100 - discount} %
                                          </span>
                                          <span
                                                style={
                                                      combo.discount === 0 ? 
                                                      { marginLeft: '0px', color: 'var(--purple)' }
                                                      : {}
                                                }
                                                className="price-sale"
                                          >
                                                {formatNumber(sale_price)}đ
                                          </span>
                                    </div>
                                    <button
                                          onClick={handleAddCart}
                                          className="cus-btn-add-cart"
                                    >
                                          {
                                                itemInCart ?
                                                      <div
                                                            className="cus-btn-add-cart__count"
                                                      >
                                                            {itemInCart?.quantity}
                                                      </div>
                                                      :
                                                      <></>
                                          }
                                          <img src={img.Cart} alt="" />
                                    </button>
                              </div>
                              <div
                                    onClick={gotoPageDetail}
                                    className="cb-cnt__item-detail_view"
                              >
                                    Xem chi tiết Combo
                              </div>
                        </div>
                  </div>
            </li>
      );
}

export default ComboItem;