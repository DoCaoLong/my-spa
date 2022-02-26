import React from 'react';
import Slider from 'react-slick';
import img from '../../../constants/imageList';
import formatNumber from '../../../utils/formatPrice';

function DetailHead(props) {
      const { detail,imageDefault } = props;
      const imgHeight = document.body.offsetWidth;
      const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 4000,
            autoplay: true
      };
      const percent = Math.round(100 - detail.special_price / detail.retail_price * 100)
      return (
            <div className="de-head">
                  <Slider {...settings}>
                        <div style={{ height: imgHeight }}>
                              <img className="de-head__img"
                                    style={{ paddingBottom: 'unset' }}
                                    src={(detail.image)?detail.image_url:imageDefault}
                                    onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }}
                                    alt=""
                              />
                        </div>
                  </Slider>
                  <div className="detail-box">
                        <div className="de-head__cont">
                              <span className="de-head__cont-name">
                                    {detail.product_name}
                              </span>
                              <span className="de-head__cont-rate">
                                    {/* <span>4.5</span>
                                    <img src={img.star} alt="" />
                                    <span>45</span>
                                    <img src={img.subtract} alt="" /> */}
                              </span>
                        </div>
                        <div className="de-head__cont-price">
                              <span
                                    style={
                                          detail.special_price < 0 ?
                                                {
                                                      color: 'var(--purple)',
                                                      textDecoration: 'none',
                                                      fontSize: '24px',
                                                      lineHeight: '32px',
                                                      fontWeight: '700'
                                                }
                                                :
                                                {}}
                                    className="de-head__cont-price__old"
                              >
                                    {formatNumber(detail.retail_price)} đ
                              </span>
                              <div
                                    style={detail.special_price < 0 ? { display: 'none' } : {}}
                                    className="de-head__cont-price__discount"
                              >
                                    <div className="discount-box">
                                          Giảm {percent}%
                                    </div>
                                    <span className="discount-pice">{formatNumber(detail.special_price)} đ</span>
                              </div>
                        </div>
                        <div className="de-head__cont-desc">
                              {detail.description}
                        </div>
                        {/* <div className="de-head__cont-time">
                              <div className="de-head__cont-time-item">
                                    <span className="item-left">
                                          <img src={img.Timer} alt="" />
                                          Thời gian
                                    </span>
                                    <span className="item-right">
                                          02 giờ
                                    </span>
                              </div>
                              <div className="de-head__cont-time-item">
                                    <span className="item-left">
                                          <img src={img.Desk_alt} alt="" />
                                          Số buổi
                                    </span>
                                    <span className="item-right">
                                          02 buổi
                                    </span>
                              </div>
                        </div> */}
                  </div>
            </div>
      );
}

export default DetailHead;