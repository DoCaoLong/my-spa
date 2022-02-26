import React, { useState } from "react";
import Head from "../../component/HeadTag/default";
import "../../assets/style/service-package.css";
import { Service_Pack } from "../../component/Constant/MetaConst";
import Header from "../Header/index";
import NoBooked from "./components/NoBooked";
import Booked from "./components/Booked";
import FilterServicePack from "./components/FilterServicePack";

function ServicePack(props) {
  const headerTitle = "Gói dịch vụ";
  const [activeTab, setActiveTab] = useState("tab1");
  const urlPrev = 'Frontend/Account'
  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  return (
    <div className="wraper padding-unset-bottom page-servicepack">
      <Head
        Title={Service_Pack.title}
        Description={Service_Pack.description}
      ></Head>

      <div className="booking-cart background-white">
        <div className="page-title bg-dark-blue-color">
          <Header headerTitle={headerTitle} urlPrev={urlPrev}/>
          <div className="booking-status flex-box-row nunito-text-md">
            <div
              onClick={handleTab1}
              className={`item ${activeTab === "tab1" ? "actived" : ""}`}
            >
              Chưa đặt hẹn
            </div>
            <div
              onClick={handleTab2}
              className={`item ${activeTab === "tab2" ? "actived" : ""}`}
            >
              Đã đặt hẹn
            </div>
          </div>
        </div>

        <FilterServicePack />

        {activeTab === "tab1" ? <NoBooked /> : <Booked />}
      </div>
    </div>
  );
}
export default ServicePack;
