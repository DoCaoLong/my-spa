import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector} from "react-redux";
import CartItem from "./components/CartItem";
import CartTotal from "./components/CartTotal";
import "../../assets/style/custom-material.css";
import PopupDeleteAll from "./components/PopupDeleteAll";
import Header from "../Header/index";
import Head from '../../component/HeadTag/default';
import { View_cart } from '../../component/Constant/MetaConst'
import PopUpLogin from './components/PopUpLogin';
//import RemoveSelect from "./components/RemoveSelect";

function Cart(props) {
      const buttonTitle = "Thanh toán";
      const url = "/Frontend/Momo-layout-confirm-payment/unFocus";
      const headerTitle = 'Giỏ hàng';
      const { id } = useParams();
      const carts = useSelector((state) => state.carts);

      const cartList = carts.cartItems
      const confirmList = cartList.filter(item => item.isConfirm === true);
      const keepCart = cartList.filter(item => item.isConfirm === false)

      const urlPrev = (id && id !== 'focus') ? ("/Frontend/Momo-layout-detail/" + id) : "/Frontend/";
      const [dialogAll, setDialogAll] = useState(false);
      //const [openRemove, setOpenRemove] = useState(false)
      const userToken = JSON.parse(sessionStorage.getItem("userToken"));
      let isUser = false;
      if (!userToken || userToken.status !== 200) {
            isUser = true;
      }
      const [popUpLogin, setPopUpLogin] = useState(isUser);
      const handleClearAll = () => {
            if (confirmList.length > 0) {
                  setDialogAll(true)
            }
      }
      const productsCart = carts.cartItems?.filter(item => item.elementType === 'product');
      const servicesCart = carts.cartItems?.filter(item => item.elementType === 'service');
      const combosCard = carts.cartItems?.filter(item => item.elementType === 'combo')
      // console.log(productsCart);
      return (
            <div>
                  <Head
                        Title={View_cart.title}
                        Description={View_cart.description}
                  >
                  </Head>
                  <Header
                        headerTitle={headerTitle}
                        urlPrev={urlPrev}
                  />
                  <div className="cus-cart-list">
                        <div className="cus-cart-header__service">
                              <span className="cus-cart-header__service-left">Dịch vụ/Sản phẩm/Combo</span>
                              <span
                                    onClick={handleClearAll}
                                    style={confirmList.length > 0 ? { opacity: 1 } : { opacity: 0.6 }}
                                    className="cus-cart-header__service-right"
                              >
                                    Xóa {confirmList.length} (items)
                              </span>
                        </div>
                        <hr className="grey-line cart-line" />
                        {
                              carts.cartItems.length === 0 ?
                                    <div className="cus-cart_none">
                                          Không có Dịch vụ/Sản phẩm/Combo trong giỏ hàng
                                    </div>
                                    :
                                    <div>
                                          {
                                                servicesCart.length === 0 ? ''
                                                      :
                                                      <>
                                                            <div className="cart-type__title">Dịch vụ</div>
                                                            {
                                                                  servicesCart.map(item => (
                                                                        <CartItem
                                                                              key={item.cartItemID}
                                                                              cartItem={item}
                                                                        />
                                                                  ))
                                                            }
                                                      </>
                                          }
                                          {
                                                productsCart.length === 0 ? ''
                                                      :
                                                      <>
                                                            <div className="cart-type__title">Sản phẩm</div>
                                                            {
                                                                  productsCart.map(item => (
                                                                        <CartItem
                                                                              key={item.cartItemID}
                                                                              cartItem={item}
                                                                        />
                                                                  ))
                                                            }
                                                      </>
                                          }
                                          {
                                                combosCard.length === 0 ? ''
                                                      :
                                                      <>
                                                            <div className="cart-type__title">Combo</div>
                                                            {
                                                                  combosCard.map(item => (
                                                                        <CartItem
                                                                              key={item.cartItemID}
                                                                              cartItem={item}
                                                                        />
                                                                  ))
                                                            }
                                                      </>
                                          }
                                          <CartTotal
                                                buttonTitle={buttonTitle}
                                                url={url}
                                          />
                                    </div>
                        }
                  </div>
                  <PopupDeleteAll
                        keepCart={keepCart}
                        confirmList={confirmList}
                        dialogAll={dialogAll}
                        setDialogAll={setDialogAll}
                  />
                  {/* <RemoveSelect
                        open={openRemove}
                        setOpen={setOpenRemove}
                  /> */}
                  <PopUpLogin
                        isOpen={popUpLogin}
                        setIsOpen={setPopUpLogin}
                        err={(userToken) && userToken.status}
                        title="Yêu cầu truy cập thông tin"
                        reason={
                              "Cho phép sử dụng thông tin <b>Họ tên, Số điện thoại, Email</b> của bạn để bắt đầu trải nghiệm thiên đường làm đẹp"
                        }
                  />
            </div>
      );
}

export default Cart;