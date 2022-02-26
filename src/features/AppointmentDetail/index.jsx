import React, { useEffect, useState } from "react";
import { Slide, Dialog } from "@mui/material";
import Header from "../Header/index";
import "./AppointmentDetail.css";
import img from "../../constants/imageList";
import formatNumber from "../../utils/formatPrice";
import AppointmentDeQr from "./AppointmentDeQr";
import apointmentApi from "../../apis/apointmentApi";
import Error from "../Error";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
// mapping data demo
function AppointmentDetail(props) {
  const { openDetail, setOpenDetail, detail, org, branch } = props;
  const tk =
    JSON.parse(sessionStorage.getItem("userToken")).context.token || "";
  const userInfo = JSON.parse(sessionStorage.getItem("userToken"))?.context;
  //const tk = `413|vzYArAdwXqwUWPIdgXM0f3MeJ5DW4xBVoDASFzxh`
  const [openQr, setOpenQr] = useState(false);
  const [openError, setOpenError] = useState({
    openOther: false,
    error: "",
  });

  const [services, setServices] = useState([]);
  useEffect(() => {
    async function handleSetDetail() {
      try {
        const res = await apointmentApi.getAppointmentById({
          id: detail.id,
          token: tk,
        });
        setServices(res.data.context.service_ids);
      } catch (err) {
        //console.log(err);
        setOpenError({ openOther: true, error: err });
      }
    }
    if (openDetail === true) {
      handleSetDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail.id, openDetail]);
  return (
    <Dialog fullScreen open={openDetail} TransitionComponent={Transition}>
      <Header
        setOpenQr={setOpenQr}
        inAppointDetail={true}
        headerTitle="Chi tiết lịch hẹn"
        setOpenForm={setOpenDetail}
      />
      <div className="app-detail">
        <ul className="app-detail__ser">
          <div className="app-detail__ser-head">Dịch vụ</div>
          {services.map((item) => (
            <li key={item.id}>
              <div className="cus-cart-list__item">
                <div className="cus-cart-list__item-img">
                  <img
                    src={item?.image_url}
                    onError={(e) => {
                      e.target.src = img.logoMyspa;
                      e.target.style.objectFit = "contain";
                      e.target.style.transform = "scale(0.5)";
                    }}
                    alt=""
                  />
                </div>
                <div className="cus-cart-list__item-name">
                  {item?.service_name}
                </div>
                <div className="cus-cart-list__item-price cus-item-quantity">
                  <span>
                    {item.special_price < 0
                      ? formatNumber(item.price)
                      : formatNumber(item.special_price)}
                    đ
                  </span>
                  {/* <p>x{item?.quantity}</p> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="app-detail__checkin">
          <span className="app-detail__title">Thông tin checkin</span>
          <div className="app-detail__content">
            <p>{userInfo?.fullname}</p>
            <p>{userInfo?.telephone}</p>
            <p>{userInfo?.email}</p>
          </div>
        </div>
        <div className="app-detail__checkin">
          <span className="app-detail__title">Thời gian</span>
          <div className="app-detail__content">
            <p>
              {detail?.time}, Ngày {detail?.date}
            </p>
          </div>
        </div>
        <div className="app-detail__checkin">
          <span className="app-detail__title">Địa chỉ</span>
          <div className="app-detail__branch">
            <div className="app-detail__branch-content">
              <p>{branch ? branch?.full_address : org?.full_address}</p>
            </div>
            <img src={img.appDetail} alt="" />
          </div>
        </div>
      </div>
      <Error
        open={openError.openOther}
        setOpen={setOpenError}
        error={openError.error}
      />
      <AppointmentDeQr openQr={openQr} setOpenQr={setOpenQr} />
    </Dialog>
  );
}

export default AppointmentDetail;
