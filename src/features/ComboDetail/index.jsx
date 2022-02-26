import React, { useEffect, useState } from 'react';
import Header from '../Header/index';
import comboApi from '../../apis/comboApi';
import organizationApi from '../../apis/organizationApi';
import DetailHead from './components/DetailHead';
import DetailBody from './components/DetailBody';
import DetailBot from './components/DetailBot'
import {CircularProgress} from '@mui/material';
import PopUp from '../PageResult/components/PopUpNotification'
import {useLocation} from 'react-router-dom'
import Error from '../Error';
import {useSelector} from 'react-redux'

function ComboDetail(props) {
      const location = useLocation()
      //const [detail, setDetail] = useState({})
      const carts = useSelector((state) => state.carts);
      const orgNameCart = carts.cartItems[0]?.org_name
      const [data, setData] = useState({
            org:{},
            combo:{}
      })
      const [old_price, setOld_price] = useState(0);
      const [sale_price, setSale_price] = useState(0);
      const [loading, setLoading] = useState(false)
      const [popup, setPopup] = useState(false);
      const [newItemCart, setNewItemCart] = useState()
      const [openError, setOpenError] = useState({
            openOther: false,
            error:'',
      });
      const params = location.search.slice(1, location.search.length).split(',');
      async function handleGetDetail(){
            setLoading(true)
            try {
                  const resCombo = await comboApi.getDetailById_orgId({
                        org_id: params[1],
                        item_id: params[0]
                  })
                  const resOrg = await organizationApi.getById({
                        id: params[1]
                  })
                  setData({
                        org: resOrg.data.context,
                        combo: resCombo.data.context
                  })
                  setLoading(false)
            } catch (error) {
                  console.log(error)
                  setLoading(false)
            }
      }
      useEffect(()=>{
            if(location.state){
                  setData({
                        org: location.state.org,
                        combo: location.state.combo
                  })
            }else{
                  handleGetDetail()
            }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      console.log('data',data);
      return (
            <>
            <div>
                  <Header
                        headerTitle="Chi tiết Combo"
                  />
                  {
                        loading === true ? <div className="search__loading-spinner"><CircularProgress color="primary"/></div>
                              :
                              <>
                                    <DetailHead
                                          detail={data.combo}
                                          old_price={old_price}
                                          imageDefault= {(data.org?.image)?data.org?.image_url:''}
                                          sale_price={sale_price}
                                          setOld_price={setOld_price}
                                          setSale_price={setSale_price}
                                    />
                                    <DetailBody
                                          detail={data.combo}
                                          org_id={location.state?.org_id}
                                          imageDefault= {(data.org?.image)?data.org?.image_url:''}
                                    />
                                    <DetailBot
                                          setNewItemCart={setNewItemCart}
                                          org={data.org}
                                          detail={data.combo}
                                          imageDefault= {(data.org?.image)?data.org?.image_url:''}
                                          sale_price={sale_price}
                                          setPopup={setPopup}
                                    />
                                    <PopUp
                                          isOpen={popup}
                                          setIsOpen={setPopup}
                                          newItemCart={newItemCart}
                                          title="Tạo giỏ hàng mới?"
                                          reason={`Bạn có muốn xoá giỏ hàng tại "${orgNameCart}" và thêm dịch vụ/ sản phẩm mới này?`}
                                    />
                              </>
                  }
            </div>
            <Error
                  open={openError.openOther}
                  setOpen={setOpenError}
                  error={openError.error}
            />
            </>
      );
}

export default ComboDetail;