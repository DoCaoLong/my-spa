import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Slide, Dialog } from '@mui/material'
import img from '../../../../constants/imageList'
import productsApi from '../../../../apis/productsApi';
import servicesApi from '../../../../apis/servicesApi';
import ProductItem from '../Products/ProductItem';
import ServiceItem from '../Servicess/ServiceItem';
import Error from '../../../Error';
import { CircularProgress } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});

function PopupFilter(props) {
      const {
            openFilter,
            setOpenFilter,
            org_id,
            type,
            branchList,
            setIsOpen,
            org,
            setNewItemCart,
            imageDefault
      } = props;
      const [list, setList] = useState([]);
      const [searchText, setSearchText] = useState('');
      const [loading, setLoading] = useState(false);
      const [openError, setOpenError] = useState({
            openOther: false,
            error:'',
      });
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

      const handleOnChange = (e) => {
            const { value } = e.target;
            setSearchText(e.target.value);
            setLoading(true)
            async function handleFilterByKey() {
                  try{
                        if (type === false) {
                              const res = await productsApi.getBySearch({
                                    org_id: org_id,
                                    searchKey: value
                              })
                              setList(res.data.context.data);
                              setLoading(false)
                        } else {
                              const res = await servicesApi.getBySearch({
                                    org_id: org_id,
                                    searchKey: value
                              })
                              setList(res.data.context.data);
                              setLoading(false)
                              console.log(res)
                        }
                  }
                  catch(err){
                        setOpenError({ openOther:true, error: err })
                  }
            }
            if (value.length > 0) {
                  handleFilterByKey();
            }
      }

      useEffect(() => {
            if (searchText.length === 0){
                  setList([])
                  setLoading(false)
            }
      }, [searchText.length])
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const optimized = useCallback(debounce(handleOnChange), [])
      const handleClos = () => {
            setList([]);
            setOpenFilter(false);
      }
      return (
            <Dialog
                  open={openFilter}
                  fullScreen
                  TransitionComponent={Transition}
            >
                  <div className="org_de_filter">
                        <div className="flex-row-sp head">
                              <div
                                    className='ip-filter'
                              >
                                    <img src={img.search} alt="" />
                                    <input
                                          autoFocus={true}
                                          onChange={optimized}
                                          className="ip-filter__input"
                                          type="text"
                                          placeholder={`Tìm kiếm tên ${type === true ? 'dịch vụ' : 'sản phẩm'}...`}
                                    />
                              </div>
                              <img
                                    onClick={handleClos}
                                    src={img.closeCircle} alt=""
                              />
                        </div>
                        <div className="service-type__wrap">
                              <div className="service-type">
                                    {
                                          loading === true ?
                                                <div className="search__loading-spinner">
                                                      <CircularProgress color="primary" />
                                                </div>
                                                :
                                                type === true ?
                                                      list.map((item, index) => (
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
                                                      :
                                                      list.map((item, index) => (
                                                            <ProductItem
                                                                  key={index}
                                                                  product={item}
                                                                  setIsOpen={setIsOpen}
                                                                  org={org}
                                                                  branchList={branchList}
                                                                  setNewItemCart={setNewItemCart}
                                                                  imageDefault={imageDefault}
                                                            />
                                                      ))
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

export default PopupFilter;