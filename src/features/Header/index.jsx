import React from 'react';
import img from '../../constants/imageList';
import {useHistory} from 'react-router-dom';
import scrollTop from '../../utils/scrollTop'

function Header(props) {
      const {
            urlPrev,
            headerTitle,
            isNotBtn,
            pb_8,height_52,isShowBackBtn,center,
            setOpenForm,
            inAppointDetail,
            customStyle,
            setOpenQr,
      } = props;
      const history=useHistory();
      const handleGoBack = () => {
            if (setOpenForm) {
                  setOpenForm(false);
            } else if (urlPrev && urlPrev !== '') {
                  history.push(urlPrev)
            } else {
                  history.goBack();
            }
            scrollTop();
      }
      const openQrAppointDetail=()=>{
            if(setOpenQr){
                  setOpenQr(true)
            }
      }
      return (
            <div className="cus-header" style={{paddingBottom: pb_8, height:height_52, justifyContent: center,...customStyle}}>
                  {(isNotBtn)?(<div></div>):(
                  <button
                        style={{display: isShowBackBtn}}
                        // onClick={()=> history.push(urlPrev)}
                        onClick={handleGoBack} 
                        className="cus-header__back-btn"
                        >
                        <img src={img.chevronLeft} alt="" />
                  </button>
                  )}
                  <span className="cus-header__title" dangerouslySetInnerHTML={{ __html: headerTitle }}>
                  </span>
                  <div className="cus-header__right">
                        {
                              inAppointDetail === true ?
                                    <img onClick={openQrAppointDetail} src={img.qrCode} alt="" />
                                    :
                                    <></>
                        }
                  </div>
            </div>
      );
}

export default Header;