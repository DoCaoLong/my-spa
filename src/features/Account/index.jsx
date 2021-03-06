import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../../constants/imageList";
import Head from "../../component/HeadTag/default";
import { Account_detail } from "../../component/Constant/MetaConst";
import Footer from "../../component/ViewCommon/FooterWrap";
import EditForm from "./components/Edits";
import { useSelector, useDispatch } from "react-redux";
import PopUp from "./components/warningPopUp";
import { updateAvatar } from "../../redux/accountSlice";
import { motion } from 'framer-motion';
import framerConfig from '../../utils/framerConfig';

function Account(props) {
      const acc = (useSelector((state) => state.account.userInfo)) || {};
      const dispatch = useDispatch();
      const [openEditForm, setOpenEditForm] = useState(false);
      const [avatar, setAvatar] = useState(null);
      const [popUp, setPopUp] = useState(false);
      // const userToken = sessionStorage.getItem("userToken");
      // let  isUser;
      // if (!userToken) {
      // isUser = false;
      // }
      // const [popUpLogin, setPopUpLogin] = useState(isUser);
      // //console.log('acc', acc);
      const imageUpload = (props) => {
            // //console.log('props');
            // //console.log(props.files[0]);
            const formData = new FormData();
            if (props.files[0].size > 2097152) {
                  // //console.log('file is not valid valid');
                  setPopUp(true);
            } else if (
                  props.files[0].type !== "application/pdf" &&
                  props.files[0].type !== "application/wps-office.pdf" &&
                  props.files[0].type !== 'application/pdf' &&
                  props.files[0].type !== 'image/jpg' &&
                  props.files[0].type !== 'image/jpeg' &&
                  props.files[0].type !== "image/png"
            ) {
                  // //console.log('file not valid 2');
                  setPopUp(true);
            } else {
                  setAvatar(props.files[0]);
                  formData.append(
                        "myFile",
                        props.files[0],
                        props.files[0].name
                  );
                  dispatch(updateAvatar(formData));
                  // //console.log('file valid')
            }
      }
      // const handleOpenEditForm = () => {
      //       setOpenEditForm(true);
      // };
      return (
            <motion.div
                  variants={framerConfig}
                  initial='hidden'
                  animate='show'
                  exit={{
                        opacity: 0, transition: { duration: 0.5 }
                  }}
            >
                  <Head
                        Title={Account_detail.title}
                        Description={Account_detail.description}
                  ></Head>
                  <div className="wraper padding-unset-bottom padding-unset-bottom bg-dark-grey-color cls-relative" id="MainSection">
                        <div className="layer-purple-custom">

                        </div>
                        <div className="acc-info-section flex-box-col">
                              <div className="avatar-section bg-white flex-box-col">
                                    <div className="avatar ">
                                          {(avatar) ? <img className="image-size" src={URL.createObjectURL(avatar)} onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }} alt="avatar" /> :
                                                (<div className="error-avatar"><img className="image-size " src={img.female_ava} alt="avatar" /></div>)
                                          }
                                    </div>
                                    <div className="icon-upload bg-purple-color flex-box-row">
                                          <label htmlFor="file">
                                                <img src={img.camera} onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }} alt="icon" />
                                          </label>
                                          <input hidden type="file" id="file" name="file" onChange={(e) => imageUpload(e.target)} accept="image/*" />
                                    </div>
                              </div>
                              <div className="infor-section bg-white flex-box-col">
                                    <div className="account-name">
                                          <span className="nunito-regular-text-xl" style={{ display: "flex", justifyContent: "center" }}>
                                                Th??ng tin ng?????i d??ng
                                                <div
                                                      // onClick={handleOpenEditForm}
                                                      className="margin-left-sm">
                                                      {/* <img src={img.editPurple} onError={(e)=>{e.target.src=img.logoMyspa;e.target.style.objectFit='contain';e.target.style.transform='scale(0.5)'}} alt="icon" /> */}
                                                </div>
                                          </span>
                                    </div>
                                    <div className="flex-box-row info-line">
                                          <span className="nunito-text-sm text-grey-color">
                                                H??? v?? t??n
                                          </span>
                                          <span className="nunito-text-sm text-grey-color">
                                                {(acc) && acc.fullname}
                                          </span>
                                    </div>
                                    <hr className="grey-line" />
                                    <div className="flex-box-row info-line">
                                          <span className="nunito-text-sm text-grey-color">
                                                S??? ??i???n tho???i
                                          </span>
                                          <span className="nunito-text-sm text-grey-color">
                                                {(acc) && acc.telephone}
                                          </span>
                                    </div>
                                    <hr className="grey-line" />
                                    <div className="flex-box-row info-line">
                                          <span className="nunito-text-sm text-grey-color">
                                                Email
                                          </span>
                                          <span className="nunito-text-sm text-grey-color">
                                                {(acc && acc.email !== 'undefined') && acc.email}
                                          </span>
                                    </div>
                                    <hr className="grey-line" />
                              </div>
                              <div className="other-btn bg-white">
                                    {/* <Link to="/Frontend/My-services">
                                          <div className="nunito-regular-text-xl text-black-color">
                                                Danh s??ch d???ch v???
                                          </div>
                                    <hr className="grey-line" />
                                    </Link> */}
                                    <Link to="/My-orders">
                                          <div className="nunito-regular-text-xl text-black-color">
                                                L???ch s??? ????n h??ng
                                          </div>
                                    <hr className="grey-line" />
                                    </Link>
                                    <Link to="/Frontend/Calendar">
                                          <div className="nunito-regular-text-xl text-black-color">
                                                L???ch h???n
                                          </div>
                                    </Link>
                              </div>
                              <div className="other-btn bg-white">
                                    <Link to="/Frontend/User-guide">
                                          <div className="nunito-regular-text-xl text-black-color">
                                                H?????ng d???n s??? d???ng
                                          </div>
                                    </Link>
                              </div>
                        </div>
                  </div>
                  <Footer ActiveIcon="userIconActive" />
                  <EditForm
                        openForm={openEditForm}
                        setOpenForm={setOpenEditForm}
                        UserInfor={acc}
                  />
                  <PopUp
                        isOpen={popUp}
                        setIsOpen={setPopUp}
                        reason={"Vui l??ng ch??? ch???n h??nh ???nh ????? l??m avatar"}
                  />
                  {/* <PopUpLogin
                  isOpen={popUpLogin}
                  setIsOpen={setPopUpLogin}
                  title="Y??u c???u truy c???p th??ng tin"
                  reason={
                  "Cho ph??p s??? d???ng th??ng tin <b>H??? t??n, S??? ??i???n tho???i, Email</b> c???a b???n ????? b???t ?????u tr???i nghi???m thi??n ???????ng l??m ?????p"
                  }
                  /> */}
            </motion.div>
      );
}

export default Account;
