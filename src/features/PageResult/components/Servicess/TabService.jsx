import React, { useState, useEffect, useContext } from 'react';
import ServiceItem from './ServiceItem';
import { CircularProgress } from '@mui/material'
import { card_loading, OnLoad } from '../../../Loading/CartItem';
import servicesApi from '../../../../apis/servicesApi';
import servicesCategory from '../../../../apis/serviceCategoryOrg';
import Error from '../../../Error';
import {AppContext} from '../../../../context/AppProvider';
import PopupFilter from '../Filter/PopupFilter';
import img from '../../../../constants/imageList';
import { useParams } from 'react-router-dom';

const tabName = 'Dịch vụ';
function TabService(props) {
      const { id } = useParams();
      const { org, chooseCateSer, setChooseCateSer, orgSerCate, setOrgSerCate } = useContext(AppContext)
      const [loading, setLoading] = useState(false);
      const [loadCate, setLoadCate] = useState(false)
      const [loadingMore, setLoadingMore] = useState(false);
      const [disableBtn,setDisableBtn] = useState();
      const [cate, setCate] = useState([])
      const [openFilter, setOpenFilter] = useState(false);
      const [chooseSpecialSer, setChooseSpecialSer] = useState(true);
      const [hasSpecial, setHasSpecial] = useState();
      const {
            chooseTab,
            branchList,
            setIsOpen,
            setNewItemCart,
            imageDefault
      } = props;
      const [currentPage, setCurrentPage] = useState(1);
      const [totalSer, setTotalSer] = useState();
      const [services, setServices] = useState([]);
      // Error catch
      const [openError, setOpenError] = useState({
            openOther: false,
            error:'',
      });
      async function handleGetServices() {
            try {
                  if((chooseSpecialSer) && !chooseCateSer ){
                        const res = await servicesApi.getBySpecial({
                              org_id: id,
                              page: currentPage
                        });
                        setServices([...services, ...res.data.context.data])
                        setTotalSer(res.data.context.total) 
                  }
                  else if (!chooseCateSer && !chooseSpecialSer) {
                        const res = await servicesApi.getServicesByOrg({
                              org_id: id,
                              page: currentPage
                        });
                        setServices([...services, ...res.data.context.data])
                        setTotalSer(res.data.context.total)
                  } else if (chooseCateSer) {
                        const res = await servicesApi.getByOrgId_cateId({
                              org_id: id,
                              page: currentPage,
                              cate_id: chooseCateSer
                        });
                        setServices([...services, ...res.data.context.data])
                        setTotalSer(res.data.context.total);
                  }
                  setLoading(false);
                  setLoadingMore(false);
            } catch (err) {
                  //console.log(err)
                  setLoading(false)
                  setOpenError({ openOther:true, error: err })
            }
      }

      useEffect(() => {
            async function handleGetCateByOrg() {
                  setLoadCate(true)
                  try{
                        setLoading(true);
                        const res = await servicesCategory.getByOrg_id({
                              org_id: id
                        })
                        setCate(res.data.context.data);
                        setOrgSerCate(res.data.context.data)
                        setLoading(false);
                        setLoadCate(false)
                  }
                  catch(err){
                        setOpenError({ openOther:true, error: err })
                        setLoadCate(false)
                  }
            }
            if(org?.id === parseInt(id) && orgSerCate){
                  setCate(orgSerCate)
            }else{
                  handleGetCateByOrg()
            }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [id])
      const getSpecialSer = async () => {
            const res =  await servicesApi.getBySpecial({
                  org_id: id,
                  page: currentPage
            })
            if(res.data.context.data.length ===0){
                  setHasSpecial('dataNull')
                  handleViewAll()
                  // console.log('if');
            }
            else{
                  // console.log('else');
                  setServices([...res.data.context.data])
                  setTotalSer(res.data.context.total)
                  setDisableBtn('special');
                  setHasSpecial(true);
                  setCurrentPage(1);
            }
      }
      useEffect(() => {
            // console.log('will mount');
            // console.log(hasSpecial);
            if(!hasSpecial){
                  getSpecialSer();
            }
            else{
                  handleGetServices();
            }
            return () => {

            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentPage,chooseCateSer, id, chooseSpecialSer])


      const handleChooseCate = (item) => {
            if(disableBtn !== item.id){
            setLoading(true)
            setChooseCateSer(item.id);
            setChooseSpecialSer(false);
            setCurrentPage(1);
            setServices([]);
            setDisableBtn(item.id);
            }
      }
      const handleChooseSpecial = () => {
            if(disableBtn !== 'special'){
            setLoading(true)
            setChooseCateSer();
            setChooseSpecialSer(true);
            setCurrentPage(1);
            setServices([]);
            setDisableBtn('special');
            }
      }
      const handleViewAll = () => {
            // console.log('disableBtn',disableBtn);
            if(disableBtn !== 'all'){
                  // console.log('all',disableBtn);
            setLoading(true);
            setChooseCateSer(false);
            setChooseSpecialSer(false);
            setCurrentPage(1);
            setServices([]);
            setDisableBtn('all');
            }
      }
      const viewMoreClick = () => {
            setLoadingMore(true)
            setCurrentPage(currentPage + 1);
      }
      return (
            <>
                  <Error
                        open={openError.openOther}
                        setOpen={setOpenError}
                        error={openError.error}
                  />
                  <div
                        style={chooseTab === tabName ? {} : { display: 'none' }}
                  >
                        <div style={{ backgroundColor: '#FFFFFF' }} className="sticky-box cus-sticky-box" id="scroll-animate">
                              <div
                                    onClick={() => setOpenFilter(true)}
                                    className='ip-filter'
                              >
                                    <img src={img.search} alt="" />
                                    <input disabled={true} className="ip-filter__input" type="text" placeholder='Tìm kiếm tên dịch vụ...' />
                              </div>
                              <div className="list-service-type  owl-carousel owl-theme" id="service-type">
                                    <div className="list-service-type__wrapper">
                                          {
                                                (loadCate === true) ?
                                                      (
                                                            [1, 3, 2, 4].map(index => (
                                                                  <div
                                                                        key={index}
                                                                        style={{ width: '97px' }}
                                                                        className="cate_on_load"
                                                                  >
                                                                        <OnLoad />
                                                                  </div>
                                                            ))
                                                      )
                                                      : (
                                                            <>
                                                                  {(hasSpecial && hasSpecial !== 'dataNull')&&
                                                                  <div
                                                                        style={(!chooseCateSer && chooseSpecialSer) ?
                                                                              {
                                                                                    backgroundColor: 'var(--red)',
                                                                                    color: 'var(--bgWhite)',
                                                                                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.37)'
                                                                              }
                                                                              :
                                                                              { 
                                                                                    backgroundColor: 'var(--red)',
                                                                                    color: 'var(--bgWhite)',
                                                                              }
                                                                        }
                                                                        onClick={handleChooseSpecial}
                                                                        className="item"
                                                                  >
                                                                        Ưu đãi
                                                                  </div>
                                                                  }
                                                                  <div
                                                                        style={(!chooseCateSer && !chooseSpecialSer)?
                                                                              {
                                                                                    backgroundColor: 'var(--purple)',
                                                                                    color: 'var(--bgWhite)',
                                                                                    boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.37)'
                                                                              }
                                                                              :
                                                                              {}
                                                                        }
                                                                        onClick={handleViewAll}
                                                                        className="item"
                                                                  >
                                                                        Tất cả
                                                                  </div>
                                                                  {cate?.map(item => (
                                                                        (item.name && item.services_count > 0) && (
                                                                              <div
                                                                                    style={item.id === chooseCateSer ?
                                                                                          {
                                                                                                backgroundColor: 'var(--purple)',
                                                                                                color: 'var(--bgWhite)',
                                                                                                boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.37)'
                                                                                          }
                                                                                          :
                                                                                          {}
                                                                                    }
                                                                                    onClick={() => handleChooseCate(item)}
                                                                                    key={item.id}
                                                                                    className="item"
                                                                              >
                                                                                    <span>
                                                                                          {item.name}
                                                                                          {/* ({item.services_count}) */}
                                                                                    </span>
                                                                              </div>
                                                                        )
                                                                  ))}
                                                            </>
                                                      )
                                          }
                                    </div>
                              </div>
                        </div>
                        <div className="service-type">
                              {
                                    loading === true ? (
                                          <>
                                                {card_loading()}
                                                {card_loading()}
                                                {card_loading()}
                                                {card_loading()}
                                                {card_loading()}
                                                {card_loading()}
                                                {card_loading()}
                                          </>
                                    )
                                          :
                                          services.map((item, index) => (
                                                <ServiceItem
                                                      key={index}
                                                      service={item}
                                                      setIsOpen={setIsOpen}
                                                      org={org}
                                                      branchList={branchList}
                                                      setNewItemCart={setNewItemCart}
                                                      imageDefault={imageDefault}
                                                />
                                          ))
                              }
                        </div>
                        {
                              totalSer <= services.length ?
                                    <></>
                                    :
                                    <div className="tab-products__btn">
                                          {
                                                loadingMore === true ? <div className="search__loading-spinner"><CircularProgress color="primary" /></div>
                                                      :
                                                      <button
                                                            onClick={viewMoreClick}
                                                      >
                                                            {
                                                                  services.length === 0 ?
                                                                        'Không có dịch vụ nào'
                                                                        :
                                                                        `Xem thêm ${totalSer - services.length} dịch vụ khác`
                                                            }
                                                      </button>
                                          }
                                    </div>
                        }
                  </div>
                  <PopupFilter
                        imageDefault={imageDefault}
                        type={true}
                        org_id={id}
                        openFilter={openFilter}
                        setIsOpen={setIsOpen}
                        setOpenFilter={setOpenFilter}
                        locationId={id}
                        org={org}
                        branchList={branchList}
                        setNewItemCart={setNewItemCart}
                  />
            </>
      );
}

export default TabService;