import React, { useEffect, useState } from 'react';
import { Slide, Dialog } from '@mui/material';
import img from '../../../../constants/imageList'
import MapWrapper from '../../../Map/components/MapWrapper';
import Slider from "react-slick";
import BranchItemMap from './BranchItemMap'

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="left" ref={ref} {...props} />;
});


// const dataCard = [
//       {
//             id: 1,
//             name: "Dev-KV1",
//             latitude: 10.8197457,
//             longitude: 106.6485302,
//             address: 'Dia chi khu vuc 1',
//             telephone: 'null',
//             image: 'null',
//             origin_id: 2,
//             organization_id: 1,
//             created_at: '2022-01-07 02:37:38',
//             province_code: 'null',
//             district_code: 'null',
//             ward_code: 'null',
//             full_address: '',
//             image_url: 'https://dev_2021.myspa.vn/files/dev_2021/avatar/',
//             ward: 'null',
//             district: 'null',
//             province: 'null'
//       },
//       {
//             id: 2,
//             name: "Dev-KV2",
//             latitude: 10.8990094,
//             longitude: 106.4662581,
//             address: 'Dia chi khu vuc 2',
//             telephone: 'null',
//             image: 'null',
//             origin_id: 2,
//             organization_id: 1,
//             created_at: '2022-01-07 02:37:38',
//             province_code: 'null',
//             district_code: 'null',
//             ward_code: 'null',
//             full_address: '',
//             image_url: 'https://dev_2021.myspa.vn/files/dev_2021/avatar/',
//             ward: 'null',
//             district: 'null',
//             province: 'null'
//       },
//       {
//             id: 3,
//             name: "Cuc phuong",
//             latitude: 20.1736972,
//             longitude: 105.7625299,
//             address: 'Dia chi khu vuc 3',
//             telephone: 'null',
//             image: 'null',
//             origin_id: 2,
//             organization_id: 1,
//             created_at: '2022-01-07 02:37:38',
//             province_code: 'null',
//             district_code: 'null',
//             ward_code: 'null',
//             full_address: '',
//             image_url: 'https://dev_2021.myspa.vn/files/dev_2021/avatar/',
//             ward: 'null',
//             district: 'null',
//             province: 'null'
//       },
//       {
//             id: 4,
//             name: "Cua Dong",
//             latitude: 20.4327394,
//             longitude: 106.1601083,
//             address: 'Dia chi khu vuc 5',
//             telephone: 'null',
//             image: 'null',
//             origin_id: 2,
//             organization_id: 1,
//             created_at: '2022-01-07 02:37:38',
//             province_code: 'null',
//             district_code: 'null',
//             ward_code: 'null',
//             full_address: '',
//             image_url: 'https://dev_2021.myspa.vn/files/dev_2021/avatar/',
//             ward: 'null',
//             district: 'null',
//             province: 'null'
//       }
// ]
const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
function BranchListMap(props) {
      const { openDialogMap, setOnDialogMap, organiDetail, branches } = props;
      const [chooseCard, setChooseCard] = useState(organiDetail)
      const cardList = branches?.concat(organiDetail);
      const cardReverse = cardList?.reverse();
      const settings = {
            responsive: [
                  {
                        breakpoint: 1024,
                        settings: {
                              dots: false,
                              infinite: true,
                              speed: 500,
                              arrows: false,
                              slidesToShow: 1,
                              slidesToScroll: 1,
                              centerPadding: "30px",
                              className: "center",
                              centerMode: true,
                              autoplaySpeed: 5000,
                              afterChange: function (index) {
                                    setChooseCard(cardReverse[index]);
                              },
                        },
                  },
                  {
                        breakpoint: 767,
                        settings: {
                              dots: false,
                              infinite: true,
                              speed: 500,
                              arrows: false,
                              slidesToShow: 1,
                              slidesToScroll: 1,
                              centerPadding: "30px",
                              className: "center",
                              centerMode: true,
                              autoplaySpeed: 5000,
                              afterChange: function (index) {
                                    setChooseCard(cardReverse[index]);
                              },
                        },
                  },
            ],
      }
      useEffect(() => {
            if (openDialogMap === true) {
                  setChooseCard(cardReverse[0])
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [organiDetail, openDialogMap])
      return (
            <div>
                  <Dialog
                        fullScreen
                        open={openDialogMap}
                        TransitionComponent={Transition}
                  >
                        <div className="cus-header__org-branch-map">
                              <button
                                    onClick={() => setOnDialogMap(false)}
                                    className="cus-header__back-btn"
                              >
                                    <img src={img.chevronLeft} alt="" />
                              </button>
                        </div>
                        <div className="organization-map">
                              <MapWrapper
                                    listMarker={cardReverse}
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    zoom={12}
                                    lat={chooseCard ? chooseCard.latitude : cardReverse[0]?.latitude}
                                    lng={chooseCard ? chooseCard.longitude : cardReverse[0]?.longitude}
                                    containerElement={
                                          <div
                                                style={{
                                                      height: `100vh`,
                                                      margin: `auto`,
                                                      width: `100%`,
                                                }}
                                          />
                                    }
                                    mapElement={<div style={{ height: `100%` }} />}
                              />
                              <div className="card-list__map">
                                    <ul
                                          className=''
                                    >
                                          <Slider
                                                {...settings}
                                          >
                                                {
                                                      cardReverse?.map((item, index) => (
                                                            <BranchItemMap
                                                                  key={index}
                                                                  dataCard={item}
                                                                  imageDefault={(item.image) ? item.image_url : ''}
                                                            />
                                                      ))
                                                }
                                          </Slider>
                                    </ul>
                              </div>
                        </div>
                  </Dialog>
            </div>
      );
}

export default BranchListMap;