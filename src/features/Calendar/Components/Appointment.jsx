import React from "react";
import "../../../assets/style/calendar-choosedate.css";
import AppointmentItem from "./AppointmentItem";

export default function appointment(props) {
  const { datingList } = props;

  const array = [];
  for (var item of datingList) {
    const formatTime = item?.time.split(":");
    ////console.log(`formatTime`, formatTime.);
    const num = `${formatTime[0]}${formatTime[1]}`;
    ////console.log(num);
    const da = {
      ...item,
      // timeStart: parseInt(item?.time?.slice(0, 2)),
      timeStart: num,
    };
    array.push(da);
  }
  ////console.log(array);

  const arraySorted = array.sort((a, b) => a.timeStart - b.timeStart);
  // //console.log(arraySorted);
  // //console.log("datingList", datingList);

  return (
    <div>
      {datingList.length === 0 ? (
        <div className="appointment-not">
          <span className="appointment-not-title">
            Bạn không có lịch hẹn nào hôm nay
          </span>
        </div>
      ) : (
        <div className="appointment ">
          <span className="appointment__title">
            <div className="appointment__title--time">Thời gian</div>
            <div className="appointment__title--text">Lịch hẹn</div>
          </span>

          <ul className="appointment__detail">
            {arraySorted.map((item, index) => (
              <AppointmentItem key={index} datalist={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
