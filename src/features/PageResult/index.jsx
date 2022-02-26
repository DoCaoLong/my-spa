import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTotal } from "../../redux/CartSlice";
import ServiceList from "./components/Organization/ServiceList";
import LocationDetail from "./components/Organization/LocationDetail";
import BranchList from "./components/Branches/BranchList";
import formatNumber from "../../commons/formatPrice";
import { Button } from "@mui/material";
import img from "../../constants/imageList";
import BackToTop from "../../component/ViewCommon/BackToTop";
import "../../assets/style/cus-layout-cart.css";
import Header from "../Header/index";
import Head from "../../component/HeadTag/default";
import { View_detail } from "../../component/Constant/MetaConst";
import organizationApi from "../../apis/organizationApi";
import galleriesApi from '../../apis/galleries';
import PopUp from "./components/PopUpNotification";
import ContactOrg from './components/ContactOrg'
import { card_loading } from '../Loading/CartItem';
import { AppContext } from '../../context/AppProvider'
import Error from '../Error';

// onload event 
window.addEventListener("scroll", function () {
      const scrolled = window.scrollY;
      const cartBottom = document.querySelector(".menu-bottom");

      const windowPosition = scrolled > 50;
      if (cartBottom) {
            cartBottom.classList.toggle("menu-bottom-hide", windowPosition);
            const scrollable =
                  document.documentElement.scrollHeight - window.innerHeight;
            if (Math.ceil(scrolled) >= scrollable) {
                  cartBottom.classList.remove("menu-bottom-hide");
            }
      }
});
//////

