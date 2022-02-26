import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../../../redux/CartSlice';
import { useHistory } from 'react-router-dom';
import formatCartId from '../../../utils/formatCartItemId';

function DetailBot(props) {
      const { detail, org, setPopUp, setNewItemCart,imageDefault } = props;
      const history = useHistory();
      const dispatch = useDispatch();
      const [quantity, setQuantity] = useState(1);
      const desc = () => {
            if (quantity > 1) {
                  setQuantity(quantity - 1)
            }
      }
      const asc = () => {
            setQuantity(quantity + 1)
      }
      const cartItemID = formatCartId(org.id, 2, detail.id)
      const productValues = {
            id: detail.id,
            categoryId: 1,
            locationId: parseInt(org.id),
            org_name: org.name,
            //pr_type + org_id + cate_id + item.id
            elementType: 'service',
            cartItemID: cartItemID,
            image: detail.image,
            image_url: (detail.image)?detail.image_url:imageDefault,
            serviceName: detail.service_name,
            price: detail.special_price < 0 ? detail.price : detail.special_price,
            quantity: quantity,
            isConfirm: true,
            isBooking: false,
            isProduct: false,
      }
      const handleAddCart = () => {
            ////console.log(productValues)
            const action = addCart(productValues);
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
                  dispatch(action);
                  history.push(`/Frontend/Momo-layout-cart/${org.id}`)
            }
      }
      return (
            <div className="de-bot">
                  <div className="de-bot__quantity">
                        <span>Số buổi</span>
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