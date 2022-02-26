import React from "react";
import img from "../../../constants/imageList";
// import dayjs from "dayjs";
import "dayjs/locale/vi";

// dayjs.locale("vi"); // toàn bộ componet tiếng việt
export default function ChooseMonth({
  handleNext,
  handlePrev,
  dayObj,
  chooseMonth,
  setChooseMonth,
  ...props
}) {
  // //console.log(dayObj.locale("vi").format("MMMM - YYYY"))
  // const onPrevMonth=()=>{
  //   handlePrev()
  //   setChooseMonth(dayObj.format('YYYY-MM'))
  // }
  // const onNextMonth=()=>{

  // }
  return (
    <div className={"bg-dark-blue-color" + props.Class}>
      <div className="header position-relative time-title">
        <div onClick={handlePrev} className="time-btn-left">
          <img className="icon" src={img.arrowLeft} alt="" />
        </div>
        <span className="time-month text-white-color">
          {/* chỉ span này tiếng việt thêm .locale("vi") */}
          {dayObj.locale("vi").format("MMMM - YYYY")}
        </span>
        <div onClick={handleNext} className="time-btn-right">
          <img className="icon" src={img.arrowRight} alt="" />
        </div>
      </div>
    </div>
  );
}
