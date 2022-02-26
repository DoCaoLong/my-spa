import React from "react";
import range from "lodash-es/range";

export default function CalendarWeek(props) {
  const {
    weekDays,
    daysInMonth,
    thisMonth,
    thisYear,
    dotAppoint,
    dayObjOfFirstMonth,
    dayObjOfLastMonth,
    weekDayOfFirst,
    datepick,
    handleGetDate,
    weekDayOfLast,
  } = props;
  const checkdate = (i, thisMonth, thisYear, dotAppoint) => {
    let newdate = [i + 1, thisMonth + 1, thisYear].join("/");
    const datesttArray = dotAppoint.filter((dot) => dot.date === newdate);
    return datesttArray;
  };
  const checkdotstt = (stt) => {
    switch (stt) {
      case "CONFIRMED":
        return <span className="appoi__detail status-dot-green status-dot" />;
      case "ARRIVED":
        return <span className="appoi__detail status-dot-green status-dot" />;
      case "NEW":
        return <span className="appoi__detail status-dot-blue status-dot" />;
      case "ONL_BOOKING":
        return <span className="appoi__detail status-dot-blue status-dot" />;
      case "DONE":
        return <span className="appoi__detail status-dot-purple status-dot" />;
      case "CANCEL":
        return <span className="appoi__detail status-dot-red status-dot" />;
      default:
        break;
    }
  };
  return (
    <div className="calendar fixed calendar-fixed-week">
      <div className="week-container">
        {weekDays.map((d) => (
          <div className="week-cell" key={d}>
            {d}
          </div>
        ))}
      </div>

      <div className="day-container">
        {dayObjOfLastMonth.date() > 6
          ? ""
          : range(weekDayOfFirst).map((i) => (
              <div className="day-cell day-cell--faded" key={i}>
                {dayObjOfFirstMonth.subtract(weekDayOfFirst - i, "day").date()}
              </div>
            ))}

        {/* eslint-disable-next-line array-callback-return */}
        {range(daysInMonth).map((i) => {
          // //console.log(
          //   `${dayObjOfFirstMonth.date()} --- ${dayObjOfLastMonth.date()}`
          // );
          if (
            i >= dayObjOfFirstMonth.date() - 1 &&
            i <= dayObjOfLastMonth.date() - 1
          ) {
            return (
              <div
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
                <div className="status-dots ">
                  {checkdate(i, thisMonth, thisYear, dotAppoint).map(
                    (dot, index) => (
                      <div key={index}>{checkdotstt(dot.status)}</div>
                    )
                  )}
                </div>
                {i + 1}
              </div>
            );
          }
        })}
        {dayObjOfFirstMonth.date() >= 26
          ? range(6 - weekDayOfLast).map((i) => (
              <div className="day-cell day-cell--faded" key={i}>
                {dayObjOfLastMonth.add(i + 1, "day").date()}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
