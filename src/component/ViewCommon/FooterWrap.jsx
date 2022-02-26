import React from "react";
import "../../assets/style/momo-layout.css";
import calendarIcon from "../../assets/icon/calendar.svg";
import calendarIconActive from "../../assets/icon/calendar-active.svg";
import homeIcon from "../../assets/icon/map-pin.svg";
import homeIconActive from "../../assets/icon/map-pin-active.svg";
import userIcon from "../../assets/icon/user.svg";
import userIconActive from "../../assets/icon/user-active.svg";
import img from "../../constants/imageList";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const listFooter = [
  {
    id: 1,
    imgIcon: homeIcon,
    imgActiveName: "homeIconActive",
    imgActive: homeIconActive,
    text: "Địa điểm",
    href: "/Frontend/Home",
  },
  // {
  //   id: 4,
  //   imgIcon: userIcon,
  //   imgActiveName: "servicePackageIconActive",
  //   imgActive: userIconActive,
  //   text: "Gói dịch vụ",
  //   href: "/Frontend/My-services",
  // },
  {
    id: 2,
    imgIcon: calendarIcon,
    imgActiveName: "calendarIconActive",
    imgActive: calendarIconActive,
    text: "Lịch hẹn",
    href: "/Frontend/Calendar",
  },
  {
    id: 3,
    imgIcon: userIcon,
    imgActiveName: "userIconActive",
    imgActive: userIconActive,
    text: "Tài khoản",
    href: "/Frontend/Account-detail",
  },
];
function FooterWrap({ ActiveIcon }) {
  const [icon, setIcon] = useState(ActiveIcon);
  return (
    <footer className="footer">
      <div className="footer-wrap cus-footer">
        {listFooter.map((item) => (
          <Link to={item.href} key={item.id}>
            <Button
              className={
                "footer-calendar footer-wrap__button width-max-content"
              }
              onClick={() => setIcon(item.imgActiveName)}
            >
              <div className="footer-calendar-img height-max-content">
                <img
                  src={
                    icon === item.imgActiveName ? item.imgActive : item.imgIcon
                  }
                  onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} 
                  alt=""
                />
              </div>
              <span
                className={
                  "footer-calendar-title " +
                  (icon === item.imgActiveName
                    ? "text-primary-color"
                    : "text-grey-color")
                }
              >
                {item.text}
              </span>
            </Button>
          </Link>
        ))}
      </div>
    </footer>
  );
}

export default FooterWrap;
