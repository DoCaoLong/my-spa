import React, { useCallback, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { CircularProgress, Dialog, Slide } from '@mui/material'
import img, {momo_icon} from "../../constants/imageList";
import organizationApi from "../../apis/organizationApi";
import { useHistory } from 'react-router-dom';
import scrollTop from '../../utils/scrollTop';
//import { AppContext } from '../../context/AppProvider';
import Error from '../Error';

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});

SearchPage.propTypes = {
      openSearchPage: PropTypes.bool,
      setOpenSearchPage: PropTypes.func
};
SearchPage.defaultProps = {
      openSearchPage: false,
      setOpenSearchPage: null
};
function SearchPage(props) {
      const history = useHistory();
      //const {setChooseBranch} = useContext(AppContext);
      const { openSearchPage, setOpenSearchPage } = props;
      const [searchText, setSearchText] = useState('');
      const [search, setSearch] = useState([]);
      // Error catch 
      const [openError, setOpenError] = useState({
            openOther: false,
            error: '',
      });
      const location_user = JSON.parse(sessionStorage.getItem('locationAccept'));
      // -----------
      const [loading, setLoading] = useState(false);
      const handleCloseClick = () => {
            setOpenSearchPage(false);
            setSearch([]);
      };
      const timerId = useRef();
      const debounce = (func) => {
            return function (...args) {
                  const context = this;
                  if (timerId.current) clearTimeout(timerId.current)
                  timerId.current = setTimeout(() => {
                        timerId.current = null;
                        func.apply(context, args)
                  }, 500)
            }
      }
      const handleSearchChange = (e) => {
            const { value } = e.target;
            setSearchText(e.target.value)
            setLoading(true);
            async function handleFetch() {
                  try {

                        const res = await organizationApi.getBySearchValue({
                              keyword: value,
					location: location_user
                        });
                        setSearch(res.data.context.data)
                        setLoading(false);
                  } catch (err) {
                        setOpenError({ openOther: true, error: err })
                  }
            }
            if (value.length === 0) {
                  setSearch([]);
            } else {
                  handleFetch()
            }
      }
      useEffect(() => {
            if (search.length === 0) return setLoading(false);
      }, [search])
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const optimized = useCallback(debounce(handleSearchChange), [])
      const gotoPageDetail = (org) => {
            history.push({
                  pathname: `/Frontend/Momo-layout-detail/${org.id}`,
                  state: org
            });
            scrollTop();
            //console.log(org);
      }
      const gotoPageSearchResult = () => {
            history.push(`/Frontend/Search-result/${searchText}`)
      }
      const handleKeyDown = (event) => {
            if (event.code === "Enter" || event?.nativeEvent.keyCode === 13) {
                  history.push(`/Frontend/Search-result/${searchText}`)
                  scrollTop()
            }
      }
      return (
            <Dialog
                  fullScreen
                  open={openSearchPage}
                  TransitionComponent={Transition}
            >
                  <div className="modal-search" style={{ display: "block" }}>
                        <div className="header-search">
                              <div onClick={handleCloseClick} className="header-cancer">
                                    <img className="header-cancer-img" src={img.xCircleCancer} alt="" />
                              </div>
                              <div className="header-input">
                                    <img className="header-input-img"
                                          src={img.search} alt="" />
                                    <input
                                          onKeyDown={handleKeyDown}
                                          autoFocus={true}
                                          type='text'
                                          name='search'
                                          onChange={optimized}
                                          className="header-input-search"
                                          placeholder="Search..."
                                          autoComplete="off"
                                    />
                              </div>
                        </div>
                        <div className="search-list">
                              {
                                    searchText.length > 0 ?
                                          <div
                                                onClick={gotoPageSearchResult}
                                                className="search-list__view-more"
                                          >
                                                Xem kết quả cho
                                                <span>{searchText}</span>
                                          </div> :
                                          ''
                              }
                              <div className="search-list-content pdt-12">
                                    <h3 className="nunito-text-xl text-primary-color text-Uppercase">
                                          Doanh nghiệp
                                    </h3>
                                    <hr className="purple-line" />
                              </div>
                              <div className="search-list-wrap">
                                    {
                                          loading === true ? <div className="search__loading-spinner"><CircularProgress color="primary" /></div>
                                                :
                                                search?.length === 0 ? '' :
                                                      search?.map(item => (
                                                            <div
                                                                  onClick={() => gotoPageDetail(item)}
                                                                  key={item.id}
                                                                  className="search-list-item">
                                                                  <img className="card-item-img "
                                                                        src={(item.is_momo_ecommerce_enable)?momo_icon:img.building} alt="" />
                                                                  <span className="nunito-text-md card-item-title text-black-color ">
                                                                        {item.name}
                                                                  </span>
                                                            </div>
                                                      ))
                                    }
                              </div>
                              <div className="search-list-content">
                                    <h3 className="nunito-text-xl text-primary-color text-Uppercase">
                                          khu vực
                                    </h3>
                                    <hr className="purple-line" />
                              </div>
                              <div className="search-list-wrap">
                                    {
                                          loading === true ? <div className="search__loading-spinner"><CircularProgress color="primary" /></div>
                                                :
                                                <>
                                                      {
                                                            search?.map(item => (
                                                                  <div
                                                                        key={item.id}
                                                                  >
                                                                        <div
                                                                              onClick={() => gotoPageDetail(item)}
                                                                              className="search-page__org-name"
                                                                        >
                                                                              {item.name}
                                                                        </div>
                                                                        <div
                                                                              onClick={() => gotoPageDetail(item)}
                                                                              className="search-list-item"
                                                                        >
                                                                              <img className="card-item-img "
                                                                                    src={(item.is_momo_ecommerce_enable)?momo_icon:img.building} alt="" />
                                                                              <span className="nunito-text-md card-item-title text-black-color ">
                                                                                    Chi nhánh: {item.full_address}
                                                                              </span>
                                                                        </div>
                                                                        {
                                                                              item?.branches.map(branch => (
                                                                                    <div
                                                                                          onClick={() => gotoPageDetail(item)}
                                                                                          key={branch.id}
                                                                                          className="search-list-item"
                                                                                    >
                                                                                          <img className="card-item-img "
                                                                                                src={(item.is_momo_ecommerce_enable)?momo_icon:img.building} alt="" />
                                                                                          <span className="nunito-text-md card-item-title text-black-color ">
                                                                                                Chi nhánh: {branch.full_address}
                                                                                          </span>
                                                                                    </div>
                                                                              ))
                                                                        }
                                                                  </div>
                                                            ))
                                                      }
                                                </>
                                    }
                              </div>
                        </div>
                  </div>
                  <Error
                        open={openError.openOther}
                        setOpen={setOpenError}
                        error={openError.error}
                  />
            </Dialog>
      );
}

export default SearchPage;