import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { View_more } from "../../component/Constant/MetaConst";
import Head from "../../component/HeadTag/default";
import Header from "../Header/index";
import Error from "../Error";
import { AppContext } from "../../context/AppProvider";
import img from "../../constants/imageList";
import organizationApi from "../../apis/organizationApi";
import scrollTop from "../../utils/scrollTop";
import { CircularProgress } from '@mui/material';
import capitalizeFirstLetter from '../../utils/formatTag';
import CartItemResult from '../PageFilterHome/components/CartItemResult';
import Map from "../Map";


//import PageNullResult from "../PageNotResult";
//import { card_loading } from "../Loading/CartItem";
//import HomeBotSection from "../Home/components/HomeBotSection";

const $ = document.querySelector.bind(document);

const openFilterTag = () => {
  $(".item-list__wrapper").classList.add("item-list__wrapper-active");
  $(".backDropLayer").classList.add("active");
  // $('.page-result__slider').classList.remove('page-result__slider-active')
};
const closeFilterTag = () => {
  $(".item-list__wrapper").classList.remove("item-list__wrapper-active");
  $(".backDropLayer").classList.remove("active");
}

function openFilterPrice() {
  $(".item-list__wrapper-price").classList.toggle('item-list__wrapper-price_ac')
}


export default function PageViewMore() {
  const history = useHistory();
  const title = "Địa điểm";
  const { code } = useParams();
  const { tags, listRangePrice } = useContext(AppContext);
  const [chooseTag, setChooseTag] = useState([]);
  const [choosePrice, setChoosePrice] = useState()
  const [openMap, setOpenMap] = useState(false)
  const [data, setData] = useState({
    page: 1,
    lastPage: 1,
    orgs: [],
    more: true
  })
  const location_user = JSON.parse(sessionStorage.getItem('locationAccept'));
  const [openError, setOpenError] = useState({
    openOther: false,
    error: "",
  });
  async function handleGetOrg() {
    try {
      const res = await organizationApi.getByFilter({
        province_code: code,
        page: data.page,
        stringTag: chooseTag.join('|'),
        limit: 15,
        include: "tags|branches",
        rangePrices: choosePrice ?
          { min: choosePrice.min_price, max: choosePrice.max_price }
          :
          { min: '', max: '' },
        location_user: location_user ? {
          lat: location_user.lat,
          long: location_user.long
        }
          :
          {
            lat: '', long: ''
          }
      })
      setData({
        ...data,
        orgs: [...data.orgs, ...res.data.context.data],
        lastPage: res.data.context.last_page,
        more: false
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleChooseTag = (tag) => {
    setData({
      orgs: [],
      lastPage: 1,
      more: true,
      page: 1
    })
    setChooseTag(prev => {
      const isChoose = chooseTag.includes(tag)
      if (isChoose) {
        return chooseTag.filter(item => item !== tag)
      } else {
        return [...prev, tag]
      }
    })
  }

  const handleChoosePrice = (price) => {
    setData({
      orgs: [],
      lastPage: 1,
      more: true,
      page: 1
    })
    setChoosePrice(price)
  }

  const onChooseAll = () => {
    setChooseTag([])
    setData({
      orgs: [],
      lastPage: 1,
      more: true,
      page: 1
    })
  }
  useEffect(() => {
    handleGetOrg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.page, chooseTag, choosePrice])

  const onViewMore = () => {
    setData({ ...data, page: data.page + 1, more: true })
  }
  const gotoPageDetail = (org) => {
    history.push({
      pathname: `/Frontend/Momo-layout-detail/${org.id}`,
      state: org,
      search: `View-more-branch/${org.id}`
    });
    scrollTop();
  }
  return (
    <>
      <Map
        openMap={openMap}
        setOpenMap={setOpenMap}
        organization={data.orgs}
        gotoPageDetail={gotoPageDetail}
      />
      <div className="page-result">
        <Head
          Title={View_more.title}
          Description={View_more.description}
        ></Head>
        <Header headerTitle={title} />
        <div className="infor-result-section page-title bg-dark-blue-color cus-infor-result-section">
          <div className="wrap-items cus-wrap-items">
            <div
              onClick={openFilterTag}
              className="item-list"
              style={{ 
                marginRight: 0 ,
                width: 'calc((100% / 2) - 5px)'
              }}
            >
              <span className="nunito-text-sm text-grey-color">Danh mục</span>
              <span className="nunito-text-md text-primary-color">
                {chooseTag.length !== 0 ? chooseTag.join() : 'Tất cả'}
              </span>
              <div className="item-list__wrapper">
                <ul>
                  <li
                    style={
                      chooseTag.length === 0 ?
                        { backgroundColor: "#7161ba", color: "#f5f5f7" }
                        :
                        { backgroundColor: '#f5f5f7', color: '#7161ba' }
                    }
                    onClick={onChooseAll}
                  >
                    Tất cả
                  </li>
                  {
                    tags?.map((item, index) => (
                      <li
                        style={
                          chooseTag.includes(item.name) ?
                            { backgroundColor: '#7161ba', color: '#f5f5f7' }
                            :
                            { backgroundColor: "#f5f5f7", color: "#7161ba" }
                        }
                        onClick={() => handleChooseTag(item.name)}
                        key={index}
                      >
                        {capitalizeFirstLetter(item.name)}
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div
              className="backDropLayer"
              onClick={() => closeFilterTag()}
            ></div>
            <div
              className="item-list"
              style={{ 
                marginRight: 0,
                width: 'calc((100% / 2) - 5px)'
               }}
              onClick={() => openFilterPrice()}
            >
              <span className="nunito-text-sm text-grey-color">Khoảng giá</span>
              <span className="nunito-text-md text-primary-color">
                {choosePrice ? choosePrice.title : 'Tất cả'}
              </span>
              <div className="item-list__wrapper item-list__wrapper-price">
                <ul>
                  {
                    listRangePrice?.map((item, index) => (
                      <li
                        style={
                          choosePrice === item ?
                            { backgroundColor: '#7161ba', color: '#f5f5f7' }
                            :
                            { backgroundColor: "#f5f5f7", color: "#7161ba" }
                        }
                        onClick={() => handleChoosePrice(item)}
                        key={index}
                      >
                        {capitalizeFirstLetter(item.title)}
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div id="infinity_load" style={{ display: "block" }}>
          <ul>
            {data.orgs?.map((item, index) => (
              <CartItemResult
                setOpenMap={setOpenMap}
                key={index}
                dataCard={item}
                imageDefault={(item.image) ? item.image_url : img.logoMyspa}
                gotoPageDetail={gotoPageDetail}
              />
            ))}
          </ul>
          <div style={{ width: "100%" }} className="tab-products__btn">
            {
              data.more === true ?
                <div className="search__loading-spinner"><CircularProgress color="primary" /></div>
                :
                <button
                  style={data.page === data.lastPage ? { display: 'none' } : { display: 'block' }}
                  onClick={onViewMore}
                >
                  Xem thêm
                </button>
            }
          </div>
        </div>
      </div>
      <Error
        open={openError.openOther}
        setOpen={setOpenError}
        error={openError.error}
      />
    </>
  );
}
