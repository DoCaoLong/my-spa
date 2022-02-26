import React, { useEffect, useState } from "react";
import MapWrapper from "./components/MapWrapper";
import Head from "../../component/HeadTag/default";
import { Google_map } from "../../component/Constant/MetaConst";
import img from '../../constants/imageList';
import { Dialog, Slide } from '@mui/material'
import Slider from "react-slick"
import CardItemMap from './components/CardItemMap'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
function Map(props) {
  const { openMap,
          setOpenMap,
          organization,
        } = props;
  const [chooseCard, setChooseCard] = useState(organization[0]);
  useEffect(()=>{
    setChooseCard(organization[0])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[organization])
  const key = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const settings = {
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          //infinite: true,
          speed: 500,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "30px",
          className: "center",
          centerMode: true,
          afterChange: function (index) {
            setChooseCard(organization[index]);
          },
        },
      },
      {
        breakpoint: 767,
        settings: {
          dots: false,
          //infinite: true,
          speed: 500,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "30px",
          className: "center",
          centerMode: true,
          afterChange: function (index) {
            setChooseCard(organization[index]);
          },
        },
      },
    ],
  }
  return (
    <Dialog
      fullScreen
      open={openMap}
      TransitionComponent={Transition}
    >
      <div>
        <Head
          Title={Google_map.title}
          Description={Google_map.description}
        ></Head>
        <div className="map-header">
          <button
            onClick={() => setOpenMap(false)}
          >
            <img src={img.chevronLeft} alt="" />
          </button>
        </div>
        <MapWrapper
          listMarker={organization}

          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}`}
          loadingElement={<div style={{ height: `100%` }} />}
          zoom={14}
          lat={chooseCard?.latitude}
          lng={chooseCard?.longitude}
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
                organization.map((item, index) => (
                  <CardItemMap
                    key={index}
                    dataCard={item}
                    imageDefault={(item.image)?item.image_url:''}
                  />
                ))
              }
            </Slider>
          </ul>
        </div>
      </div>
    </Dialog>
  );
}

export default Map;