function PageResultDetail(props) {
      const history = useHistory();
      const location = useLocation();
      const { org, setOrg, setOrgBr, galleries, setGalleries } = useContext(AppContext)
      const tk = ((JSON.parse(sessionStorage.getItem('userToken')))?.context.token) || '';

      const headerTitle = 'Chi tiết địa điểm';
      // const urlPrev = '/'
      const [urlPrev, setUrlPrev] = useState("")
      const { id } = useParams();
      const [loading, setLoading] = useState(false);
      const [loadingBranch, setLoadingBranch] = useState(false);
      const [organiDetail, setOrganiDetail] = useState({})
      const [organiGalleries, setOrganiGalleries] = useState([])
      const [branches, setBranches] = useState([])
      const [activeBar, setActiveBar] = useState(false);
      const [chooseBranch, setChooseBranch] = useState();
      const [newItemCart, setNewItemCart] = useState();
      

      // Error catch 
      const [openError, setOpenError] = useState({
            openOther: false,
            error: '',
      });
      //----- Pop up --------
      const [popUp, setPopUp] = useState(false);
      //const [cartDialog, setCartDialog] = useState(false);

      const carts = useSelector((state) => state.carts);
      const orgNameCart = carts.cartItems[0]?.org_name
      const cartBottom = document.querySelector('.menu-bottom');

      if (activeBar) {
            if (cartBottom) { cartBottom.classList.remove('menu-bottom-hide'); setActiveBar(false); }
      }
      async function handleGetGalleries() {
            // eslint-disable-next-line eqeqeq
            if (org?.id == id && galleries) {
                  setOrganiGalleries(galleries)
            } else {
                  try {
                        const res = await galleriesApi.getGalleriesByOrgId(id);
                        setOrganiGalleries(res.data.context.data);
                        setGalleries(res.data.context.data)
                  } catch (error) {
                        setOpenError({ openOther: true, error: error })
                  }
            }
      }
      async function handleGetOrgDetail() {
            // eslint-disable-next-line eqeqeq
            if (org?.id == id && org) {
                  setOrganiDetail(org);
                  setBranches(org.branches);
                  
            } else {
                  setLoading(true)
                  setLoadingBranch(true)
                  try {
                        const res = await organizationApi.getById({ id: id, token: tk, branches: true })
                        setOrganiDetail(res.data.context);
                        setOrg(res.data.context)
                        setBranches(res.data.context.branches)
                        setOrgBr(res.data.context.branches)
                        setLoading(false)
                        setLoadingBranch(false)
                  } catch (error) {
                        setLoading(false)
                        setLoadingBranch(false)
                        setOpenError({ openOther: true, error: error })
                  }
            }
      }

      useEffect(() => {
            if (location.state) {
                  setOrganiDetail(location.state);
                  setBranches(location.state.branches);
                  setOrg(location.state)
                  setOrgBr(location.state.branches)
            } else {
                  setUrlPrev("/");
                  handleGetOrgDetail();
            }
            handleGetGalleries()
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [id, location.state])
      //__________________________
      const dispatch = useDispatch();
      useEffect(() => {
            dispatch(getTotal())
      }, [carts, dispatch])
      return (
            <div
                  style={organiDetail.is_momo_ecommerce_enable === false ? { paddingBottom: '16px' } : {}}
                  className="wraper custom-padding cus-page-detail"
            >
                  <Head
                        Title={organiDetail?.name}
                        Description={View_detail.description}
                  >
                  </Head>
                  <Header
                        headerTitle={headerTitle}
                        urlPrev={urlPrev||''}
                  />
                  <LocationDetail
                        chooseBranch={chooseBranch}
                        organiDetail={organiDetail}
                        organiGalleries={organiGalleries}
                        imageDefault={(organiDetail.image)?organiDetail.image_url:img.logoMyspa}
                        branches={branches}
                        loading={loading}
                  />
                  {
                        (loadingBranch) ?
                              (<div className="branch-list-section bg-white">
                                    {card_loading()}
                              </div>)
                              :
                              branches?.length === 0 ? ''
                                    :
                                    <BranchList
                                          branches={branches}
                                          organiDetail={organiDetail}
                                          imageDefault={(organiDetail.image)?organiDetail.image_url:img.logoMyspa}
                                          setChooseBranch={setChooseBranch}
                                    />
                  }
                  {
                        organiDetail.is_momo_ecommerce_enable === false ?
                              <ContactOrg />
                              :
                              <>
                                    <ServiceList
                                          org={organiDetail}
                                          loading={loading}
                                          loadingBranch={loadingBranch}
                                          branchList={branches}
                                          setIsOpen={setPopUp}
                                          imageDefault={(organiDetail.image)?organiDetail.image_url:img.logoMyspa}
                                          setNewItemCart={setNewItemCart}
                                    />
                                    <div className="menu-bottom bg-white" onClick={() => setActiveBar(true)}>
                                          <BackToTop />
                                          <div className="flex-box-row">
                                                <div>
                                                      <span className="nunito-text-md text-black-color">Tổng tiền</span>
                                                      <span className="nunito-text-md text-grey-color">
                                                            ({carts.cartTotalQuantity} sản phẩm)
                                                      </span>
                                                </div>
                                                <span className="nunito-text-mmd text-primary-color">
                                                      {formatNumber(carts.cartTotalAmount)}đ
                                                </span>
                                          </div>
                                          <div className="flex-box-row">
                                                <div className="card-icon">
                                                      <img src={img.cartPurple} alt="cart icon" />
                                                      <div className="number text-white-color nunito-text-tool-tip">
                                                            {carts.cartTotalQuantity}
                                                      </div>
                                                </div>
                                                <Button
                                                      onClick={() => history.push('/Frontend/Momo-layout-cart/' + id)}
                                                      // onClick={()=>setCartDialog(true)}
                                                      className="btn-booking nunito-text-mmd bg-purple-color cus-cart-dock__button"
                                                >
                                                      Xem giỏ hàng
                                                </Button>
                                          </div>
                                    </div>
                              </>
                  }
                  <Error
                        open={openError.openOther}
                        setOpen={setOpenError}
                        error={openError.error}
                  />
                  <PopUp
                        newItemCart={newItemCart}
                        isOpen={popUp}
                        setIsOpen={setPopUp}
                        locationId={id}
                        title="Tạo giỏ hàng mới?"
                        reason={`Bạn có muốn xoá giỏ hàng tại "${orgNameCart}" và thêm dịch vụ/ sản phẩm mới này?`}
                  />
            </div>
      );
}

export default PageResultDetail;
