import React from 'react';
import img from '../../constants/imageList';
function PopUP(props){
    return (
        <div className="page-confirm-status">
            <div className="status-wraper">
                <div className="status-content text-center">
                    <div className="status-img">
                        <img src={img.logoMyspa}  alt=""/>
                    </div>
                    <h3 className="text-black-color status-title">Thanh toán dịch vụ Myspa qua ví điện tử momo</h3>
                    <p className="text-primary-color status-price status-price">
                        300.000đ
                    </p>
                </div>
                <div className="confirm-btn">
                    <div className="btn-allow text-white-color bg-purple-color status-btn">Thanh toán bằng ứng dụng Momo
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PopUP;