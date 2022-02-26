import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DetailHead from './components/DetailHead';
import productsApi from '../../apis/productsApi';
import '../../assets/style/product_service_detail.css';
import DetailBot from './components/DetailBot';
import PopUp from '../PageResult/components/PopUpNotification';
import { CircularProgress } from '@mui/material';
import Header from '../Header/index';
import Error from '../Error';
import organizationApi from '../../apis/organizationApi';
import {useSelector} from 'react-redux'

window.addEventListener("scroll", function () {
      const scrolled = window.scrollY;
      const cartBottom = document.querySelector(".de-bot");

      const windowPosition = scrolled > 50;
      if (cartBottom) {
            cartBottom.classList.toggle("de-bot-hide", windowPosition);
            const scrollable =
                  document.documentElement.scrollHeight - window.innerHeight;
            if (Math.ceil(scrolled) >= scrollable) {
                  cartBottom.classList.remove("de-bot-hide");
            }
      }
});

function ProductDetail() {
      const location = useLocation();
      const search = location.search.slice(1, location.search.length);
      const params = search.split(',');
      const carts = useSelector((state) => state.carts);
      const orgNameCart = carts.cartItems[0]?.org_name
      //____
      const [data, setData] = useState({
            product:{},
            org:{}
      })
      const [popUp, setPopUp] = useState(false);
      const [loading, setLoading] = useState(false);
      const [newItemCart, setNewItemCart] = useState()
      // Error catch
      const [openError, setOpenError] = useState({
            openOther: false,
            error: '',
      });
      //-----------
      async function getDetail() {
            setLoading(true);
            try {
                  const res = await productsApi.getDetailById_orgId({
                        org_id: params[1],
                        item_id: params[0]
                  });
                  const resOrg = await organizationApi.getById({id:params[1]})
                 setData({
                       product: res.data.context,
                       org: resOrg.data.context
                 })
                  setLoading(false)
            } catch (err) {
                  setLoading(false);
                  setOpenError({ openOther: true, error: err });
            }
      }
      useEffect(() => {
            if (location.state) {
                  setData({
                        product: location.state.product,
                        org: location.state.org
                  })
            } else {
                  getDetail()
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [location.state])
      return (
            <div>
                  <Header
                        headerTitle="Thông tin sản phẩm"
                  />
                  {
                        loading === true ?
                              <div className="search__loading-spinner"><CircularProgress color="primary" /></div>
                              :
                              <>
                                    <DetailHead
                                          detail={data.product}
                                          imageDefault= {(data.org?.image)?data.org?.image_url:''}
                                    />
                                    <DetailBot
                                          detail={data.product}
                                          org={data.org}
                                          setPopUp={setPopUp}
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
                  <Error
                        open={openError.openOther}
                        setOpen={setOpenError}
                        error={openError.error}
                  />
            </div>
      );
}

export default ProductDetail;