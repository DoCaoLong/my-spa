import React, { useState} from 'react';
import Error from '../../../Error';
import Slider from 'react-slick';
import img from "../../../../constants/imageList";
function BannerSlider(props) {
      const { 
            // organiDetail,
            organiGalleries } = props;
       // Error catch 
      const [openError, setOpenError] = useState({
            openOther: false,
            error:'',
      });
      // -----------
      const settings = {
            dots: true,
            arrows:false,
            infinite: true,
            centerPadding: '50px',
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
      };
      //console.log('organiGalleries',organiGalleries);
      return (
            <>
            <div className="banner banner-slider">
                  <Slider {...settings}>
                        {
                              organiGalleries?.map((item,index)=>(
                                    <div key={index} className="de-head__img">
                                          <img 
                                                className="banner-img"
                                                src={item?.image_url}
                                                onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} 
                                                alt=""
                                          />
                                    </div>
                              ))
                        }
                  </Slider>
            </div>
            <Error
            open={openError.openOther}
            setOpen={setOpenError}
            error={openError.error}
            />
            </>
      );
}

export default BannerSlider;