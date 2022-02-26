import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import organizationApi from "../../apis/organizationApi";
import img from "../../constants/imageList";
import Header from "../Header";
import {card_loading} from "../Loading/CartItem";
import { CircularProgress } from "@mui/material";
import BranchItem from '../ViewItem/BranchItem/index';
import Error from '../Error';

function PageViewBranch(props) {
  const { id } = useParams();
  const location = useLocation();
  const headerTitle = 'Danh sách chi nhánh';
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    org:{},
    branches:[]
  })

  // Error catch 
    const [openError, setOpenError] = useState({
      openOther: false,
      error:'',
    });
  // -----------
  async function handleGetOrg(){
    setLoading(true)
    try {
      const res = await organizationApi.getById({id:id, branches:true})
      setData({
        org: res.data.context,
        branches: res.data.context.branches
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(()=>{
    if(location.state){
      setData({
        org: location.state,
        branches: location.state.branches
      })
    }else{
      handleGetOrg()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  console.log('data',data);
  return (
    <>
    <div className="view-branches">
      <Header 
        headerTitle={headerTitle} 
        // customStyle={
          
        // } 
      />
      {loading === true ? 
        card_loading()
       : (
        <div className="cus-cards-wrap__item header-view-branches">
          <img
            className="wrap__item-avatar"
            src={(data.org.image)?data.org.image_url:img.logoMyspa}
            onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} 
            alt=""
          />
          <div className="cus-cards-wrap__item-right">
            <span className="item-right__name">{data.org?.name}</span>
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
            {data.org?.tags?.length > 0 && (
            <div className="item-right__catalog">
              <div className="item-right__catalog_tags">
                <img className="icon" src={img.catalog} alt="" />
                {
                  data.org?.tags?.map((item,index)=>(
                    <span key={index}>{item.name}{(data.org?.tags?.length!==index+1)&&", "}</span>
                  ))
                }
              </div>
            </div>
            ) }
            {/* <div className="item-right__price">
              <img className="icon" src={img.tag} alt="" />
              <span className="pdr-8">290.000đ</span>
              <span> (Giá dịch vụ)</span>
            </div> */}
          </div>
        </div>
      )}
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
            {data?.branches?.map((item,key) => (
              <BranchItem
                key={key}
                dataBranch={item}
                organization_id={id}
                imageDefault={(data.org.image)?data.org.image_url:img.logoMyspa}
                org={data.org}
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

export default PageViewBranch;
