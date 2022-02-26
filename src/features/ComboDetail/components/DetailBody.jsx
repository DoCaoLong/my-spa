import React, { useEffect, useState } from 'react';
import img from '../../../constants/imageList';

function DetailBody(props) {
      const {
            detail,
            imageDefault
            // org_id
      } = props;
      //const history = useHistory();
      const btns = [
            { id: 1, text: 'Dịch vụ', type: detail.services },
            { id: 2, text: 'Sản phẩm', type: detail.products }
      ]
      const [actBtn, setActBtn] = useState('Dịch vụ')
      useEffect(() => {
            if (detail.services?.length === 0) {
                  setActBtn('Sản phẩm')
            } else if (detail.products?.length === 0) {
                  setActBtn('Dịch vụ')
            }
      }, [detail.products?.length, detail.services?.length])
      // const gotoServiceDetail = (item) => {
      //       const params = {
      //             org_id: org_id,
      //             pr_id: item.id
      //       }
      //       history.push({
      //             pathname: "/Frontend/Service-detail",
      //             search: `${slugify(item.product_name)}`,
      //             state: params
      //       })
      //       scrollTop();
      // }
      return (
            <div style={{paddingBottom:'120px'}}>
                  <div className="cmb-de">
                        <div className="cmb-de__title">
                              Chi tiết các {detail.products?.length > 0 ? 'Sản phẩm' : ''}
                              {detail.services?.length > 0 ? ' Dịch vụ' : ''} trong Combo
                        </div>
                        <div className="cmb-de__btn">
                              {
                                    btns.map(item => (
                                          <div
                                                key={item.id}
                                                style={
                                                      item.type?.length === 0 ?
                                                            { display: 'none', width: '100%' }
                                                            :
                                                            {}
                                                }
                                          >
                                                <button
                                                      onClick={() => setActBtn(item.text)}
                                                      style={actBtn === item.text ? { backgroundColor: 'var(--bgWhite)', color: 'var(--darkBlue)' } : {}}
                                                >
                                                      {item.text}
                                                </button>
                                          </div>
                                    ))
                              }
                        </div>
                  </div>
                  <div
                        style={actBtn === 'Dịch vụ' ? { display: 'block' } : { display: 'none' }}
                        className="cmb-de__list-product"
                  >
                        <ul>
                              {
                                    detail?.services?.map((item) => (
                                          <li
                                                style={{ margin: '10px 0px' }}
                                                key={item.id}
                                          >
                                                <div className="cb-cnt__item">
                                                      <img
                                                            src={(item.image)?item.image_url:imageDefault}
                                                            onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }}
                                                            alt="" className="cb-cnt__item-img"
                                                      />
                                                      <div className="cb-cnt__item-detail">
                                                            <span className="cb-cnt__item-detail_name with_discount">
                                                                  {item.service_name}
                                                            </span>
                                                            {/* <span
                                                                  style={
                                                                        item.special_price < 0 ?
                                                                              { display: 'none' } : {}
                                                                  }
                                                                  className="cb-cnt__item-detail_price-old"
                                                            >
                                                                  {item.retail_price} đ
                                                            </span> */}
                                                            <div style={{display:'unset'}} className="cb-cnt__item-detail_bot">
                                                                  <div className="flex-row-sp">
                                                                        {/* <div className="price">
                                                                              <span
                                                                                    style={
                                                                                          item.special_price < 0 ?
                                                                                                { display: 'none' } : {}
                                                                                    }
                                                                                    className="discount"
                                                                              >
                                                                                    Giảm {100 - Math.round(item.special_price / item.retail_price * 100)} %
                                                                              </span>
                                                                              <span
                                                                                    style={
                                                                                          item.special_price < 0 ?
                                                                                                { marginLeft: '0px', color: 'var(--purple)' }
                                                                                                :
                                                                                                {}
                                                                                    }
                                                                                    className="price-sale"
                                                                              >
                                                                                    {
                                                                                          item.special_price < 0 ?
                                                                                                formatNumber(item.retail_price)
                                                                                                :
                                                                                                formatNumber(item.special_price)
                                                                                    }đ
                                                                              </span>
                                                                        </div> */}
                                                                        <span className="number">
                                                                              x {item.pivot.number}
                                                                        </span>
                                                                  </div>
                                                            </div>
                                                            {/* <div
                                                                  onClick={()=>gotoServiceDetail(item)}
                                                                  className="cb-cnt__item-detail_view"
                                                            >
                                                                  Đến trang chi tiết Dịch vụ
                                                            </div> */}
                                                      </div>
                                                </div>
                                          </li>
                                    ))
                              }
                        </ul>
                  </div>
                  <div
                        style={actBtn === 'Sản phẩm' ? { display: 'block' } : { display: 'none' }}
                        className="cmb-de__list-product"
                  >
                        <ul>
                              {
                                    detail?.products?.map((item) => (
                                          <li
                                                style={{margin:'10px 0px'}}
                                                key={item.id}
                                          >
                                                <div className="cb-cnt__item">
                                                      <img
                                                            src={(item.image)?item.image_url:""}
                                                            onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }}
                                                            alt="" className="cb-cnt__item-img"
                                                      />
                                                      <div className="cb-cnt__item-detail">
                                                            <span className="cb-cnt__item-detail_name with_discount">
                                                                  {item.product_name}
                                                            </span>
                                                            {/* <span
                                                                  style={
                                                                        item.special_price < 0 ?
                                                                        {display:'none'}:{}
                                                                  }
                                                                  className="cb-cnt__item-detail_price-old"
                                                            >
                                                                  {formatNumber(item.retail_price)} đ
                                                            </span> */}
                                                            <div 
                                                                  style={{display:'unset'}}
                                                                  className="cb-cnt__item-detail_bot"
                                                            >
                                                                  <div className="flex-row-sp">
                                                                        {/* <div className="price">
                                                                              <span
                                                                                    style={
                                                                                          item.special_price < 0 ?
                                                                                                { display: 'none' } : {}
                                                                                    }
                                                                                    className="discount"
                                                                              >
                                                                                    Giảm {100 - Math.round(item.special_price / item.retail_price * 100)} %
                                                                              </span>
                                                                              <span
                                                                                    style={
                                                                                          item.special_price < 0 ?
                                                                                                { marginLeft: '0px', color: 'var(--purple)' }
                                                                                                :
                                                                                                {}
                                                                                    }
                                                                                    className="price-sale"
                                                                              >
                                                                                    {
                                                                                          item.special_price < 0 ?
                                                                                                formatNumber(item.retail_price)
                                                                                                :
                                                                                                formatNumber(item.special_price)
                                                                                    }đ
                                                                              </span>
                                                                        </div> */}
                                                                        <span className="number">
                                                                              x {item.pivot.number}
                                                                        </span>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </li>
                                    ))
                              }
                        </ul>
                  </div>
            </div>
      );
}

export default DetailBody;