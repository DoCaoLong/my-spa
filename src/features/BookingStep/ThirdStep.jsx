/* eslint-disable eqeqeq */
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import TimeItem from "./components/TimeItem";
import Dayth from "./components/dayth";
import PopUp from "./components/PopUpWarning";
import { setTimeCheckIn, checkBranch } from "../../redux/serviceBookingListSlice";
import ChooseMonth from "../Calendar/Components/ChooseMonth";
import Img from "../../constants/imageList";
import Header from "../Header/index";
import organizationApi from '../../apis/organizationApi';
import {AppContext} from '../../context/AppProvider';
import Error from '../Error';

import "../../assets/style/cus-layout-time-choosing.css";
import "../../assets/font/stylesheet.css";

const headerTitle = "Chọn thời gian";
const pb_8 = "8px";
const height_52 = "52px";
const isShowBackBtn = "none";
const center = "center";

function ThirdStep(props) {
  const { is_dialog, setOpen, setOpenNext } = props;
  const {setTimeBooking} = useContext(AppContext)
  const url = "Momo-booking-step-";
  const history = useHistory();
  const dispatch = useDispatch();
  const serviceBranch = useSelector((state)=> state.serviceBooking.bookingConfirm);
  const orgId = serviceBranch.listService[0]?.locationId;
  const tk = ((sessionStorage.getItem('userToken'))?JSON.parse(sessionStorage.getItem('userToken')).context.token:'');
  ////console.log('branch',serviceBranch);
  // const storeTime = useSelector(
  //   (state) => state.serviceBooking.bookingConfirm.time
  // );
  const [openError, setOpenError] = useState({
    openOther: false,
    error:'',
});

  async function fetchOrgDetail() {
    if (!is_dialog) {
      try {
        const res = await organizationApi.getById({id:orgId,token:tk});
        const action = checkBranch({ ...res.data.context });
        dispatch(action);
      } catch (err) {
        //console.log(err);
        setOpenError({ openUnAuth: true, openOther:true, error: err })
      }
    }
  }
  useEffect(() => {
    if (serviceBranch.branch) {
      fetchOrgDetail()
    } else {
      //console.log('fail')
    }
    return () => {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  var updateLocale = require("dayjs/plugin/updateLocale");
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    monthsShort: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ],
  });
  const [dayObj, setDayObj] = useState(dayjs());
  const crDate = dayjs();
  const [activeDate, setactiveDate] = useState(crDate);
  const [choose, setChoose] = useState(false);
  let weekdays = new Array(7)
    .fill(activeDate.startOf("week"))
    .map((day, idx) => day.add(idx, "day").format("D"));

  const now = dayjs();
  const [activeTime, setactiveTime] = useState(now);

  const [popUp, setPopUp] = useState(false);

  const handlePrev = () => {
    var propsDate = activeDate?.subtract(1, "month");
    var propActiveTime = activeTime?.subtract(1,"month");
    setactiveDate(propsDate);
    setactiveTime(propActiveTime);
    subMonth();
  };
  const handleNext = () => {
    var propsDate = activeDate?.add(1, "month");
    var propActiveTime = activeTime?.add(1,"month");
    //console.log('active Date at Next month btn',propsDate.format('YYYY-MM-DD'));
    setactiveDate(propsDate);
    setactiveTime(propActiveTime);
    addMonth();
  };
  const addMonth = () => {
    setDayObj(dayObj.add(1, "month"));
  };
  const subMonth = () => {
    setDayObj(dayObj.subtract(1, "month"));
  };
  const handleDatePrev = () => {
    var propsDate = activeDate?.subtract(1, "week");
    var propActiveTime = activeTime?.subtract(1,"week");
    setactiveDate(propsDate);
    setactiveTime(propActiveTime);
    propsDate.format("M") !== activeDate.format("M") && subMonth();
  };
  const handleDateNext = () => {
    var propsDate = activeDate?.add(1, "week");
    var propActiveTime = activeTime?.add(1,"week");
    setactiveDate(propsDate);
    setactiveTime(propActiveTime);
    propsDate.format("M") !== activeDate.format("M") && addMonth();
  };

  const handleTime = (prop) => {
    setChoose(true);
    setactiveTime(prop);
    // //console.log('props',prop.format("HH:mm, Ngày D-M-YYYY"));
  };
  let times = 25;
  var rows = [];
  var hours = dayjs().set("hour", 8).set("minute", 0).set("second", 0);
  for (var i = 0; i <= times; i++) {
    if (i !== 8 && i !== 9) {
      rows.push(
        <TimeItem
          key={i}
          Time={hours}
          Now={now}
          handleClick={handleTime}
          activeTime={activeTime}
          activeDate={activeDate}
        />
      );
    }
    hours = hours.add(30, "minute");
  }

  function handleNextClick(props) {
    // var x = activeTime;
    // //console.log('props',props);
    // const time = activeTime?.format('HH:mm')
    // const chooseDate= activeDate.format('YYYY-MM-DD')
    //console.log(`${chooseDate} ${time}`);
    //const action = setTimeCheckIn(activeTime || "");
    if (activeTime && choose) {
    const time = activeTime?.format('HH:mm')
    const chooseDate= activeDate.format('YYYY-MM-DD')
    const action = setTimeCheckIn(
      {
        timeShowing:`${time}, Ngày ${chooseDate}`,
        timeInserting: `${chooseDate} ${time}`
      }
      );
      dispatch(action);
      if (is_dialog === true) {
        setOpenNext(true)
        setTimeBooking({activeTime, activeDate})
      } else {
        history.push(`${url + "5"}`);
      }
    } else {
      setPopUp(true);
      //console.log("missing active time");
    }
    // dispatch(action);
    // history.push(`${url+"4"}`);
  }
  function handleBackClick() {
    if (is_dialog === true) {
      return setOpen(false);
    }
    history.push(`${url + "2"}`);
  }



  //console.log('active Date before return',activeDate.format('YYYY-MM-DD'));
  return (
    <>
      <div className="page-title bg-dark-blue-color">
        <Header
          headerTitle={headerTitle}
          height_52={height_52}
          isShowBackBtn={isShowBackBtn}
          center={center}
        />
        <ChooseMonth
          handlePrev={handlePrev}
          handleNext={handleNext}
          pb_8={pb_8}
          Class="pd-0-important"
          dayObj={dayObj}
        />
      </div>
      <div className="flex-box-col time-choosing-block">
        <div className="flex-box-row weekdaysSection">
          <div className="" onClick={handleDatePrev}>
            <img src={Img.arrowLeftCircle} alt="" />
          </div>
          {weekdays.map((day, index) => (
            <Dayth
              key={index}
              index={index}
              day={day}
              setDayObj={setDayObj}
              setactiveDate={setactiveDate}
              crDate={activeDate}
            />
          ))}
          <div onClick={handleDateNext}>
            <img src={Img.arrowRightCircle} alt="" />
          </div>
        </div>
        <div className="time-block flex-box-row">
          <div className="flex-box-row">{rows}</div>
        </div>
      </div>
      <div className="confirm-btn branch_cart-btn">
        <div
          className="btn-skip nunito-text-mmd text-primary-color bg-white"
          onClick={handleBackClick}
        >
          Quay lại
        </div>
        <div
          className="btn-allow nunito-text-mmd text-white-color bg-purple-color"
          onClick={handleNextClick}
        >
          Tiếp tục
        </div>
      </div>
      <Error
            open={openError.openOther}
            setOpen={setOpenError}
            error={openError.error}
      />

      <PopUp
        isOpen={popUp}
        setIsOpen={setPopUp}
        reason={"Vui lòng chọn giờ cho buổi hẹn"}
      />
    </>
  );
}
export default ThirdStep;
