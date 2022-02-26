import React, {useState } from "react";
import Header from "../../../component/ReuseComponent/PurpleTitleSection";
import Input from "../../../component/ReuseComponent/Input";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import {editCheckinInfor} from "../../../redux/serviceBookingListSlice";
FormEditc.propTypes = {
    UserInfor:PropTypes.any
};
FormEditc.defaultProps={
    UserInfor:{

    }
};
function FormEditc({
        UserInfor,
        setOpenForm,
        handleSaveForm,
        handlePrev,
        handleNext,
        ...Iother
    })
    {
        const dispatch = useDispatch();
        const url = "Momo-booking-step-";
        const history = useHistory();
        const [oldName, setNewName] = useState(UserInfor.Name);
        const [oldNumber, setNewNumber] = useState(UserInfor.PhoneNumber);
        const [oldEmail, setNewEmail] = useState(UserInfor.Email);
        function handleSaveClick(){
            //console.log({
            //     oldName,
            //     oldNumber,
            //     oldEmail
            // });
            const action = editCheckinInfor(
                {
                   Name: oldName,
                   PhoneNumber: oldNumber,
                   Email: oldEmail
                }
            );
            dispatch(action);
            history.push(`${url+"5"}`);
        }
        return(
            <div className="page-checkin">
                <div className="wraper-checkin">
                    <Header>
                        
                    </Header>
                    <div className="form-wrap">
                        <form className="form-checkin" action="">
                            
                            <Input
                                labelFor="name"
                                labelText="Họ và tên"
                                InputId='name'
                                name='name'
                                placeholder="Nhập tên của bạn"
                                value={oldName}
                                setValue={setNewName}
                            />
                            <Input
                                labelFor="number"
                                labelText="Số điện thoại"
                                InputId='number'
                                name='number'
                                placeholder="Nhập số điện thoại của bạn"
                                value={oldNumber}
                                setValue = {setNewNumber}
                            />
                            <Input
                                labelFor="email"
                                labelText="Email"
                                InputId='email'
                                name='email'
                                placeholder="Nhập email của bạn"
                                value={oldEmail}
                                setValue = {setNewEmail}
                            />
                            <div className="confirm-btn ">
                                <div className="btn-skip nunito-text-mmd text-primary-color bg-white" onClick={handlePrev} >Quay lại</div>
                                <div className="btn-allow nunito-text-mmd text-white-color bg-purple-color" onClick={handleSaveClick}>Lưu thay đổi</div>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        );
    }
export default FormEditc;