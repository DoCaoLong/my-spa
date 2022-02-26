import React,{useState} from "react";
import {useHistory} from 'react-router-dom';
import { useDispatch, } from "react-redux";
import { Slide, Dialog } from "@mui/material";
import { Button } from "@mui/material";
import img from "../../../constants/imageList";
import accountApi from "../../../apis/accountApi";
import { login } from "../../../redux/accountSlice";
import {clearAllCarts} from '../../../redux/CartSlice';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function PopUpLogin(props) {
    const history = useHistory();
  const dispatch = useDispatch();
  const { isOpen, setIsOpen } = props;
  let err;
  const [error, setError] = useState(err);
  const [title, setTitle] = useState(props.title);
  const [reason, setReason] = useState(props.reason);
//   (props.err)&&(setError(true));
  async function handleLogin() {
    try {
      //__________________________
      const res = await accountApi.loginUser();
      const resData = await res.data;
      sessionStorage.setItem("userToken", JSON.stringify(resData));
      //__________________________
      // const userInfo = await accountApi.getAccount();
      // const userData = await userInfo.data;
      //__________________________
      dispatch(login(resData));
    } catch (err) {
        setIsOpen(true);
        setError(true)
        setTitle('Đăng nhập thất bại ');
        setReason('đã xảy ra lỗi trong quá trình đăng nhập vui lòng thử lại sau!');
        localStorage.removeItem('myspa-cart');
        dispatch(clearAllCarts());
      //console.log(err);
    }
  }
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleAccept = () => {
    setIsOpen(false);
    handleLogin();
  };
  return (
    <div>
      <Dialog
        open={isOpen || false}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="cus-popup-success">
          <img src={img.LocationRequest} alt="" />
          <h1
            className="pdt-24 pdb-4 nunito-regular-text-bold-sm"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h1>

          <p
            className="pdb-24"
            dangerouslySetInnerHTML={{ __html: reason }}
          ></p>
          <div className="cus-popup-success__control">
              {(error)?(
                <Button
                className="cus-cart-dock__button cus-popup-delete__btn"
                style={{ width: "100%" }}
                onClick={()=>history.push('/')}
                >
                 Về trang chủ
                </Button>
              ):(
                  <>
            <Button
              className="cus-cart-dock__button cus-popup-delete__btn"
              style={{ width: "100%" }}
              onClick={handleClose}
            >
              Bỏ qua
            </Button>
            <Button
              className="cus-cart-dock__button cus-popup-delete__btn"
              style={{ width: "100%" }}
              onClick={handleAccept}
            >
              Cho phép
            </Button>
            </>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default PopUpLogin;
