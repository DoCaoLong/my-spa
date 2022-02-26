import React, { useEffect, useState, useMemo } from 'react';
import organizationApi from '../../apis/organizationApi';
import Header from '../Header/index';
import PageNullResult from '../PageNotResult/index'
import { useHistory } from 'react-router-dom';
import scrollTop from '../../utils/scrollTop';
import { OnLoad } from '../Loading/CartItem';
import img from "../../constants/imageList";
import { CircularProgress } from '@mui/material';
import Error from '../Error';
import { useLocation } from 'react-router-dom'
import capitalizeFirstLetter from '../../utils/formatTag';
import CartItemResult from './components/CartItemResult';
import Map from '../Map';

const $ = document.querySelector.bind(document);
const openFilterTag = () => {
      $('.item-list__wrapper').classList.toggle('item-list__wrapper-active')
      $('.page-result__slider').classList.remove('page-result__slider-active')
}

const headerTitle = "Kết quả tìm kiếm";

function PageFilterHome(props) {
      const location = useLocation();
      const params = location.state;
      const history = useHistory();
      const [openMap, setOpenMap] = useState(false);
      const location_user = JSON.parse(sessionStorage.getItem('locationAccept'));
      const [chooseTag, setChooseTag] = useState([]);
      //Error catch
      const [openError, setOpenError] = useState({
            openOther: false,
            error: '',
      });
      const [data, setData] = useState({
            orgs: [],
            page: 1,
            last_page: 1,
            loadMore: false,
            load: false
      })

      const values = useMemo(() => ({
            stringTag: params?.category.join('|'),
            rangePrices: params?.prices,
            province_code: params?.provinces_code,
            include: "tags|branches",
      }), [params.category, params.prices, params.provinces_code])

      async function handleGetOrg() {
            if (data.page > 1) {
                  setData({ ...data, loadMore: true })
            } else if (data.page === 1) {
                  setData({ ...data, load: true })
            }
            try {
                  const res = await organizationApi.getByFilter({
                        province_code: values.province_code,
                        page: data.page,
                        stringTag: chooseTag.length > 0 ? chooseTag.join('|') : values.stringTag,
                        limit: 15,
                        include: "tags|branches",
                        rangePrices: { min: values.rangePrices.min_price, max: values.rangePrices.max_price },
                        location_user: location_user
                  })
                  setData({
                        ...data,
                        orgs: [...data.orgs, ...res.data.context.data],
                        last_page: res.data.context.last_page,
                        loadMore: false,
                        load: false
                  })
            } catch (error) {
                  setData({ ...data, loadMore: false, load: false })
                  console.log(error)
            }
      }
      useEffect(() => {
            handleGetOrg()
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data.page, chooseTag])
      const onViewMore = () => {
            setData({
                  ...data,
                  page: data.page + 1,
                  loadMore: true
            })
      }

      const handleListTag = (tag) => {
            setData({
                  ...data,
                  orgs: [],
                  last_page: 1,
                  page: 1,
                  load: true
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
      const gotoPageDetail = (org) => {
            history.push({
                  pathname: `/Frontend/Momo-layout-detail/${org.id}`,
                  state: org
            })
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
                        <Header
                              headerTitle={headerTitle}
                        />
                        <div className="infor-result-section page-title bg-dark-blue-color cus-infor-result-section">
                              <div className="wrap-items cus-wrap-items">
                                    <div
                                          onClick={openFilterTag}
                                          className="item-list"
                                          style={{
                                                marginRight: 0
                                          }}
                                    >
                                          <span className="nunito-text-sm text-grey-color">Danh mục</span>
                                          <span className="nunito-text-md text-primary-color">
                                                {chooseTag ? chooseTag.join(',') : 'Tất cả'}
                                          </span>
                                          <div className="item-list__wrapper">
                                                <ul>
                                                      {
                                                            params.category.length > 0 ?
                                                                  params.category?.map((item, index) => (
                                                                        <li
                                                                              style={
                                                                                    chooseTag.includes(item) ?
                                                                                          { backgroundColor: '#7161ba', color: '#f5f5f7' }
                                                                                          :
                                                                                          { backgroundColor: '#f5f5f7', color: '#7161ba' }
                                                                              }
                                                                              onClick={() => handleListTag(item)}
                                                                              key={index}
                                                                        >
                                                                              {capitalizeFirstLetter(item)}
                                                                        </li>
                                                                  ))
                                                                  :
                                                                  params.tags?.map((item, index) => (
                                                                        <li
                                                                              style={
                                                                                    chooseTag.includes(item) ?
                                                                                          { backgroundColor: '#7161ba', color: '#f5f5f7' }
                                                                                          :
                                                                                          { backgroundColor: '#f5f5f7', color: '#7161ba' }
                                                                              }
                                                                              onClick={() => handleListTag(item)}
                                                                              key={index}
                                                                        >
                                                                              {capitalizeFirstLetter(item)}
                                                                        </li>
                                                                  ))
                                                      }
                                                </ul>
                                          </div>
                                    </div>
                              </div>
                              <div className="page-result__slider">
                              </div>
                        </div>
                        <div className="">
                              {
                                    data.load === true ?
                                          (
                                                [1, 2, 3, 4].map(index => (
                                                      <div
                                                            key={index}
                                                            className="card"
                                                      >
                                                            <div
                                                                  className="card-image img-height-result"
                                                                  style={{ padding: '10px 15px' }}
                                                            >
                                                                  <OnLoad />
                                                            </div>
                                                            <div
                                                                  className="card-content"
                                                            >
                                                                  <OnLoad />
                                                                  <br />
                                                                  <OnLoad />
                                                            </div>
                                                      </div>
                                                ))
                                          )
                                          :
                                          data.orgs.length === 0 ?
                                                <div className="cus-cart_none">
                                                      <PageNullResult
                                                            title={'Không tìm thấy \n kết quả phù hợp'}
                                                            text={'Thành thật xin lỗi, chúng tôi không tìm thấy \n cơ sở làm đẹp phù hợp với tùy chọn của bạn.\n Hãy thử tìm kiếm tùy chọn khác nhé!'}
                                                      />
                                                </div>
                                                :
                                                data.orgs?.map((item, index) => (
                                                      <CartItemResult
                                                            setOpenMap={setOpenMap}
                                                            key={index}
                                                            dataCard={item}
                                                            imageDefault={(item.image) ? item.image_url : img.logoMyspa}
                                                            gotoPageDetail={gotoPageDetail}
                                                      />
                                                ))
                              }
                              <div style={{ width: '100%' }} className="tab-products__btn">
                                    {
                                          data.loadMore === true ?
                                                <div className="search__loading-spinner"><CircularProgress color="primary" /></div>
                                                :
                                                <button
                                                      style={data.page === data.last_page ? { display: 'none' } : { display: 'block' }}
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

export default PageFilterHome;