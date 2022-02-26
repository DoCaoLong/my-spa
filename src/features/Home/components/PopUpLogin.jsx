import React,{useState} from "react";
import { useDispatch, } from "react-redux";
import { Slide, Dialog } from "@mui/material";
import { Button } from "@mui/material";
import img from "../../../constants/imageList";
import accountApi from "../../../apis/accountApi";
import { login } from "../../../redux/accountSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function PopUpLogin(props) {
  const dispatch = useDispatch();
  const { isOpen, setIsOpen } = props;
  const err='';
  const [otp, setOtp] = useState();
  const [error, setError] = useState(err);
  const [title, setTitle] = useState(props.title);
  const [reason, setReason] = useState(props.reason);

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
    } catch (errs) {
        setIsOpen(true);
        setError(true);
      //console.log(errs);
      switch (err.response?.status) {
          case 401:
                setTitle('Đăng nhập thất bại ');
                setReason('Vui lòng đăng nhập vào app Momo!');
                break;
          case 403:
                setTitle('Đăng nhập thất bại!') ;
                setReason('Tài khoản này cần được xác minh bằng otp \n ( Hiện tính năng này Myspa chưa hỗ trợ !)');
                setOtp(true);
                break;
          case 404:
                setTitle('Đăng nhập thất bại!');
                setReason('Vui lòng đăng nhập bằng tài khoảng khác!');
                break;
          case 500:
                setTitle('Đăng nhập thất bại ');
                setReason('Lỗi Server !\n Vui lòng thử lại sau.!');
                break;
          default:
            setTitle('Đăng nhập thất bại ');
            setReason('Vui lòng thử lại sau!');
            break;
      }
      sessionStorage.setItem("userToken", JSON.stringify(errs));
    }
  }
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleAccept = () => {
    setIsOpen(false);
    handleLogin();
  };
  const handleCancle = () =>{
    setIsOpen(false);
  }
  return (
    <div>
      <Dialog
        open={isOpen}
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
          {
          otp?
          (
            <div className="cus-popup-success__control">
                <Button
                className="cus-cart-dock__button cus-popup-delete__btn"
                style={{ width: "100%" }}
                onClick={()=>handleClose()}
                >
                Về trang chủ
                </Button>
            </div>
          ):
            <div className="cus-popup-success__control">
                {(error)?(
                  <Button
                  className="cus-cart-dock__button cus-popup-delete__btn"
                  style={{ width: "100%" }}
                  onClick={()=>handleCancle()}
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
          }
        </div>
      </Dialog>
    </div>
  );
}

export default PopUpLogin;
