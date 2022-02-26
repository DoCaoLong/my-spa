import React from 'react';
import {useHistory} from 'react-router-dom';
import scrollTop from '../../../utils/scrollTop';
import img from '../../../constants/imageList';

const data = [
      { id: 1, name: 'Dịch vụ 0đ - Tha hồ làm đẹp', date: '30/11/2021' },
      { id: 2, name: 'Dịch vụ 0đ - Tha hồ làm đẹp', date: '01/01/2021' },
      { id: 3, name: 'Dịch vụ 0đ - Tha hồ làm đẹp', date: '01/02/2021' },
      { id: 4, name: 'Dịch vụ 0đ - Tha hồ làm đẹp', date: '01/01/2077' },
      { id: 5, name: 'Dịch vụ 0đ - Tha hồ làm đẹp', date: '01/02/2021' },
      { id: 6, name: 'Dịch vụ 0đ - Tha hồ làm đẹp', date: '01/01/2077' },
      { id: 7, name: 'Dịch vụ 0đ - Tha hồ làm đẹp', date: '01/02/2021' },
      { id: 8, name: 'Dịch vụ 0đ - Tha hồ làm đẹp', date: '01/01/2077' }
]
function HomeSale(props) {
      const history = useHistory();
      const gotoEndow = (item) => {
            history.push({
                  pathname: '/Frontend/Endow-detail/',
                  search: `id=${item.id}`
            })
            scrollTop();
      }
      return (
            <div className="home-top pd-left-right">
                  <h1 className="home-top-desc home-top-desc-pdt-0">Ưu đãi nổi bật</h1>
                  <div className="home-sale">
                        <ul>
                              {
                                    data.map(item => (
                                          <li key={item.id}>
                                                <div 
                                                      onClick={()=>gotoEndow(item)}
                                                      className="home-sale__item"
                                                >
                                                      <div className="orange-tag text">
                                                            <p>20%</p>
                                                            <p>off</p>
                                                      </div>
                                                      <div className="home-sale_img">
                                                            <img src={""} onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}}  alt="" />
                                                      </div>
                                                      <span className="home-sale__item-name">
                                                            {item.name}
                                                      </span>
                                                      <p className="home-sale__item-date">
                                                            HSD: {item.date}
                                                      </p>
                                                </div>
                                          </li>
                                    ))
                              }
                        </ul>
                        <ul>
                              {
                                    data.map(item => (
                                          <li key={item.id}>
                                                <div 
                                                      onClick={()=>gotoEndow(item)}
                                                      className="home-sale__item"
                                                >
                                                      <div className="orange-tag text">
                                                            <p>20%</p>
                                                            <p>off</p>
                                                      </div>
                                                      <div className="home-sale_img">
                                                            <img src={""} onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}}  alt="" />
                                                      </div>
                                                      <span className="home-sale__item-name">
                                                            {item.name}
                                                      </span>
                                                      <p className="home-sale__item-date">
                                                            HSD: {item.date}
                                                      </p>
                                                </div>
                                          </li>
                                    ))
                              }
                        </ul>
                  </div>
            </div>
      );
}

export default HomeSale;