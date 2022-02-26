import React, { useState } from 'react';
import {addCart} from '../../../redux/CartSlice';
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router';
import formatCartId from '../../../utils/formatCartItemId';

function DetailBot(props) {
      const { detail, org, sale_price, setPopup, setNewItemCart,imageDefault } = props;
      const dispatch = useDispatch();
      const history = useHistory();
      const [quantity, setQuantity] = useState(1);
      const desc = () => {
            if (quantity > 1) {
                  setQuantity(quantity - 1)
            }
      }
      const asc = () => {
            setQuantity(quantity + 1)
      }
      const cartItemID = formatCartId(org.id, 3, detail.id)
      const comboValue = {
            id: detail.id,
            categoryId: parseInt(`${1}${org.id}`),
            locationId: parseInt(org.id),
            org_name:org.name,
            cartItemID: cartItemID,
            serviceName: detail.name,
            image: detail.image,
            image_url: (detail.image)?detail.image_url:imageDefault,
            price: sale_price,
            elementType: 'combo',
            quantity: quantity,
            isConfirm: true,
            isBooking: false,
            isProduct: 0,
            serviceList: detail.services,
            branchList: org.branches
      }
      const handleAddCart = () => {
            const action = addCart(comboValue);
            const storageCart = JSON.parse(localStorage.getItem('myspa-cart'));
            if (storageCart && storageCart.length > 0) {
                  if (storageCart.findIndex((item) => item.locationId === comboValue.locationId) === 0) {
                        dispatch(action);
                        history.push(`/Frontend/Momo-layout-cart/${org.id}`)
                  }
                  else {
                        setPopup(true);
                        setNewItemCart(comboValue)
                  }
            }
            else {
                  dispatch(action);
                  history.push(`/Frontend/Momo-layout-cart/${org.id}`)
            }
      }
      return (
            <div className="de-bot">
                  <div className="de-bot__quantity">
                        <span>Số lượng</span>
                        <div className="de-bot__quantity-btn">
                              <button
                              onClick={desc}
                              >-</button>
                              <div>{quantity}</div>
                              <button
                              onClick={asc}
                              >+</button>
                        </div>
                  </div>
                  <button
                        onClick={handleAddCart}
                        className="de-bot__add"
                  >
                        Thêm vào giỏ hàng
                  </button>
            </div>
      );
}

export default DetailBot;