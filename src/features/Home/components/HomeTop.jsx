import React, { useContext, useState } from "react";
import img from "../../../constants/imageList";
import { banner_default } from "../../../constants/imageList";
import SearchPage from "../../SearchPage";
import HomeFilter from "./HomeFilter";
import HomePopupBanner from "./HomePopupBanner";
import Slider from "react-slick";
import { useHistory } from "react-router";
import { AppContext } from "../../../context/AppProvider";
function HomeTop(props) {
  const { setFilterValues, provinces } = props;
  const { listBanner } = useContext(AppContext);
  const history = useHistory();
  const [openSearchPage, setOpenSearchPage] = useState(false);
  const handleOpenSearchPage = () => {
    setOpenSearchPage(true);
  };
  const [chooseBanner, setChooseBanner] = useState();
  const [open, setOpen] = useState(false);
  const banner = [
    {
      url: banner_default,
    },
  ];
  // const promotions = [
  //       {
  //             url: promotion.AnMien,
  //             href: '/Frontend/Momo-layout-detail/75'
  //       },
  //       {
  //             url: promotion.Dolly,
  //             href: '/Frontend/Momo-layout-detail/179'
  //       },
  //       {
  //             url: promotion.KANatalyBeauty,
  //             href: '/Frontend/Momo-layout-detail/689'
  //       }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
//     centerPadding: "30px",
    className: "center",
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 5000,
    // fade: true,
    afterChange: function (index) {
      setChooseBanner(listBanner[index - 1]);
    },
  };
      // const promotions = [
      //       {
      //             url: promotion.AnMien,
      //             href: '/Frontend/Momo-layout-detail/75'
      //       },
      //       {
      //             url: promotion.Dolly,
      //             href: '/Frontend/Momo-layout-detail/179'
      //       },
      //       {
      //             url: promotion.KANatalyBeauty,
      //             href: '/Frontend/Momo-layout-detail/689'
      //       }
      // ]
      const handleClick = () => {
            //     console.log(url?.href);
            //(url)&&history.push(url.href);
            if (chooseBanner) {
                  switch (chooseBanner.type) {
                        case 'VIDEO':
                              return setOpen(true)
                        case 'HTML':
                              return setOpen(true)
                        case 'WEB':
                              return console.log('WEB')
                        case 'PROMOTION':
                              return console.log('PROMOTION')
                        case 'ORGANIZATION':
                              return history.push(`/Frontend/Momo-layout-detail/${chooseBanner.origin_id}`)
                        default:
                              break;
                  }
            }
      }
  return (
    <div className="home-top">
      <Slider {...settings}>
        {banner.map((item, index) => (
          <div key={index + item.url} className="home-top-img">
            <img
              className="img-banner"
              src={item.url}
              onError={(e) => {
                e.target.src = img.logoMyspa;
                e.target.style.objectFit = "contain";
                e.target.style.transform = "scale(0.5)";
              }}
              alt=""
            />
          </div>
        ))}
        {listBanner.map((item, index) => (
          <div
            key={index + item.url}
            className="home-top-img"
            onClick={handleClick}
          >
            <img
              className="img-banner"
              src={item.imageURL}
              onError={(e) => {
                e.target.src = img.logoMyspa;
                e.target.style.objectFit = "contain";
                e.target.style.transform = "scale(0.5)";
              }}
              alt=""
            />
          </div>
        ))}
      </Slider>
      <HomePopupBanner data={chooseBanner} open={open} setOpen={setOpen} />
      <h1 className="home-top-desc">
        Khám phá trải nghiệm thiên đường làm đẹp ngay gần bạn
      </h1>
      <div className="home-top-search">
        <div onClick={handleOpenSearchPage} className="input-container">
          <img className="icon" src={img.search} alt="" />
          <input
            className="input-search"
            type="text"
            placeholder="Nhập tên hoặc vị trí cơ sở làm đẹp"
            name=""
            disabled={true}
          />
        </div>
        <HomeFilter setFilterValues={setFilterValues} provinces={provinces} />
      </div>
      <SearchPage
        openSearchPage={openSearchPage}
        setOpenSearchPage={setOpenSearchPage}
      />
    </div>
  );
}

export default HomeTop;
