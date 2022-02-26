import React from 'react';
import img from '../../../../constants/imageList'
import { addCart } from '../../../../redux/CartSlice';
import { useSelector, useDispatch } from 'react-redux'
import formatNumber from '../../../../commons/formatPrice';
import slugify from '../../../../utils/formatUrlString';
import { useHistory } from 'react-router-dom';
import PopupAddCart from '../PopupAddCart';
import formatCartId from '../../../../utils/formatCartItemId';

function ServiceItem(props) {
      const { service ,branchList, setIsOpen, setNewItemCart, org ,imageDefault} = props;
      const history = useHistory();
      const carts = useSelector((state) => state.carts);
      const cartsList = carts.cartItems
      const cartItemID = formatCartId(org?.id, 2, service.id);
      const itemInCart = cartsList.find(item => item.cartItemID === cartItemID)
      const storageCart = JSON.parse(localStorage.getItem('myspa-cart'));

      // console.log(storageCart)

      const dispatch = useDispatch();
      //const [openAddCart, setOpenAddCart] = useState(false)
      const quantity = 1;
      const price = (service.special_price > 0) ? service.special_price : service.price;
      const serviceValue = {
            id: service.id,
            categoryId: 1,
            locationId: parseInt(org?.id),
            org_name:org?.name,
            //pr_type + org_id + cate_id + item.id
            cartItemID: cartItemID,
            image: service.image,
            image_url: (service.image)?service.image_url:imageDefault,
            serviceName: service.service_name,
            price: price,
            quantity: quantity,
            isConfirm: true,
            isBooking: false,
            elementType: 'service',
            branchList: branchList
      }
      const handleAddCart = () => {
            const cartBottom = document.querySelector(".menu-bottom");
            cartBottom.classList.remove("menu-bottom-hide");

            const action = addCart(serviceValue);
            if(storageCart && storageCart.length > 0){
                  if(storageCart.findIndex((item) => item.locationId === serviceValue.locationId)===0)
                  {
                        dispatch(action);
                  }
                  else{
                        setIsOpen(true);
                        setNewItemCart(serviceValue)
                  }
            }
            else{
                  dispatch(action);
                  //setOpenAddCart(true)
            }
      };
      const gotoPageDetail = () => {
            history.push({
                  pathname: `/Frontend/Service-detail/${slugify(service.service_name)}`,
                  search: `${service.id},${org.id}`,
                  state: {service, org}
            })
      }
      return (
            <div className="flex-box-col">
                  <div className="item flex-box-row cus-service-item">
                        <div className="avatar" onClick={gotoPageDetail}>
                              <img src={(service.image)?service.image_url:imageDefault} onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} alt="banner" className="image-size cus-img-page-detail"/>
                        </div>
                        <div className="service-info cus-service-info">
                              <div
                                    onClick={gotoPageDetail}
                              >
                                    <div className="address nunito-text-md text-black-color">
                                          {service.service_name}
                                    </div>
                                    <div className="rating flex-box-row">
                                          {/* <div className="result flex-box-row">
                                                <span className="text-black-color nunito-text-sm ">
                                                      {service.rateStar}
                                                </span>
                                                <img className="icon" src={img.star} alt="icon yellow star" />
                                          </div>
                                          <div className="result flex-box-row">
                                                <span className="text-black-color nunito-text-sm ">
                                                      {service.rateComment}
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
                                                style={service.special_price < 0 ? { display: 'none' } : {}}
                                                className="cb-cnt__item-detail_price-old"
                                          >
                                                {formatNumber(service.price)}đ
                                          </span>
                                          {
                                                service.special_price > 0 ?
                                                      formatNumber(service.special_price)
                                                      :
                                                      formatNumber(service.price)
                                          } đ
                                    </span>
                                    <button onClick={handleAddCart} className="cus-btn-add-cart">
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
                        name={service.service_name}
                        open={false}
                        // setOpen={setOpenAddCart}
                  />
            </div>
      );
}

export default ServiceItem;