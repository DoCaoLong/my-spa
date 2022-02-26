import React from 'react';
import '../../assets/style/loading.css';
import Skeleton from 'react-loading-skeleton'

export const OnLoad = (props) => 
      (
            <Skeleton style={{ width: '100%', height: '100%'}} {...props}/>
      )
export const OnImgLoad = (props) =>(
      <Skeleton style={{ width: '100%', height: '100%', borderRadius:'16px' }} {...props}/>
)

export function CartItemMap(props) {
      return (
            <>
                  <div className="ld-cart-item">
                        <div className="ld-cart-item__img">
                              <OnImgLoad/>
                        </div>
                        <div className="ld-cart-item__name">
                              <OnLoad/>
                        </div>
                        <div className="ld-cart-item__address">
                              <OnLoad/>
                        </div>
                        <div className="ld-cart-item__price">
                              <OnLoad/>
                        </div>
                  </div>
                  <div className="ld-cart-item">
                        <div className="ld-cart-item__img">
                              <OnImgLoad/>
                        </div>
                        <div className="ld-cart-item__name">
                              <OnLoad/>
                        </div>
                        <div className="ld-cart-item__address">
                              <OnLoad/>
                        </div>
                        <div className="ld-cart-item__price">
                              <OnLoad/>
                        </div>
                  </div>
                  <div className="ld-cart-item">
                        <div className="ld-cart-item__img">
                              <OnImgLoad/>
                        </div>
                        <div className="ld-cart-item__name">
                              <OnLoad/>
                        </div>
                        <div className="ld-cart-item__address">
                              <OnLoad/>
                        </div>
                        <div className="ld-cart-item__price">
                              <OnLoad/>
                        </div>
                  </div>
            </>
      );
}
export const card_loading = (props) => 
      (
            <div className="flex-box-col">
                  <div className="item flex-box-row cus-service-item sketon-loading">
                        <div className="avatar loading">
                              <OnImgLoad className="loading_img"/>
                        </div>
                        <div className="content">
                              <div className="title-sketon">
                                    <OnLoad/>
                              </div>
                              <div className="content-sketon">
                                    <div className="item">
                                          <OnLoad/>
                                    </div>
                                    <div className="item">
                                          <OnLoad/>
                                    </div>
                                    <div className="item">
                                          <OnLoad/>
                                    </div>
                              </div>
                        </div>
                  </div>
                  {(props?.notHr)||<hr className="grey-line" />}
            </div>
      )
export default CartItemMap;
