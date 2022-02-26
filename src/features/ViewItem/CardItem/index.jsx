import React, { useState } from 'react';
// import formatNumber from '../../../utils/formatPrice';
import img from '../../../constants/imageList';
//import { AppContext } from '../../../context/AppProvider';
import Map from '../../Map/index'

function CartItem(props) {
      //const { setChooseBranch } = useContext(AppContext)
      const {
            dataCard,
            gotoPageDetail,
            isShowMapPin,
            cardStyle,
            imageDefault,
            chooseCard
      } = props;
      const condition = {
            lat: dataCard.latitude,
            long: dataCard.longitude,
      }
      const [openMap, setOpenMap] = useState(false);
      const gotoPageDetailClick = (dataCard) => {
            console.log('dataCard',dataCard);
            if (gotoPageDetail) {
                  gotoPageDetail(dataCard);
            }
            //setChooseBranch();
      }
      const gotoMapPin = () => {
            setOpenMap(true)
      }
      const handlePatch = () => {
            const url = `https://maps.google.com/?q=${dataCard.latitude},${dataCard.longitude}`
            const newWindow = window.open(`${url}`, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null
      }
      const distance = Math.round(dataCard?.distance);
      return (
            <>
                  <Map
                        openMap={openMap}
                        setOpenMap={setOpenMap}
                        condition={condition}

                        dataCard={dataCard}
                        imageDefault={imageDefault}
                        gotoPageDetail={gotoPageDetail}
                        chooseCard={chooseCard}
                  />
                  <div
                        className="card"
                        style={
                              chooseCard === dataCard ?
                                    {
                                          width: cardStyle?.width,
                                          height: cardStyle?.height,
                                          margin: cardStyle?.margin,
                                          boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.31)',
                                    }
                                    :
                                    {
                                          width: cardStyle?.width,
                                          height: cardStyle?.height,
                                          margin: cardStyle?.margin,
                                          boxShadow: cardStyle?.boxShadow,
                                          opacity: 0.9
                                    }
                        }
                  >
                        <div
                              style={isShowMapPin === false ? { display: 'none' } : {}}
                              onClick={() => gotoMapPin(dataCard)}
                              className="card-mappin">
                              <div>
                                    <img
                                          className="card-mappin-img"
                                          src={img.mapPinLocation}
                                          alt=""
                                    />
                              </div>
                        </div>
                        <img
                              style={{
                                    height: cardStyle?.imgHeight,
                                    overflow: cardStyle?.imgOverflow
                              }}
                              src={(dataCard.image) ? dataCard.image_url : imageDefault}
                              onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }}
                              alt=""
                              className="card-image img-height-result"
                              onClick={() => gotoPageDetailClick(dataCard)}
                        />
                        <div
                              className="card-content"
                              onClick={() => gotoPageDetailClick(dataCard)}
                        >
                              <h3
                                    style={
                                          {
                                                fontSize: cardStyle?.titleFontSize,
                                                fontWeight: cardStyle?.titleFontWeight
                                          }
                                    }
                                    className="card-title text-primary-color nunito-bold-text-xl"
                              >
                                    {dataCard?.name}
                              </h3>
                              <div className="card-list">
                                    <div className="card-item">
                                          <img className="card-item-img" src={img.mapPin} alt="" />
                                          <span
                                                style={{
                                                      fontSize: cardStyle?.addressFontSize,
                                                      lineHeight: cardStyle?.addressLineHeight
                                                }}
                                                className="card-item-title nunito-text-md pdt-4"
                                          >
                                                {dataCard.full_address}
                                          </span>
                                    </div>
                              </div>
                              {/* <div className="card-item">
                                    <img className="card-item-img" src={img.tag} alt="" />
                                    <p
                                          style={{
                                                fontSize: cardStyle?.priceFontSize,
                                                lineHeight: cardStyle?.priceLineHeight
                                          }
                                          }
                                          className="card-item-title nunito-text-xl">
                                          {formatNumber(dataCard.min_price)}đ - {formatNumber(dataCard.max_price)}đ
                                          <span
                                                style={{
                                                      fontSize: cardStyle?.addressFontSize,
                                                      lineHeight: cardStyle?.addressLineHeight
                                                }}
                                                className="nunito-text-md"
                                          >
                                                (Giá dịch vụ)
                                          </span>
                                    </p>
                              </div> */}
                              {
                                    isShowMapPin === false ?
                                          <button
                                                onClick={handlePatch}
                                                className='card-map__navi'
                                          >
                                                Chỉ đường{
                                                      distance ?
                                                            <>
                                                                  ({
                                                                        distance < 1000 ?
                                                                              `${distance}m`
                                                                              :
                                                                              `${Math.round(distance / 1000)}km`
                                                                  })
                                                            </>
                                                            :
                                                            ''
                                                }
                                          </button>
                                          :
                                          <></>
                              }
                        </div>
                  </div>
            </>
      );
}

export default CartItem;