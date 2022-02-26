import React from 'react';
import img from '../../../../constants/imageList';
import formatNumber from '../../../../utils/formatPrice';
import { addCart } from '../../../../redux/CartSlice'
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import slugify from '../../../../utils/formatUrlString';
import PopupAddCart from '../PopupAddCart';
import formatCartId from '../../../../utils/formatCartItemId';

function ProductItem(props) {
      const { id } = useParams();
      const history = useHistory();
      const dispatch = useDispatch();
      const { product, setIsOpen, setNewItemCart, org, imageDefault } = props;
      //const [openAddCart, setOpenAddCart] = useState(false)
      const carts = useSelector((state) => state.carts);
      const cartsList = carts.cartItems
      const cartItemID = formatCartId(id, 1, product.id)
      const itemInCart = cartsList.find(item => item.cartItemID === cartItemID)
      const quantity = 1;
      const productValues = {
            cartItemID: cartItemID,
            categoryId: product.product_category_id,
            id: product.id,
            isBooking: false,
            isConfirm: true,
            org_name:org?.name,
            elementType: 'product',
            image: product.image,
            image_url: (product.image)?product.image_url:imageDefault,
            locationId: parseInt(id),
            price: parseInt(product.special_price < 0 ? product.retail_price : product.special_price),
            quantity: quantity,
            serviceName: product.product_name
      }
      const handleAddCart = () => {
            const cartBottom = document.querySelector(".menu-bottom");
            const storageCart = JSON.parse(localStorage.getItem('myspa-cart'));
            cartBottom.classList.remove("menu-bottom-hide");
            const action = addCart(productValues);
            // eslint-disable-next-line eqeqeq
            if (storageCart && storageCart.length != 0) {
                  if (storageCart[0].locationId === productValues.locationId) {
                        dispatch(action);
                  }
                  else {
                        setIsOpen(true);
                        setNewItemCart(productValues)
                  }
            }
            else {
                  dispatch(action);
            }
      }
      const gotoPageDetail = () => {
            history.push({
                  pathname: `/Frontend/Detail/${slugify(product.product_name)}`,
                  search: `${product.id},${id}`,
                  state: {product, org}
            })
      }
      return (
            <div className="flex-box-col">
                  <div className="item flex-box-row cus-service-item">
                        <div className="avatar" onClick={gotoPageDetail}>
                              <img src={(product.image)?product.image_url:imageDefault} onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }} alt="banner" className="image-size cus-img-page-detail" />
                        </div>
                        <div className="service-info cus-service-info">
                              <div onClick={gotoPageDetail} >
                                    <div className="address nunito-text-md text-black-color">
                                          {product.product_name}
                                    </div>
                                    <div className="rating flex-box-row">
                                          {/* <div className="result flex-box-row">
                                                <span className="text-black-color nunito-text-sm ">
                                                      4
                                                </span>
                                                <img className="icon" src={img.star} alt="icon yellow star" />
                                          </div>
                                          <div className="result flex-box-row">
                                                <span className="text-black-color nunito-text-sm ">
                                                      4
                                                </span>
                                                <img className="icon" src={img.subtract} alt="comment icon" />
                                          </div> */}
                                    </div>
                              </div>
                              <div className="price flex-box-row">
                                   
                                    <span
                                          onClick={gotoPageDetail}
                                          className="nunito-text-mmd text-primary-color"
                                    >
                                          <span
                                                style={product.special_price < 0 ? { display: 'none' } : {}}
                                                className="cb-cnt__item-detail_price-old"
                                          >
                                                {formatNumber(product.retail_price)}đ
                                          </span>
                                          {formatNumber(product.special_price < 0 ? product.retail_price : product.special_price)} đ
                                    </span>
                                    
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
                                          <img src={img.Cart} alt="cart icon" />
                                    </button>
                              </div>
                        </div>
                  </div>
                  <hr className="grey-line" />
                  <PopupAddCart
                        name={product.product_name}
                        open={false}
                        // setOpen={setOpenAddCart}
                  />
            </div>
      );
}

export default ProductItem;