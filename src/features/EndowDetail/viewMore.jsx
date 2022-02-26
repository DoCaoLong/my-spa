import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import organizationApi from "../../apis/organizationApi";
import img from "../../constants/imageList";
import Header from "../Header";
import { CircularProgress } from "@mui/material";
import BranchItem from "../ViewItem/BranchItem/index";
import formatNumber from "../../utils/formatPrice";
import { useHistory } from "react-router-dom";
import Error from '../Error';

function ViewMpre(props) {
  const { orgId } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState();
  const data = JSON.parse(localStorage.getItem("discount-data")) || [];
  const tk = ((sessionStorage.getItem('userToken'))?JSON.parse(sessionStorage.getItem('userToken')).context.token:'');
  const [openError, setOpenError] = useState({
    openOther: false,
    error:'',
  });
  async function getOrganizationById(id) {
    setLoading(true);
    try {
      const res = await organizationApi.getById({ id: id, branches: true, token: tk });
      setOrganization(res.data.context);
      setLoading(false);
    } catch (err) {
      //console.log(err);
      setOpenError({ openUnAuth: true, openOther:true, error: err })
    }
  }
  //   async function getBranchesById(id) {
  //     setLoading(true);
  //     try {
  //       const res = await branchesApi.getBranchesByOrganizationId(id);
  //       setBranches(res.data.context);
  //       setLoading(false);
  //     } catch (err) {
  //       //console.log(err);
  //     }
  //   }
  useEffect(() => {
    // getBranchesById(orgId);
    getOrganizationById(orgId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId]);
  return (
    <>
    <div className="view-branches">
      <Header headerTitle={organization?.name} />
      {loading === true ? (
        <div className="search__loading-spinner">
          <CircularProgress color="primary"/>
        </div>
      ) : (
        <div className="cus-cards-wrap__item header-view-branches">
          <img
            className="wrap__item-avatar"
            src={organization?.image_url}
            onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} 
            alt=""
          />
          <div className="cus-cards-wrap__item-right">
            <span className="item-right__name">{organization?.name}</span>
            <div className="rating flex-box-row item-right__range">
              {/* <div className="result flex-box-row">
                <span className="text-black-color nunito-text-sm ">4</span>
                <img
                  className="icon mg-left-2"
                  src={img.star}
                  alt="icon yellow star"
                />
              </div>
              <div className="result flex-box-row pd-left-8">
                <span className="text-black-color nunito-text-sm ">4</span>
                <img
                  className="icon mg-left-2"
                  src={img.subtract}
                  alt="comment icon"
                />
              </div> */}
            </div>
            <div className="item-right__catalog">
              <div className="item-right__catalog_tags">
                <img className="icon" src={img.catalog} alt="" />
                <span>Chăm sóc da</span>
              </div>
            </div>
            <div className="item-right__price">
              <img className="icon" src={img.tag} alt="" />
              <span className="pdr-8">290.000đ</span>
              <span> (Giá dịch vụ)</span>
            </div>
          </div>
        </div>
      )}
      <div className="discount-list-section">
        <h3 className="nunito-text-xl text-primary-color text-align-center">
          Danh sách dịch vụ
        </h3>

        {data[orgId - 1].servicesList?.map((item, index) => (
          <div className="flex-box-col" key={index}>
            <div className="item flex-box-row cus-service-item">
              <div 
                className="avatar" 
                onClick={() =>
                  history.push(`/Frontend/Momo-layout-detail/${orgId}`)
                }>
                <img
                  src={(item.image)?item?.image_url:''}
                  alt="banner"
                  onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} 
                  className="image-size cus-img-page-detail"
                />
              </div>
              <div
                className="service-info cus-service-info"
                onClick={() =>
                  history.push(`/Frontend/Momo-layout-detail/${orgId}`)
                }
              >
                <div>
                  <div className="address nunito-text-md text-black-color">
                    {item.product_name}
                  </div>
                  <div className="rating flex-box-row">
                    <div className="result flex-box-row">
                      <span className="text-black-color nunito-text-sm ">
                        4.5
                      </span>
                      <img
                        className="icon"
                        src={img.star}
                        alt="icon yellow star"
                        onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} 
                      />
                    </div>
                    <div className="result flex-box-row">
                      <span className="text-black-color nunito-text-sm ">
                        97
                      </span>
                      <img
                        className="icon"
                        src={img.subtract}
                        alt="comment icon"
                        onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} 
                      />
                    </div>
                  </div>
                </div>
                <div className="price flex-box-row">
                  <span className="nunito-text-mmd text-primary-color">
                    {formatNumber(item.price)} đ
                  </span>
                </div>
              </div>
            </div>
            <hr className="grey-line" />
          </div>
        ))}
      </div>
      <div className="branch-list-section" style={{ marginTop: "0px" }}>
        <h3 className="nunito-text-xl text-primary-color text-align-center">
          Danh sách cơ sở
        </h3>
        {loading === true ? (
          <div className="search__loading-spinner">
            <CircularProgress color="primary"/>
          </div>
        ) : (
          <div className="list-group flex-box-col">
            {organization?.branches?.map((item) => (
              <BranchItem
                key={item.id}
                dataBranch={item}
                organization_id={orgId}
              />
            ))}
          </div>
        )}
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

export default ViewMpre;
