import React from 'react';
import formatNumber from '../../../utils/formatPrice';
import img from '../../../constants/imageList';
// import {useHistory} from 'react-router-dom';
// import slugify from '../../../utils/formatUrlString';

function Item(props) {
      const { item, name,  orderDetail, /*openDetail*/ } = props;
      //console.log("orderDetail",orderDetail);
      //console.log('item',item);
      // const onPreOrder = () => {
      //       if (type === 1) {
      //             history.push({
      //                   pathname: "/Frontend/Detail/",
      //                   search: `${slugify(name)}`,
      //                   state: { org_id: org.id, pr_id: item.id }
      //             })
      //       } else if (type === 2) {
      //             //console.log('item');
      //             //console.log(item);
      //             //console.log(type);
      //             //console.log(name);
      //             // history.push({
      //             //       pathname: "/Frontend/Detail/",
      //             //       search: `${slugify(name)}`,
      //             //       state: { org_id: org.id, ser_id: item.id }
      //             // })
      //       } else if (type === 3) {
      //             history.push({
      //                   pathname: '/Frontend/Combo-detail/',
      //                   search: `${slugify(name)}`,
      //                   state: {
      //                         org_id: org.id,
      //                         cmb_id: item.id
      //                   }
      //             })
      //       }
      // }
      return (
            <li>
                  <div>
                        <div className="cus-cart-list__item">
                              <div className="cus-cart-list__item-img">
                                    <img src={(item)?item.image_url:""} onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }} alt="" />
                              </div>
                              <div className="cus-cart-list__item-name">
                                    {name}
                              </div>
                              <div
                                    style={{ justifyContent: 'space-between' }}
                                    className="cus-cart-list__item-price cus-item-quantity"
                              >
                                    <span>{formatNumber(orderDetail?.base_price)} đ</span>
                                    <p>x{orderDetail?.quantity}</p>
                                    {/* <button
                                          onClick={onPreOrder}
                                    >
                                         pr-order
                                    </button> */}
                              </div>
                        </div>
                        <hr className="grey-line cart-line" />
                  </div>
            </li>
      );
}

export default Item;