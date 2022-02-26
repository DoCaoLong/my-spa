import React, { useContext, useState } from 'react';
import img from '../../../../constants/imageList';
import { card_loading, OnLoad } from '../../../Loading/CartItem';
import BranchListMap from '../Branches/BranchListMap';
import { AppContext } from '../../../../context/AppProvider';
import BannerSlider from './BannerSlider'
import Favorites from './Favorites';
import TimeOpen from './TimeOpen'

function LocationDetail(props) {
      const { organiDetail, organiGalleries, loading, branches, imageDefault } = props;
      const { chooseBranch } = useContext(AppContext)
      const [openDialogMap, setOnDialogMap] = useState(false);
      //const [like, setLike] = useState();     
      const openDialogMapClick = () => {
            setOnDialogMap(true);
      }
      return (
            <div className="infor-result-section bg-white">
                  {
                        loading === true ?
                              (
                                    <div className="card">
                                          <div
                                                className="card-image img-height-result"
                                                style={{ padding: '10px 15px' }}
                                          >
                                                <OnLoad />
                                          </div>

                                          <div
                                                className="card-content"
                                          >
                                                {card_loading()}
                                          </div>
                                    </div>
                              )
                              :
                              <>
                                    <BannerSlider
                                          organiDetail={organiDetail}
                                          organiGalleries={organiGalleries}
                                    // setLike={setLike}
                                    />
                                    <div className="name-block flex-box-row" style={{ marginTop: '23px' }}>
                                          <div className="avatar">
                                                <img src={(organiDetail.image) ? organiDetail.image_url : ''} onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }} alt="avatar" className="image-size" />
                                          </div>
                                          <div className="flex-box-col">
                                                <div className="name">
                                                      <h3 className="nunito-text-xl text-primary-color">
                                                            {
                                                                  chooseBranch ? `${chooseBranch.name}` : `${organiDetail?.name} `
                                                            }
                                                      </h3>
                                                      <Favorites/>

                                                </div>
                                                <div className="rating flex-box-row">
                                                      {/* <div className="result flex-box-row">
                                                            <span className="text-black-color nunito-text-sm ">
                                                                  4.5
                                                            </span>
                                                            <img className="icon" src={img.star} alt="icon yellow star" />
                                                      </div>
                                                      <div className="result flex-box-row">
                                                            <span className="text-black-color nunito-text-sm ">
                                                                  250
                                                            </span>
                                                            <img className="icon" src={img.subtract} alt="comment icon" />
                                                      </div> */}
                                                      {/* <div style={{alignItems:'center'}} className="result flex-box-row">
                                                            <span className="text-black-color nunito-text-sm ">
                                                                  {organiDetail.favorites_count}
                                                            </span>
                                                            <img className="icon" src={img.heart} alt="heart icon" />
                                                      </div> */}
                                                </div>
                                          </div>
                                    </div>
                                    <div className="address-block flex-box-row">
                                          <img className="icon" src={img.mapPin} alt="map pin icon" />
                                          <span
                                                style={{ cursor: 'pointer' }}
                                                onClick={openDialogMapClick}
                                                className="flex-row nunito-text-md text-black-color"
                                          >
                                                {
                                                      chooseBranch ? `${chooseBranch.full_address}` : `${organiDetail?.full_address}`
                                                }
                                                <img
                                                      style={{ transform: 'rotate(270deg)' }}
                                                      className="icon icon-up-map"
                                                      src={img.arrowDownIcon} alt=""
                                                />
                                          </span>
                                    </div>
                                    <TimeOpen
                                          detail={organiDetail}
                                    />
                              </>
                  }
                  <BranchListMap
                        openDialogMap={openDialogMap}
                        setOnDialogMap={setOnDialogMap}
                        organiDetail={organiDetail}
                        imageDefault={imageDefault}
                        branches={branches}
                  />
            </div>
      );
}

export default LocationDetail;