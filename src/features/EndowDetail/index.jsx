import React, { useState } from 'react';
// import {useLocation} from 'react-router-dom';
import '../../assets/style/endow.css';
import imgList from '../../constants/imageList';
import Header from '../Header';
import {useHistory} from 'react-router-dom';
const tabs = [{ id: 1, name: 'Nổi bật' }, { id: 2, name: 'Gần tôi' }]
const data = [
      {
            name:'Anessa Beauty & Spa ',
            address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
            servicesList:[
                  {
                        id:83,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000',
                  },
                  {
                        id:84,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  },
                  {
                        id:85,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  },
                  {
                        id:86,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  },
                  {
                        id:87,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  }
                  
            ],
            branch:[
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  }
            ]
      },
      {
            name:'Anessa Beauty & Spa ',
            address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
            servicesList:[
                  {
                        id:83,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  },
                  {
                        id:84,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  },
                  {
                        id:85,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  },
                  {
                        id:86,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  },
                  {
                        id:87,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  }
                  
            ],
            branch:[
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  }
            ]
      },
      {
            name:'Anessa Beauty & Spa ',
            address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
            servicesList:[
                  {
                        id:83,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  },
                  {
                        id:84,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  },
                  {
                        id:85,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  },
                  {
                        id:86,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  },
                  {
                        id:87,
                        product_name:'Lấy nhân mụn, tái tạo da sau mụn',
                        retail_price:'1650000',
                        special_price:'-1',
                        price: '300000'
                  }
                  
            ],
            branch:[
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  },
                  {
                        name:'Anessa Beauty & Spa ',
                        address:'13 Đường Số 5, Phước Long A, Quận 9, Thành phố Hồ Chí Minh, Việt Nam',
                        latitude:'10.801686',
                        longitude:'106.682946'
                  }
            ]
      }
]
function Endow(props) {
      // const location = useLocation();
      const history = useHistory();
      const [chooseTab, setChooseTab] = useState(1);
      //console.log(location);
      // const itemId = location.search.slice(4, location.search.length);
      //console.log(itemId);
      (localStorage.getItem('discount-data'))||(localStorage.setItem('discount-data',JSON.stringify(data)));
      const chooseTabClick=(id)=>{
            setChooseTab(id);
      }
      //console.log('data',data);
      return (
            <div className="endow-content">
                  <Header
                        headerTitle="Chi tiết ưu đãi"
                  />
                  <div className="endow-content__img">
                        <img className="image-size" src={imgList.endowBanner} alt="" />
                  </div>
                  <div className="endow-content__box">
                        <span className="endow-content__box-name">
                              Siêu ưu đãi 50% - Tân trang đón Tết
                        </span>
                        <span className="endow-content__box-text">
                              Giảm giá 50% các dịch vụ chăm sóc da. Áp dụng cho tất cả khách hàng khi thanh toán qua ứng dụng momo. Số lượng có hạn, sử dụng ngay!
                        </span>
                        <span className="endow-content__box-text">
                              Đến ngày: 01/12/2021
                        </span>
                  </div>
                  <div className="endow-content__button">
                        {
                              tabs.map(item =>(
                                    <button
                                          style={item.id === chooseTab ?
                                                { borderBottom: 'solid 1px var(--purple)', color: 'var(--purple)' }
                                                :
                                                {}
                                          }
                                          key={item.id}
                                          onClick={() => chooseTabClick(item.id)}
                                    >
                                          {item.name}
                                    </button>
                              ))
                        }
                  </div>
                  <div className="endow-content__list">
                        {
                              data.map((item,index)=>(
                              <div className="endow-content__list-item" key={"d"+index}>
                                    <img src={imgList.logoMyspa} onError={(e)=>{e.target.src=imgList.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} alt="" className="endow-item__logo" />
                                    <div className="endow-item__detail">
                                          <span className="endow-item__detail-name">
                                               {item.name}
                                          </span>
                                          <span className="endow-item__detail-rate">
                                                4.1
                                                <img src={imgList.star} onError={(e)=>{e.target.src=imgList.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} alt="" />
                                                100
                                                <img src={imgList.subtract} onError={(e)=>{e.target.src=imgList.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} alt=""/>
                                          </span>
                                          <span className="endow-item__detail-address">
                                          {item.address}
                                          </span>
                                          <ul className="endow-item__detail-list">
                                                {
                                                item.servicesList?.map((item,index)=>(
                                                      (index<=1)&&(
                                                      <li key={index}>
                                                      <img src={imgList.endowItem} onError={(e)=>{e.target.src=imgList.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} alt="" />
                                                      <div>
                                                            <span>{item.product_name}</span>
                                                            <p>
                                                                  <h3>300.000đ</h3>
                                                                  <h4>600.000đ</h4>
                                                            </p>
                                                      </div>
                                                      </li>)
                                                ))
                                                } 
                                          </ul>
                                          <button className="endow-view" onClick={()=>history.push(`/Frontend/ViewMore/${index+1}`)}>
                                                Xem thêm {item.servicesList.length} dịch vụ khác
                                                <img src={imgList.arrowRight} onError={(e)=>{e.target.src=imgList.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} alt="" />
                                          </button>
                                    </div>
                              </div>
                              ))
                        }
                        
                  </div>
            </div>
      );
}

export default Endow;