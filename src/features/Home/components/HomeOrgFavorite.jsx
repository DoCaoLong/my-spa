import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import organizationApi from '../../../apis/organizationApi';
import img from '../../../constants/imageList';
import Loading from '../../../component/ReuseComponent/LoadingBox';
import {useHistory} from 'react-router-dom'

function HomeOrgFavorite(props) {
      const history = useHistory();
      const [data, setData] = useState({
            orgFa:[],
            loading:false
      })
      const tk = ((JSON.parse(sessionStorage.getItem('userToken')))?.context.token) || '';
      async function handleGetOrgFavorite() {
            setData({...data, loading:true})
            try {
                  const res = await organizationApi.getOrgFavorite({ token: tk })
                  const temp = await res.data.context.data.filter(item => item.is_favorite === true)
                  setData({
                        orgFa:temp,
                        loading:false
                  })
            } catch (error) {
                  setData({...data, loading:false})
                  console.log(error)
            }
      }
      useEffect(() => {
            if (tk.length > 0) {
                  handleGetOrgFavorite()
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [tk.length])
      const gotoPageDetail = (org) => {
            history.push({
                  pathname: `/Frontend/Momo-layout-detail/${org.id}`,
                  state: org
            });
      }
      return (
            <>
                  {
                        tk.length === 0 || data.orgFa.length === 0 ?
                              ''
                              :
                              <div className="home-bot">
                                    <h2 className="home-bot-desc">Địa điểm làm đẹp yêu thích</h2>
                                    <div className="home-bot-city">
                                          <div className="city-wrap">
                                                <div className="city-title">
                                                      {/* <div className="city-name">{title}</div> */}
                                                      {/* <div
                                                onClick={gotoPageViewMore}
                                                style={{ cursor: 'pointer' }}
                                                className="city-seeall">
                                                Xem tất cả
                                          </div> */}
                                                </div>
                                                <div className="city-list">
                                                      {
                                                            data.loading === true ?
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
                                                                  data.orgFa?.map(item => (
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
                                    </div>
                              </div>
                  }
            </>
      );
}

export default HomeOrgFavorite;