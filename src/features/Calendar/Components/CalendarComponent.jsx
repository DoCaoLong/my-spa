/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import range from "lodash-es/range";
import CalendarWeek from "./CalendarWeek";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import CalendarStatusDot from './CalendarStatusDot'

export default function CalendarComponent(props) {
  const location = useLocation();
  const {
    weekDays, // thứ
    weekDayOfFirst, //thứ của ngày đầu tiên của tháng
    weekDayOfLast,
    dayObjOfFirstMonth,
    dayObjOfLastMonth,
    daysInMonth,
    todayObj, //dayjs
    thisMonth,
    thisYear,
    handleAppoint,
    dotAppoint,
  } = props;
  const [dots, setDots] = useState([]);
  useEffect(() => {
    setDots(dotAppoint);
  }, [dotAppoint]);
  const [datepick, setdatepick] = useState(
    location.state
      ? {
          date: location.state.date,
          month: location.state.month,
          year: location.state.year,
        }
      : {
          date: todayObj.date(),
          month: todayObj.month(),
          year: todayObj.year(),
        }
  );
  useEffect(() => {
    const fixed = document.querySelector(".fixed");
    document.addEventListener("scroll", () => {
      let scrollY = window.scrollY;
      if (scrollY >= 120) {
        fixed.style.display = "block";
      } else {
        fixed.style.display = "none";
      }
    });
  });

  function handleGetDate(date, thisMonth, thisYear) {
    setdatepick({
      date: date + 1,
      month: thisMonth,
      year: thisYear,
    });
    handleAppoint(date, thisMonth, thisYear, false);
  }

  // const checkdotstt = (stt) => {
  //   switch (stt) {
  //     case 1:
  //       return <div className="status-dot status-dot-green"></div>;
  //     case 2:
  //       return <div className="status-dot status-dot-blue"></div>;
  //     case 3:
  //       return <div className="status-dot status-dot-purple"></div>;
  //     case 4:
  //       return <div className="status-dot status-dot-red"></div>;
  //     default:
  //       break;
  //   }
  // };
  // const checkdotstt = (stt) => {
  //   switch (stt) {
  //     case "CONFIRMED":
  //       return <span className="appoi__detail status-dot-green status-dot" />;
  //     case "NEW":
  //       return <span className="appoi__detail status-dot-blue status-dot" />;
  //     case "DONE":
  //       return <span className="appoi__detail status-dot-purple status-dot" />;
  //     case "CANCEL":
  //       return <span className="appoi__detail status-dot-red status-dot" />;
  //     default:
  //       break;
  //   }
  // };

  const selectedDay = dayjs(
    `${datepick.year}-${datepick.month + 1}-${datepick.date}`
  );

  // lấy ngày đầu tuần trong tuần
  const getFirstDayOfW = (selectedDay) => {
    // t2 là 0 , chủ nhật là 6
    // //console.log(`(T2 -> 0, CN -> 6) `, selectedDay.day());
    if (selectedDay.startOf("week").month() !== selectedDay.month()) {
      return selectedDay.startOf("month");
    }
    // //console.log(`đầu tuần`, selectedDay.startOf("week").date());
    return selectedDay.startOf("week");
  };

  // lấy ngày cuối tuần trong tuần
  const getLastDayOfW = (selectedDay) => {
    if (selectedDay.day() === 6) {
      return selectedDay;
    }
    if (
      selectedDay.endOf("week").add(1, "day").month() !== selectedDay.month()
    ) {
      return selectedDay.endOf("month");
    }
    // //console.log(`cuối tuần`, selectedDay.endOf("week").date());
    return selectedDay.endOf("week");
  };

  return (
    <>
      <div className="calendar">
        <div className="week-container">
          {weekDays.map((d) => (
            <div className="week-cell" key={d}>
              {d}
            </div>
          ))}
        </div>

        <div className="day-container">
          {
            // weekDayOfFirst thứ của ngày đầu tiên của tháng
            // tính số ngày dư của tháng trước trong tuần đầu tiên
            // mặc định t2 t3 t4 t5 t6 t7 CN (0 -> 6)
            range(weekDayOfFirst).map((i) => (
              <div className="day-cell day-cell--faded" key={i}>
                {dayObjOfFirstMonth.subtract(weekDayOfFirst - i, "day").date()}
              </div>
            ))
          }
          {/*  daysInMonth : 30 range [0 -> 29]  */}
          {/* handleGetDate(ngày, tháng, năm) kết quả */}
          {range(daysInMonth).map((i) => (
            <div
              // click active
              onClick={() => handleGetDate(i, thisMonth, thisYear)}
              className={`day-cell day-cell--in-month dot-active${
                i + 1 === datepick.date &&
                thisMonth === datepick.month &&
                thisYear === datepick.year
                  ? " day-cell--today "
                  : ""
              }`}
              key={i}
            >
              <CalendarStatusDot
                i={i}
                thisMonth={thisMonth}
                thisYear={thisYear}
                dots={dots}
              />
              {/* <div className="status-dots">
                {checkdate(i, thisMonth, thisYear, dots).map((dot, index) => (
                  <DotItem key={index} dotStatus={dot.status} />
                ))}
              </div> */}
              {i + 1}
            </div>
          ))}
          {/* weekDayOfLast thứ ngày cuối cùng của tháng dựa vào ngày chủ nhật */}
          {/* ví dụ ngày cuối cùng là thứ 5 -> ngày xám là 3 ngày t6 t7 cn */}
          {/* 0 1 2 3 -> thứ của tuần cuối cùng  */}
          {/* 4 5 6 là thứ của tuần tháng tiếp theo */}
          {/* range(7 - weekDayOfLast) lấy 7 ngày từ cho số thứ ngày cuối cùng của tháng */}
          {/* {dayObjOfLastMonth.add(i + 1, "day").date()} cộng 1 vì thứ 2 là 0 */}
          {range(6 - weekDayOfLast).map((i) => (
            <div className="day-cell day-cell--faded" key={i}>
              {dayObjOfLastMonth.add(i + 1, "day").date()}
            </div>
          ))}
        </div>
      </div>
      <CalendarWeek
        weekDays={weekDays}
        todayObj={selectedDay}
        weekDayOfFirst={weekDayOfFirst}
        weekDayOfLast={weekDayOfLast}
        thisYear={thisYear}
        thisMonth={thisMonth}
        daysInMonth={daysInMonth}
        dayObjOfFirstMonth={getFirstDayOfW(selectedDay)}
        dayObjOfLastMonth={getLastDayOfW(selectedDay)}
        handleAppoint={handleAppoint}
        dotAppoint={dotAppoint}
        datepick={datepick}
        handleGetDate={handleGetDate}
      />
    </>
  );
}
