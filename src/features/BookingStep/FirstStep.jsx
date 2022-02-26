import React, {useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import "../../assets/style/custom-material.css";
import "../../assets/font/stylesheet.css";
import Item from "./components/ServiceItem";
import { useHistory } from "react-router-dom";
import {  checkConfirmService, setListBooking } from "../../redux/serviceBookingListSlice";
import PopUp from"./components/PopUpWarning";

function FirstStep(){
    //console.log("----- serviceList");
    const history = useHistory();
    const url = 'Momo-booking-step-';
    const dispatch = useDispatch();
    const serviceList = useSelector((state)=> state.serviceBooking).bookingList;
    const listService = serviceList.filter(item => item.elementType === 'service');
    const listCombo = serviceList.filter(item => item.elementType === 'combo');
    //const [bookingList, setBookingList] = useState(serviceList.bookingList);
    const [popUp, setPopUp] = useState(false);

    function handleCheckBox(props){
        dispatch(checkConfirmService(props));
    }
    console.log('props',serviceList);
    function handleNextClick(){
        let list = [];
        //console.log('booking cart',JSON.parse(localStorage.getItem('booking')));
        list = serviceList.filter(item => item.isBooking === true);
        const action = setListBooking(list);
        dispatch(action);
        //console.log('list');
        //console.log(list);
        // eslint-disable-next-line eqeqeq
        if(list.length == 0){(setPopUp(true)); //console.log('list');
        }
        else{
            (list[0].branchList.length !== 0)
            ?
            (history.push(`${url}2`))
            :(
                history.push(`${url}3`)
            )
        }
    }
    function handleBackClick(){
        history.push("/Frontend/Home");
    }
    return(
        <div className="page-checkin">
            <div className="wraper-checkin">
                <div className="page-title bg-dark-blue-color">
                    <h1 className="nunito-text-xl text-white-color ">
                        Chọn dịch vụ bạn muốn đặt hẹn
                    </h1>
                </div>
                <div className="cus-cart-list">
                    <div className="cus-cart-header__service">
                            <span className="cus-cart-header__service-left">Dịch vụ</span>
                            <span></span>
                    </div>
                    <form className="form-checkin form-wrap pd-0" action="">
                    {listService?.map((item,index) => (
                        <Item
                            key = {index}
                            //setBookingList = {setBookingList}
                            handleCheck = {handleCheckBox}
                            serviceItem = {item}
                        />
                    ))}
                        <div className="confirm-btn ">
                            <div className="btn-skip nunito-text-mmd text-primary-color bg-white" onClick={handleBackClick} >Về trang chủ</div>
                            <div className="btn-allow nunito-text-mmd text-white-color bg-purple-color" onClick={handleNextClick}>Tiếp tục</div>
                        </div>
                    </form>
                    {listCombo.length > 0 && (
                        <>
                        <div className="cus-cart-header__service">
                                <span className="cus-cart-header__service-left">Combo</span>
                                <span></span>
                        </div>
                        <form className="form-checkin form-wrap pd-0" action="">
                        {listCombo?.map((item,index) => (
                            <Item
                                key = {index}
                                //setBookingList = {setBookingList}
                                handleCheck = {handleCheckBox}
                                serviceItem = {item}
                            />
                        ))}
                            <div className="confirm-btn ">
                                <div className="btn-skip nunito-text-mmd text-primary-color bg-white" onClick={handleBackClick} >Về trang chủ</div>
                                <div className="btn-allow nunito-text-mmd text-white-color bg-purple-color" onClick={handleNextClick}>Tiếp tục</div>
                            </div>
                        </form>
                        </>
                    )}
                </div>
            </div>
            <PopUp
            isOpen={popUp}
            setIsOpen={setPopUp}
            reason={"Vui lòng chọn dịch vụ cho buổi hẹn"}
            />
        </div>
    );
}
export default FirstStep;