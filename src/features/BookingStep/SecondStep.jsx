import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector} from "react-redux";
import CheckBranchItem from "./components/CheckBranchItem";
import "../../assets/style/custom-material.css";
import "../../assets/font/stylesheet.css";
import PopUp from"./components/PopUpWarning";
// import { AppContext } from "../../context/AppProvider";
function SecondStep(props) {
    // const {serBooking, brBooking} = useContext(AppContext)
    // //console.log(serBooking, brBooking);

    const url = "Momo-booking-step-";
    const history = useHistory();
    const serviceBranch = useSelector((state)=> state.serviceBooking);
    const branchList = serviceBranch.branchList;

    const [popUp, setPopUp] = useState(false);
    //console.log('branch');
    //console.log(serviceBranch);
    function handleNextClick(){
        let x = serviceBranch.bookingConfirm.branch;
        //console.log('x',x);
        (x.id)?(history.push(`${url+"3"}`)):(setPopUp(true));//history.push(`${url+"3"}`));
    }
    function handleBackClick(){
        history.push(`${url+"1"}`);
    }
    return(
        <div className="page-checkin">
            <div className="wraper-checkin">
                <div className="page-title bg-dark-blue-color">
                    <h1 className="nunito-text-xl text-white-color ">
                        Chọn chi nhánh
                    </h1>
                </div>
                <div className="cus-cart-list max-height">
                    <form className="form-checkin pdt-16 " action="">
                        {branchList?.map((item,index) => (
                            <CheckBranchItem
                                key={index}
                                // setBookingSevice = {setBookingSevice}
                                branchItem = {item}
                            />
                        ))}
                        <div className="confirm-btn branch_cart-btn">
                            <div className="btn-skip nunito-text-mmd text-primary-color bg-white" onClick={handleBackClick} >Quay lại</div>
                            <div className="btn-allow nunito-text-mmd text-white-color bg-purple-color" onClick={handleNextClick}>Tiếp tục</div>
                        </div>
                    </form>
                </div>
            </div>
            <PopUp
            isOpen={popUp}
            setIsOpen={setPopUp}
            reason={"Vui lòng chọn địa điểm cho buổi hẹn"}
            />
        </div>
    )
}
export default SecondStep;