import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import {CircularProgress} from '@mui/material'
import img from '../../constants/imageList';
// import {Link} from 'react-router-dom';
import PopUp from './components/PopUpSuccess';
// import WarningPopUp from './components/PopUpWarning';
import apointmentApi from '../../apis/apointmentApi';
import Error from '../Error';
function ConFirmStep(){
    const bookingForm = useSelector((state)=> state.serviceBooking.bookingConfirm);
    const acc = (useSelector((state)=> state.account.userInfo))||{};
    //console.log(bookingForm);
    const userInfo = acc;
    const time = bookingForm.time;
    const branch = bookingForm.branch;
    const services = bookingForm.listService;
    const orderId =  localStorage.getItem('Momo_orderId');
    // const editUrl = "/Frontend/Momo-booking-step-4";
    const [popUp, setPopUp] = useState(false);
    const [loading,setLoading] = useState(false);
    const [popupTitle,setPopupTitle] = useState('');
    const [popupReason,setPopupReason] = useState('');
    const [popupType,setPopupType] = useState();
    const [note,setNote] = useState('');
    const [openError, setOpenError] = useState({
        openOther: false,
        error: '',
      });
    async function sendApointment(){
        try{
            let tk = ((JSON.parse(sessionStorage.getItem('userToken'))).context.token)||'';
            await apointmentApi.sendApointment(
                {
                    orgId:services[0].locationId,
                    apointment: {
                        "order_id": orderId,
                        "service_ids": bookingForm.listService.map(e => e.id),
                        "time_start": bookingForm.time.timeInserting+':00',
                        "branch_id": bookingForm.branch.id,
                        "note": note || "default"
                    },
                    token:tk
                }
            );
            // const resData = await res.data.context;
            //console.log('res',resData);
            setPopupTitle('Đặt hẹn thành công!');
            setPopupReason('Nếu bạn muốn kiểm tra lịch hẹn đã đặt vui lòng ấn nút Xem lịch hẹn bên dưới nhé.');
            setPopupType(true);
            setPopUp(true);
            setLoading(false);
        }
        catch(e){
            setLoading(false);
            console.error('errors',e);
            setOpenError({ openOther: true, error:e})
        }
    }
    const handleSubmit = () => {
        setLoading(true);
        sendApointment();
        //console.log('form',       
        // {
        //     "service_ids": bookingForm.listService.map(e => e.id),
        //     "time_start": bookingForm.time.timeInserting,
        //     "branch_id": 1,
        //     "note": note
        // });
    }
    return(
        <div className="page-confirm custom-padding">
            <div className="page-title bg-dark-blue-color">
                <h1 className="nunito-text-xl text-white-color ">
                    Xác nhận thông tin đặt hẹn
                </h1>
            </div>
            <div className="confirm-wraper">

                <div className="confirm-item">
                    <div className="confirm-header">
                        <span className="confirm-text nunito-text-sm text-grey-color ">
                            Thông tin checkin
                        </span>
                        {/* <Link to={editUrl}><span className="confirm-edit nunito-text-sm text-primary-color">Chỉnh sửa</span></Link> */}
                    </div>
                    <div className="confirm-body nunito-regular-text-bold-sm text-black-color">
                        <span className="text-capitalize">{userInfo?.fullname}</span>
                        <span className="pdt-2">{userInfo?.telephone}</span>
                        <span className="pdt-2">{userInfo?.email}</span>
                    </div>
                </div>

                <div className="confirm-item mt-16">
                    <div className="confirm-header">
                        <span className="confirm-text nunito-text-sm text-grey-color ">
                            Thời gian
                        </span>
                    </div>
                    <div className="confirm-body nunito-regular-text-bold-sm text-black-color">
                        <span className="text-capitalize">{time.timeShowing}</span>
                    </div>
                </div>

                <div className="confirm-item mt-16">
                    <div className="confirm-header">
                        <span className="confirm-text nunito-text-sm text-grey-color ">
                            Chi nhánh
                        </span>
                    </div>
                    <div className="confirm-body  text-black-color">
                        <div className="confirm-body-wrap">
                            <div className="confirm-body-content">
                                <span className="text-capitalize nunito-regular-text-bold-sm">{branch.name}</span>
                                <span className="text-capitalize nunito-text-md pdt-4">{branch.address}</span>
                            </div>
                            <div className="confirm-body-img">
                                <img className="" src={branch?.image_url||''} onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} alt=""/>
                            </div>
                    </div>
                </div>
                </div>
                <div className="confirm-item mt-16">
                    <div className="confirm-header">
                        <span className="confirm-text nunito-text-sm text-grey-color ">
                            Dịch vụ/Sản phẩm
                        </span>
                    </div>
                    <hr className="confirm-line"/>
                    <div className="service-list nunito-regular-text-bold-sm text-black-color">
                        {services?.map((item,index)=>(
                            <>
                            <div key={index} className="service-item">
                                <div className="service-content">
                                    <div className="service-content-img">
                                        <img className="" src={item?.image_url||''} onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} alt=""/>
                                    </div>
                                    <div className="service-content-title">
                                        {item.serviceName}
                                    </div>
                                </div>
                            </div>
                            {(index !== services.length)&&(<hr className="confirm-line"/>)}
                            </>
                        ))}

                    </div>
                </div>
                <div  className="confirm-item mt-16">
                <div className="confirm-header">
                        <span className="confirm-text nunito-text-sm text-grey-color ">
                            Lưu ý
                        </span>
                    </div>
                    <br/>
                    <textarea className="nunito-text-md text-black-color" name="note" style={{border:'none', backgroundColor:'transparent'}} placeholder='Điền lưu ý ở đây  ......' id="note" cols="30" rows="10" onChange={(e)=>setNote(e.target.value)}>

                    </textarea>
                </div>
            </div>
            <div className="menu-bottom bg-white">
                <div className="flex-box-row">
                    <div>
                        <span className="nunito-text-md text-black-color">Tổng số lượng dịch vụ </span>
                        <span className="nunito-text-md text-grey-color">
                             ( {(services)&& services.length} dịch vụ )
                        </span>
                    </div>
                </div>
                <div className="flex-box-row">
                    <div onClick={handleSubmit} className="btn-confirm-booking nunito-text-mmd bg-purple-color" style={{margin: 'auto'}}>
                        {(loading)?<div className="search__loading-spinner"><CircularProgress color="secondary"/></div>:'Xác nhận đặt hẹn'}
                    </div>
                </div>
            </div>
            <PopUp
            isOpen={popUp}
            setIsOpen={setPopUp}
            title={popupTitle}
            reason={popupReason}
            popUpType={popupType}
            />
            <Error
                open={openError.openOther}
                setOpen={setOpenError}
                error={openError.error}
            />
        </div>

    )
}
export default ConFirmStep;