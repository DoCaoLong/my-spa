import React, { useEffect } from 'react';
// import Slider from 'react-slick';
import formatNumber from '../../../utils/formatPrice'
import img from '../../../constants/imageList'
// import { green } from '@mui/material/colors';

function DetailHead(props) {
      const { detail, sale_price, old_price, imageDefault, setOld_price, setSale_price } = props;
      useEffect(() => {
            // if (detail.price > detail.discount) {
            //       setOld_price(detail.price);
            //       setSale_price(detail.discount)
            // } else if (detail.discount > detail.price) {
            //       setOld_price(detail.discount)
            //       setSale_price(detail.price)
            // } else if (detail.price === detail.discount) {
            //       setSale_price(detail.price)
            // }
            setOld_price(detail.use_value);
            if(detail.discount > 0){
                  setSale_price(detail.price)
            }
      })
      const imgHeight = document.body.offsetWidth;
      // const settings = {
      //       dots: true,
      //       infinite: true,
      //       speed: 500,
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //       autoplaySpeed: 4000,
      //       autoplay: true
      // };
      const discount = Math.round(sale_price / old_price * 100);
      return (
            <div className="de-head cmd-de-head">
                  {/* <Slider {...settings}> */}
                        <div 
                              style={{paddingBottom: '100%'}}
                              className="de-head__img"
                        >
                              <img style={{ height: imgHeight }} className="banner-img"
                                    src={imageDefault}
                                    onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }}
                                    alt=""
                              />
                        </div>
                  {/* </Slider> */}
                  <div className="detail-box">
                        <div className="de-head__cont">
                              <span
                                    style={{ width: '100%' }}
                                    className="de-head__cont-name"
                              >
                                    {detail.name}
                              </span>
                              {/* <span className="de-head__cont-rate">
                                    <span>4.5</span>
                                    <img src={img.star} alt="" />
                                    <span>45</span>
                                    <img src={img.subtract} alt="" />
                              </span> */}
                        </div>
                        <div className="de-head__cont-price">
                              <span
                                    style={
                                          detail.discount === 0?
                                          {
                                                color: 'var(--purple)',
                                                textDecoration: 'none',
                                                fontSize: '24px',
                                                lineHeight: '32px',
                                                fontWeight: '700'
                                          }
                                          :
                                          {}
                                    }
                                    className="de-head__cont-price__old"
                              >
                                    {/* {detail.discount === 0 ? `${formatNumber(old_price)}` : `${formatNumber(sale_price)}`} đ */}
                                    {`${formatNumber(old_price)}`} đ 
                              </span>
                              <div
                                    style={detail.discount === 0 ? { display: 'none' } : {}}
                                    className="de-head__cont-price__discount"
                              >
                                    <div className="discount-box">
                                          Giảm {100 - discount}%
                                    </div>
                                    <span className="discount-pice">{formatNumber(sale_price)} đ</span>
                              </div>
                        </div>
                        <div className="de-head__cont-desc">
                              {detail.note}
                        </div>
                  </div>
            </div>
      );
}

export default DetailHead;