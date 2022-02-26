import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import img from '../../../constants/imageList';
import scrollTop from '../../../utils/scrollTop';
import Loading from '../../../component/ReuseComponent/LoadingBox';
import Error from '../../Error'


function HomeBotSection(props) {
      const history = useHistory();
      const { loading, code, title, organization } = props;
      const [error, setError] = useState({
            open: false,
            statusCode: 0
      })
      const gotoPageViewMore = () => {
            history.push(`/Frontend/View-more/${code}`);
            scrollTop();
      }
      const gotoPageDetail = (org) => {
            history.push({
                  pathname: `/Frontend/Momo-layout-detail/${org.id}`,
                  state: org
            });
      }
      return (
            <>
                  <div className="city-wrap">
                        <div className="city-title">
                              <div className="city-name">{title}</div>
                              <div
                                    onClick={gotoPageViewMore}
                                    style={{ cursor: 'pointer' }}
                                    className="city-seeall">
                                    Xem tất cả
                              </div>
                        </div>
                        <div className="city-list">
                              {
                                    loading === true ?
                                          (
                                                <>
                                                      <div

                                                            className="city-item item"
                                                      >
                                                            <Loading className="city-img" style={{ display: 'flex' }} />
                                                      </div>
                                                      <div

                                                            className="city-item item"
                                                      >
                                                            <Loading className="city-img" style={{ display: 'flex' }} />
                                                      </div>
                                                      <div

                                                            className="city-item item"
                                                      >
                                                            <Loading className="city-img" style={{ display: 'flex' }} />
                                                      </div>
                                                </>
                                          )
                                          :
                                          organization?.map(item => (
                                                <div
                                                      onClick={() => gotoPageDetail(item)}
                                                      key={item.id}
                                                      className="city-item item"
                                                >
                                                      <div className="city-img">
                                                            <img src={item.image_url} onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }} alt="" />
                                                      </div>
                                                      <div className="city-content">
                                                            {item.name}
                                                      </div>
                                                      <div className="city-evaluate">
                                                            {/* <div className="city-evaluate-rated">
                                                                  <span>{item.favorites_count}</span><img
                                                                        src={img.heart}
                                                                        alt="" />
                                                            </div> */}
                                                            {/* <div className="city-evaluate-comment">
                                                                  <span>101</span>
                                                                  <img src={img.subtract}
                                                                        alt="" />
                                                            </div> */}
                                                      </div>
                                                </div>
                                          ))
                              }
                        </div>
                  </div>
                  <Error
                        statusCode={error.statusCode}
                        open={error.open}
                        setOpen={setError}
                  />
            </>
      );
}

export default HomeBotSection;