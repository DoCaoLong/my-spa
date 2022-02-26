import React from "react";
import ServiceType from "./ServiceType";
import ServiceTypeButton from "./ServiceTypeButton";

function AppointmentYet(props) {
  // //console.log("props")
  //console.log(props);
  let merchantName = "";
  let PropsChecked = null;
  merchantName = props.merchantName || "";
  PropsChecked = props.PropsChecked || null;
  const buttonTitle = "Đặt hẹn ngay";
  const url = "/Frontend/Momo-booking-step-1";
  const count = [1, 2];
  return (
    <div>
      {count.map((item, index) => (
        <ServiceType  
          key={index}
          index={item}
          merchantName={merchantName}
          PropsChecked={PropsChecked}
          setPropsChecked={props.setPropsChecked}
        />
      ))}
      <ServiceTypeButton buttonTitle={buttonTitle} url={url} />
    </div>
  );
}

export default AppointmentYet;
