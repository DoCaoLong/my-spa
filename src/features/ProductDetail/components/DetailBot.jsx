import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../../../redux/CartSlice';
import {useHistory} from 'react-router-dom';
import formatCartId from '../../../utils/formatCartItemId';

function DetailBot(props) {
      const { detail, org, setPopUp, setNewItemCart, imageDefault } = props;
      const history = useHistory();
      const dispatch = useDispatch();
      const [quantity, setQuantity] = useState(1);
      const cartItemID = formatCartId(org.id, 1, detail.id)
      const desc = () => {
            if (quantity > 1) {
                  setQuantity(quantity - 1)
            }
      }
      const asc = () => {
            setQuantity(quantity + 1)
      }
      const productValues = {
            cartItemID: cartItemID,
            categoryId: detail.product_category_id,
            id: detail.id,
            elementType: 'product',
            image: detail.image,
            image_url: (detail.image)?detail.image_url:imageDefault,
            isBooking: false,
            isConfirm: true,
            isProduct: true,
            org_name: org.name,
            locationId: parseInt(org.id),
            price: detail.special_price < 0 ? detail.retail_price : detail.special_price,
            quantity: quantity,
            serviceName: detail.product_name
      }
      const handleAddCart = () => {
            // //console.log(productValues)
            const action = addCart(productValues);
            // setPopUp(true)
            const storageCart = JSON.parse(localStorage.getItem('myspa-cart'));
            if (storageCart && storageCart.length !== 0) {
                  // eslint-disable-next-line eqeqeq
                  if (storageCart.findIndex((item) => item.locationId == productValues.locationId) === 0) {
                        dispatch(action);
                        history.push(`/Frontend/Momo-layout-cart/${org.id}`)
                  }
                  else {
                        setPopUp(true);
                        setNewItemCart(productValues)
                  }
            }
            else {
                  ////console.log('else');
                  dispatch(action);
                  history.push(`/Frontend/Momo-layout-cart/${org.id}`)
            }
      }
      return (
            <div className="de-bot">
                  <div className="de-bot__quantity">
                        <span>Số lượng</span>
                        <div className="de-bot__quantity-btn">
                              <button onClick={desc} >-</button>
                              <div>{quantity}</div>
                              <button onClick={asc} >+</button>
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