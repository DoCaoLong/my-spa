import React, { useState, useRef } from 'react';
import Guide from './slide';
import { userGuide } from '../../../constants/imageList';
import Slider from "react-slick";
import imgList from "../../../constants/imageList";


const step = [
  {
    title: 'Tìm kiếm/ lựa chọn sản phẩm dịch vụ spa, salon yêu thích',
    img: [
      {
        desc: 'Bộ lọc danh mục',
        url: userGuide.step_1
      }
    ]
  },
  {
    title: 'Thanh toán sản phẩm dịch vụ',
    img: [
      {
        desc: 'Kiểm tra giỏ hàng',
        url: userGuide.step_2
      }
    ]
  },
  {
    title: `Đặt hẹn ngay khi thanh toán
      hoặc Đặt hẹn sau tại "Gói dịch vụ"`,
    img: [
      {
        desc: 'Chọn button “Đặt hẹn ngay" để đặt hẹn sau khi thanh toán',
        url: userGuide.step_3
      }
    ]
  },
  {
    title: `Đến cơ sở trải nghiệm và đánh giá dịch vụ`,
    img: [
      {
        desc: 'Lưu trữ thông tin và nhắc hẹn khi đến lịch',
        url: userGuide.step_4
      }
    ]
  }
]
export default function Userguided({ header }) {

  const [slide, setSlide] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const ref = useRef({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    initialSlide: slideIndex,
    // adaptiveHeight: true,
    slidesToScroll: 1,
    swipeToSlide: true,
  };
  const goTosilide = (index) => {
    ref.current.slickGoTo(index);
  };
  return (
    <>
      <div className="guided-section">
        {
          (header) && (
            <div className="guided-section-title">
              <h2>
                Hướng dẫn sử dụng Mini App Myspa
              </h2>
            </div>
          )
        }
        <div className="guided-section-content">
          {step.map((item, index) => (
            <Guide
              key={index}
              step={index}
              slide={slide}
              setSlide={setSlide}
              setSlideIndex={setSlideIndex}
              goTosilide={goTosilide}
              item={item}
            />
          ))}
        </div>
        <div className={(slide) ? 'step-slider active' : 'step-slider'}>
          <div className="close-btn" onClick={() => setSlide(!slide)}>
            <img src={imgList.closeCircleWhite} alt="" />
          </div>
          <Slider ref={ref} {...settings}>
            {
              step.map((item, index) => (
                <div
                  key={index}
                >
                  {
                    item.img.map((value, index) => (
                      <div
                        key={index}
                      >
                        <div className="step-img">
                          <img src={value.url} alt={"step" + index + index} />
                        </div>
                        <div className="step-img-desc">
                          <span>{item.title}</span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </Slider>
          <div className="bg-shadow"></div>
        </div>
      </div>
    </>
  )
}