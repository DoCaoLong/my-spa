import React, { useState, useEffect } from "react";
import "../../assets/style/calendar-choosedate.css";
import Footer from "../../component/ViewCommon/FooterWrap";
import dayjs from "dayjs";
import Head from "../../component/HeadTag/default";
import { Calendar_choosedate } from "../../component/Constant/MetaConst";
import Appointment from "./Components/Appointment";
import Status from "./Components/Status";
import ChooseMonth from "./Components/ChooseMonth";
import CalendarComponent from "./Components/CalendarComponent";
import Header from "../Header/index";
import { motion } from "framer-motion";
import framerConfig from "../../utils/framerConfig";
import { CircularProgress } from '@mui/material'
//import { dataCalendar } from "../../dataBooking";
import apointmentApi from "../../apis/apointmentApi";
import formatDate from "../../utils/formatDate";
import Error from "../Error";
import PopUpLogin from '../Cart/components/PopUpLogin'

const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const todayObj = dayjs();
const headerTitle = "Lịch hẹn";

const Calendar = () => {
  //get api appointment
  const [chooseMonth, setChooseMonth] = useState(dayjs().format("YYYY-MM"));
  const [appoiment, setAppoiment] = useState([]);
  const [loading, setLoading] = useState(false);
  const tk = ((JSON.parse(sessionStorage.getItem('userToken')))?.context?.token)||'';
  // const tk = `52|4OaZBMkgnN297yGLL3eZ0Ip7XYRnI6P4k6L1XVWu`
  //const [page, setPage] = useState(1);
  // state catch error
  const [openError, setOpenError] = useState({
    openUnAuth: false,
    openOther: false,
    error:'',
  });
  useEffect(() => {
    async function handleGetAppoin() {
      setLoading(true);
      try {
        const res = await apointmentApi.getAppoitment({month:chooseMonth, token: tk});
        setAppoiment(res.data.context.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        switch (error.response?.status) {
          case 401:
            return setOpenError({ ...openError, openUnAuth: true });
          default:
          return setOpenError({ ...openError, openOther:true, error: error })

        }
      }
    }
    handleGetAppoin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chooseMonth]);
  const data = [];
  for (var item of appoiment) {
    const dateString = item.time_start.split(" ");
    const dateEndString = item.time_end.split(" ");
    const timeStart = dateString[1].slice(0, 5);
    const timeEnd = dateEndString[1].slice(0, 5);
    const app = {
      id: item.id,
      date: formatDate(item.time_start),
      org_id: item.organization_id,
      branch_id: item.branch_id,
      status: item.status,
      note: item.note,
      time: timeStart,
      time_end: timeEnd,
    };
    data.push(app);
  }
  ////console.log(data);
  ////console.log(chooseMonth);
  //----------------------------------
  const [datingList, setdatingList] = useState([]);
  const [dotAppoint, setdotAppoint] = useState([]);

  function handleAppoint(date, thisMonth, thisYear, istoday) {
    let newdate = date;
    if (!istoday) {
      newdate = date + 1;
    }
    let newmonth = thisMonth + 1;
    const dateList = data.filter((data) => {
      var parts = data.date.split("/");
      return (
        // eslint-disable-next-line eqeqeq
        newdate == parts[0] && newmonth == parts[1] && thisYear == parts[2]
      );
    });
    setdatingList(dateList);
  }

  async function handleAppointDot() {
    let appointList = [];
    // eslint-disable-next-line array-callback-return
    await data.map((date) => {
      let objIndex = appointList.findIndex((obj) => {
        // eslint-disable-next-line eqeqeq
        if (obj.date == date.date && obj.status == date.status) {
          return true;
        }
        return false;
      });
      if (objIndex !== -1) {
        appointList[objIndex] = {
          ...appointList[objIndex],
          count: appointList[objIndex].count + 1,
          status: appointList[objIndex].status,
        };
      } else
        appointList.push({ date: date.date, count: 1, status: date.status });
      setdotAppoint(appointList);
    });
  }

  // dayjs(year-mouth-day) -> tạo ra 1 ngày (format of dayjs)
  const [dayObj, setDayObj] = useState(dayjs()); // lấy time hiện tại (year-mouth-day,...)
  let thisYear = dayObj.year();
  let thisMonth = dayObj.month(); // (tháng 1 -> 0, tháng 12 -> 11)
  let daysInMonth = dayObj.daysInMonth(); // lấy số ngày trong tháng hiện tại (VD: T1: 31days T2: 28days)
  let dayObjOfFirstMonth = dayjs(`${thisYear}-${thisMonth + 1}-1`); // lấy ngày đầu tiên của tháng curr (format of dayjs)
  let dayObjOfLastMonth = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`); // ngày cuối cùng của tháng curr
  let weekDayOfFirst = dayObjOfFirstMonth.day(); // lấy thứ của ngày đầu tiên của tháng (Sunday -> 0, Saturday -> 6)
  let weekDayOfLast = dayObjOfLastMonth.day(); // thứ của ngày cuối cùng của tháng

  const handlePrev = () => {
    setDayObj(dayObj.subtract(1, "month"));
    setChooseMonth(dayObj.subtract(1, "month").format("YYYY-MM"));
  };
  const handleNext = () => {
    setDayObj(dayObj.add(1, "month"));
    setChooseMonth(dayObj.add(1, "month").format("YYYY-MM"));
  };

  useEffect(() => {
    if (data[0]?.id) {
      let today = todayObj.date();
      handleAppoint(today, thisMonth, thisYear, true);
      handleAppointDot();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appoiment, chooseMonth]);

  return (
    <motion.div
      className="page-calendar"
      variants={framerConfig}
      initial="hidden"
      animate="show"
      exit={{
        opacity: 0,
        transition: { duration: 0.5 },
      }}
    >
      <div className="wrap-header">
        <div className="page-title bg-dark-blue-color">
          <Head
            Title={Calendar_choosedate.title}
            Description={Calendar_choosedate.description}
          ></Head>
          <Header headerTitle={headerTitle} isNotBtn />
          <ChooseMonth
            handlePrev={handlePrev}
            handleNext={handleNext}
            // chooseMonth={chooseMonth}
            // setChooseMonth={setChooseMonth}
            dayObj={dayObj}
          />
        </div>
        <Status />
      </div>
      <CalendarComponent
        weekDays={weekDays}
        todayObj={todayObj}
        weekDayOfFirst={weekDayOfFirst}
        weekDayOfLast={weekDayOfLast}
        thisYear={thisYear}
        thisMonth={thisMonth}
        daysInMonth={daysInMonth}
        dayObjOfFirstMonth={dayObjOfFirstMonth}
        dayObjOfLastMonth={dayObjOfLastMonth}
        handleAppoint={handleAppoint}
        dotAppoint={dotAppoint}
      // appoiment={appoiment}
      />
      {
        loading === true ?
          <div className="search__loading-spinner"><CircularProgress color="primary" /></div>
          :
          <Appointment datingList={datingList} />
      }
      <Footer ActiveIcon="calendarIconActive" />
      {/* show err */}
      <PopUpLogin
        isOpen={openError.openUnAuth}
        setIsOpen={setOpenError}
        title="Yêu cầu truy cập thông tin"
        reason={
          "Cho phép sử dụng thông tin <b>Họ tên, Số điện thoại, Email</b> của bạn để bắt đầu trải nghiệm thiên đường làm đẹp"
        }
      />
      <Error
        open={openError.openOther}
        setOpen={setOpenError}
        error={openError.error}
      />
    </motion.div>
  );
};
export default Calendar;

