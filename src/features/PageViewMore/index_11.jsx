import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Head from "../../component/HeadTag/default";
import { View_more } from "../../component/Constant/MetaConst";
import img from "../../constants/imageList";
import PageNullResult from "../PageNotResult";
import Header from "../Header/index";
import tagsApi from "../../apis/tagApi";
import { AppContext } from "../../context/AppProvider";
import organizationApi from "../../apis/organizationApi";
import { card_loading } from "../Loading/CartItem";
// import formatNumber from '../../utils/formatPrice';
// import {Box, Slider} from '@mui/material';
import Error from "../Error";

const $ = document.querySelector.bind(document);
const openFilterTag = () => {
  $(".item-list__wrapper").classList.toggle("item-list__wrapper-active");
  // $('.page-result__slider').classList.remove('page-result__slider-active')
};
// const openFilterPrices = () => {
//       $('.page-result__slider').classList.toggle('page-result__slider-active')
//       $('.item-list__wrapper').classList.remove('item-list__wrapper-active')
// }
// function valuetext(value) {
//       return `${value} đ`;
// }
// const tagLists = ['tag 1', 'tag 2', 'tag 3']
const title = "Địa điểm";



function PageViewMore(props) {
  const { code } = useParams();
  const history = useHistory();
  // const [min,max]=[0,5000000];
  const [chooseTag, setChooseTag] = useState("");
  const { tagList, setTagList /*pricesRange*/ } = useContext(AppContext);
  // const [valueSlider, setValuesSlider] = useState([min,max])
  const [organizations, setOrganizations] = useState([]);
  const [tagLists, setTagLists] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [loadingMore, setLoadingMore] = useState(false);

  // Error catch
  const [openError, setOpenError] = useState({
    openOther: false,
    error: "",
  });
  // -----------
  // page
  //const [page, setPage] = useState(1);
  //const [totalItem, setTotalItem] = useState();
  //---
  async function getTags() {
    if (tagLists) {
      try {
        const listTags = await tagsApi.getTags();
        setTagList(listTags.data.context.data);
        setTagLists(listTags.data.context.data);
      } catch (err) {
        setOpenError({ openOther: true, error: err });
      }
    }
    // setTagLists(listTags.data.context.data);
  }
  useEffect(() => {
    //console.log('tagList',tagList);
    tagList && tagList.length === 0
      ? setTimeout(() => getTags(), 3000)
      : setTagLists(tagList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function handleSetOr() {
      setLoading(true);
      try {
        const res = await organizationApi.getOrganizationByProvince_code({
          code,
          page: 1,
          include: "tags|branches",
        });
        //const res = await organizationApi.getBySearchValue(code);
        setOrganizations(res.data.context.data);
        // (res.data.context.current_page)&&setPage(1);
        setLoading(false);
      } catch (err) {
        //console.log(err);
        setOpenError({ openOther: true, error: err });
      }
    }
    handleSetOr();
  }, [code]);
  // useEffect(() => {

  //       return () => {

  //       }
  // }, [valueSlider])
  //handle api
  const values = {
    page: 1,
    province_code: code,
    stringTag: encodeURI(chooseTag),
    include: "tags|branches",
    rangePrices: { min: "", max: "" },
  };
  async function getOrganizationByTag(props) {
    try {
      const res = await organizationApi.getByFilter({
        ...values,
        stringTag: encodeURI(props),
        // rangePrices: { min: valueSlider[0], max: valueSlider[1] }
        rangePrices: { min: null, max: null },
      });
      //console.log(res);
      setOrganizations(res.data.context.data);
    } catch (err) {
      setOpenError({ openOther: true, error: err });
    }
  }
  //end handle api
  //handle choose tag
  const handleChooseTag = (tag) => {
    setChooseTag(tag);
    getOrganizationByTag(tag);
  };
  //end handle choose tag
  //handle range price
  // const handleChangePriceRange=(event, newValue)=>{
  //       setValuesSlider(newValue);
  // }
  // const handleFilterPricesRange=()=>{
  //       getOrganizationByTag();
  //       openFilterPrices();
  // }
  console.log("organizations", organizations);
  return (
    <>
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
              style={{ marginRight: 0 }}
            >
              <span className="nunito-text-sm text-grey-color">Danh mục</span>
              <span className="nunito-text-md text-primary-color">
                {chooseTag.length !== 0 ? chooseTag : "Tất cả"}
              </span>
              <div className="item-list__wrapper">
                <ul>
                  <li
                    style={
                      chooseTag === ""
                        ? { backgroundColor: "#7161ba", color: "#f5f5f7" }
                        : { backgroundColor: "#f5f5f7", color: "#7161ba" }
                    }
                    onClick={() => handleChooseTag("")}
                  >
                    Tất cả
                  </li>
                  {tagLists?.map((item, index) => (
                    <li
                      style={
                        chooseTag === item
                          ? { backgroundColor: "#7161ba", color: "#f5f5f7" }
                          : { backgroundColor: "#f5f5f7", color: "#7161ba" }
                      }
                      onClick={() => handleChooseTag(item.name)}
                      key={index}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <div
                                    onClick={openFilterPrices}
                                    className="item-price"
                              >
                                    <span className="nunito-text-sm text-grey-color">Khoảng giá</span>
                                    <div 
                                          className="item-price-wrap"
                                          style={valueSlider[1]?null:{
                                                justifyContent: 'center'
                                          }}
                                    >
                                          <span className="nunito-text-sm text-primary-color">
                                                {(valueSlider[0])?`${formatNumber(valueSlider[0])}đ`:0}
                                          </span>
                                          {(valueSlider[1]) && <span className="nunito-text-sm text-primary-color">-</span>}
                                          <span className="nunito-text-sm text-primary-color">
                                                {(valueSlider[1])?`${formatNumber(valueSlider[1])}đ`:""}
                                          </span>
                                    </div>
                              </div> */}
            {/* <div className="page-result__slider" >
                                    <Box>
                                          <Slider
                                                min={min}
                                                max={max}
                                                step={100000}
                                                getAriaLabel={() => 'Temperature range'}
                                                value={valueSlider}
                                                onChange={handleChangePriceRange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                          />
                                    </Box>
                                    <div>
                                          <ul>
                                                <li className={(valueSlider[0]===0)?"item active":"item"} onClick={()=> {setValuesSlider([0,1000])}} >0 - 1000đ</li>
                                                <li className={(valueSlider[0]===1000)?"item active":"item"} onClick={()=> {setValuesSlider([1000,3000])}}>1000đ - 3000đ</li>
                                                <li className={(valueSlider[0]===3000)?"item active":"item"} onClick={()=> {setValuesSlider([3000,null])}}> &gt; 3000đ</li>
                                          </ul>
                                    </div>
                                    <button onClick={handleFilterPricesRange}>Lọc khoảng giá</button>
                              </div> */}
          </div>
        </div>
        {loading === true ? (
          <div className="cards-wrap ">
            <div className="card">
              <div className="card-content">
                {card_loading({ notHr: true })}
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                {card_loading({ notHr: true })}
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                {card_loading({ notHr: true })}
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                {card_loading({ notHr: true })}
              </div>
            </div>
            <div className="card">
              <div className="card-content">
                {card_loading({ notHr: true })}
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{ display: "block" }}
            className="cards-wrap cus-cards-wrap"
          >
            <ul>
              {organizations.length === 0 ? (
                <div className="cus-cart_none">
                  <PageNullResult />
                </div>
              ) : (
                organizations.map((item, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      history.push(`/Frontend/Momo-layout-detail/${item.id}`)
                    }
                  >
                    <div className="cus-cards-wrap__item">
                      <img
                        className="wrap__item-avatar"
                        src={item.image ? item.image_url : ""}
                        onError={(e) => {
                          e.target.src = img.logoMyspa;
                          e.target.style.objectFit = "contain";
                          e.target.style.transform = "scale(0.5)";
                        }}
                        alt=""
                      />
                      <div className="cus-cards-wrap__item-right">
                        <span className="item-right__name">{item.name}</span>
                        <div className="rating flex-box-row item-right__range">
                          {/* <div className="result flex-box-row">
                                                                                          <span className="text-black-color nunito-text-sm ">
                                                                                                4
                                                                                          </span>
                                                                                          <img className="icon mg-left-2" src={img.star} alt="icon yellow star" />
                                                                                    </div>
                                                                                    <div className="result flex-box-row pd-left-8">
                                                                                          <span className="text-black-color nunito-text-sm ">
                                                                                                4
                                                                                          </span>
                                                                                          <img className="icon mg-left-2" src={img.subtract} alt="comment icon" />
                                                                                    </div> */}
                        </div>
                        <div className="item-right__catalog">
                          <span>{item.full_address}</span>
                          <div className="item-right__catalog_tags">
                            {item?.tags.length !== 0 && (
                              <img className="icon" src={img.catalog} alt="" />
                            )}
                            {item?.tags?.map((value, index) => (
                              <span key={index}>
                                {value.name}
                                {index + 1 !== item.tags.length && ", "}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="item-right__price">
                          <img className="icon" src={img?.tag} alt="" />
                          <span>290.000 đ</span>
                          <span>(Giá dịch vụ)</span>
                        </div>
                        {item?.branches.length === 0 ? (
                          ""
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              history.push(
                                `/Frontend/View-more-branch/${item.id}`
                              );
                            }}
                            className="item-right__button"
                          >
                            Xem thêm {item.branches.length} cơ sở khác
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
            <div style={{ width: "100%" }} className="tab-products__btn">
              {
                // loadingMore === true ?
                //       <div className="search__loading-spinner"><CircularProgress color="primary" /></div>
                //       :
                //       <button
                //             style={totalItem > organization.length ? { display: 'block' } : { display: 'none' }}
                //             onClick={handleViewMore}
                //       >
                //             {/* Xem thêm {totalItem - organization.length} kết quả khác */}
                //             Xem thêm 15 kết quả khác
                //       </button>
              }
            </div>
          </div>
        )}
      </div>
      <Error
        open={openError.openOther}
        setOpen={setOpenError}
        error={openError.error}
      />
    </>
  );
}

export default PageViewMore;
