import React, { useEffect, useState } from 'react';
import servicesApi from '../../apis/servicesApi';
import DetailHead from './components/DetailHead'
import { useLocation } from 'react-router-dom';
import DetailBot from './components/DetailBot';
import PopUp from '../PageResult/components/PopUpNotification';
import { CircularProgress } from '@mui/material';
import Error from '../Error';
import Header from '../Header/index';
import organizationApi from '../../apis/organizationApi';
import {useSelector} from 'react-redux'

function ServiceDetail(props) {
      const location = useLocation();
      const search = location.search.slice(1, location.search.length)
      const params = search.split(',');
      const carts = useSelector((state) => state.carts);
      const orgNameCart = carts.cartItems[0]?.org_name
      //const [service, setService] = useState({});
      const [data, setData] = useState({
            service: {},
            org: {}
      })
      const [popUp, setPopUp] = useState(false);
      const [loading, setLoading] = useState(false);
      const [newItemCart, setNewItemCart] = useState()
      // Error catch 
      const [openError, setOpenError] = useState({
            openOther: false,
            error: '',
      });
      //console.log('service',);
      // -----------
      async function handleGetDetail() {
            setLoading(true);
            try {
                  const res = await servicesApi.getDetailById_orgId({
                        item_id: params[0],
                        org_id: params[1],
                  });
                  const resOrg = await organizationApi.getById({ id: params[1] })
                  setData({
                        service: res.data.context,
                        org: resOrg.data.context
                  })
                  setLoading(false);
            } catch (err) {
                  //console.log(err);
                  setOpenError({ openOther: true, error: err });
            }
      }
      useEffect(() => {
            if (location.state) {
                  setData({
                        service: location.state.service,
                        org: location.state.org
                  })
            } else {
                  handleGetDetail()
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      return (
            <div>
                  <Error
                        open={openError.openOther}
                        setOpen={setOpenError}
                        error={openError.error}
                  />
                  <Header
                        headerTitle="Thông tin dịch vụ"
                  />
                  {
                        loading === true ?
                              <div className="search__loading-spinner"><CircularProgress color="primary" /></div>
                              :
                              <>
                                    <DetailHead
                                          detail={data.service}
                                          imageDefault= {(data.org?.image)?data.org?.image_url:''}
                                    />
                                    <DetailBot
                                          detail={data.service}
                                          setPopUp={setPopUp}
                                          org={data.org}
                                          imageDefault= {(data.org?.image)?data.org?.image_url:''}
                                          setNewItemCart={setNewItemCart}
                                    />
                                    <PopUp
                                          isOpen={popUp}
                                          setIsOpen={setPopUp}
                                          newItemCart={newItemCart}
                                          title="Tạo giỏ hàng mới?"
                                          reason={`Bạn có muốn xoá giỏ hàng tại "${orgNameCart}" và thêm dịch vụ/ sản phẩm mới này?`}
                                    />
                              </>
                  }
            </div>
      );
}

export default ServiceDetail;