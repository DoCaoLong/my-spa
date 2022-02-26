import React, { useState, useContext } from 'react';
import img from '../../../constants/imageList';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../context/AppProvider';
import useSearchTerm from '../../../utils/useSearchTerm';
import capitalizeFirstLetter from '../../../utils/formatTag';
import Error from '../../Error';
import scrollTop from '../../../utils/scrollTop'

const $ = document.querySelector.bind(document);
function openLocation() {
      $('.home-filter-location__drop').classList.toggle('home-filter-drop-active')
      $('.home-filter-category-wrapper').classList.remove('home-filter-drop-active')
      $('.home-filter-price__drop').classList.remove('home-filter-drop-active')
      $('.home-top-button').classList.remove('home-top-button-mt-64px')
}
const openFilterCategory = () => {
      $('.home-filter-category-wrapper').classList.toggle('home-filter-drop-active')
      $('.home-filter-price__drop').classList.remove('home-filter-drop-active')
      $('.home-filter-location__drop').classList.remove('home-filter-drop-active')
      $('.home-top-button').classList.remove('home-top-button-mt-64px')
}
const openFilterLocation = () => {
      openLocation();
}
const openFilterPrice = () => {
      $('.home-filter-price__drop').classList.toggle('home-filter-drop-active')
      $('.home-filter-category-wrapper').classList.remove('home-filter-drop-active')
      $('.home-filter-location__drop').classList.remove('home-filter-drop-active')
      $('.home-top-button').classList.toggle('home-top-button-mt-64px')
}

function HomeFilter(props) {
      const history = useHistory();
      const [chooseList, setChooseList] = useState([]);
      const { listRangePrice, tags, provinces } = useContext(AppContext);
      const [chooseLocation, setChooseLocation] = useState('')
      const [choosePrices, setChoosePrice] = useState();
      const [openError, setOpenError] = useState({
            openOther: false,
            error: '',
      });
      const [search, setSearch] = useState('')
      const handleChoose = (category) => {
            setChooseList(prev => {
                  const isChoose = chooseList.includes(category)
                  if (isChoose) {
                        return chooseList.filter(item => item !== category)
                  } else {
                        return [...prev, category]
                  }
            })
      }
      const handleChooseLocation = (location) => {
            setChooseLocation(location);
            openLocation();
      }
      const handleChoosePrice = (item) => {
            setChoosePrice(item);
      }
      const handleFilterClick = () => {
            const params = {
                  category: chooseList,
                  provinces_code: chooseLocation ? chooseLocation.province_code : '',
                  prices: choosePrices ?
                        { min_price: choosePrices.min_price, max_price: choosePrices.max_price }
                        :
                        { min_price: '', max_price: '' },
                  tags: tags.map(item => item.name)
            }
            history.push({
                  pathname: `/Frontend/Filter-result`,
                  state: params
            });
            scrollTop()
      }
      //handle search term
      const onChangeInputSearch = (e) => {
            e.preventDefault();
            setSearch(e.target.value);
      }
      // const provincesOrgCount = provinces.filter((item) => item.organizations_count > 0);
      //console.log(provincesOrgCount)
      const searchList = useSearchTerm(search, provinces)
      return (
            <div className="home-filter">
                  <div className="home-filter-category">
                        <div onClick={openFilterCategory} className="home-filter__head">
                              <span className="home-filter__title">Danh mục</span>
                              <div className="home-filter__display">
                                    <span>
                                          {
                                                chooseList.length === 0 ? 'Tất cả' :
                                                      <ul className="home-filter__choose">
                                                            {
                                                                  chooseList.map((item, index) => (
                                                                        <li key={index}>{item},</li>
                                                                  ))
                                                            }
                                                      </ul>
                                          }
                                    </span>
                                    <img className="filer-arrow-category" src={img.arrowDownIcon} alt="" />
                              </div>
                        </div>
                        <div className="home-filter-category-wrapper">
                              <ul className="home-filter-category__drop">
                                    {
                                          tags.map(item => (
                                                <li key={item.id}
                                                      className="home-filter-category__drop-item">
                                                      <button
                                                            style={
                                                                  chooseList.includes(item.name) === true ?
                                                                        //chooseCategory === item ?
                                                                        { backgroundColor: '#7161ba', color: '#f5f5f7' }
                                                                        :
                                                                        { backgroundColor: '#f5f5f7', color: '#7161ba' }
                                                            }
                                                            onClick={() => handleChoose(item.name)}
                                                      >
                                                            {capitalizeFirstLetter(item.name)}
                                                      </button>
                                                </li>
                                          ))
                                    }
                              </ul>
                        </div>
                  </div>
                  <div className="home-filter-location">
                        <div onClick={openFilterLocation} className="home-filter__head">
                              <span className="home-filter__title">Vị trí</span>
                              <div className="home-filter__display">
                                    <span>
                                          {
                                                chooseLocation ? `${chooseLocation.name}` : 'Tất cả'
                                          }
                                    </span>
                                    <img className="filer-arrow-location" src={img.arrowDownIcon} alt="" />
                              </div>
                        </div>
                        <div className="home-filter-location-wrapper">
                              <ul className="home-filter-location__drop">
                                    <input
                                          onChange={onChangeInputSearch}
                                          value={search}
                                          type="text"
                                          className="home-filter-location__drop-search"
                                          placeholder="Tìm kiếm khu vực..."
                                    />
                                    {
                                          searchList?.map((item, index) => (
                                                <li key={index}>
                                                      <button
                                                            style={
                                                                  chooseLocation === item ?
                                                                        { backgroundColor: '#7161ba', color: '#f5f5f7' }
                                                                        :
                                                                        { backgroundColor: '#f5f5f7', color: '#7161ba' }
                                                            }
                                                            onClick={() => handleChooseLocation(item)}
                                                      >
                                                            {item.name}
                                                      </button>
                                                </li>
                                          ))
                                    }
                              </ul>
                        </div>
                  </div>
                  <div onClick={openFilterPrice} className="home-filter-price">
                        <div className="home-filter__head">
                              <span className="home-filter__title">Khoảng giá</span>
                              <div className="home-filter__display">
                                    <span>
                                          {
                                                choosePrices ? choosePrices.title : 'Tất cả'
                                          }
                                    </span>
                                    <img className="filer-arrow-price" src={img.arrowDownIcon} alt="" />
                              </div>
                        </div>
                        <div className="home-filter-price-wrapper">
                              <div className="home-filter-price__drop">
                                    <div className="range-price__wrap">
                                          {
                                                listRangePrice.map(item => (
                                                      <li
                                                            className='range-price__item'
                                                            key={item.id}
                                                      >
                                                            <button
                                                                  style={
                                                                        choosePrices === item ?
                                                                              { backgroundColor: '#7161ba', color: '#f5f5f7' }
                                                                              :
                                                                              { backgroundColor: '#f5f5f7', color: '#7161ba' }
                                                                  }
                                                                  onClick={() => handleChoosePrice(item)}
                                                            >
                                                                  {item.title}
                                                            </button>
                                                      </li>
                                                ))
                                          }
                                    </div>
                              </div>
                        </div>
                        <div className="home-filter-price-wrapper">

                        </div>
                  </div>
                  <button onClick={handleFilterClick} type="button" className="home-top-button cus-home-top-button">Tìm kiếm</button>
                  <Error
                        open={openError.openOther}
                        setOpen={setOpenError}
                        error={openError.error}
                  />
            </div>
      );
}

export default HomeFilter;