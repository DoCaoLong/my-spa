import React, { useState, useContext } from 'react';
import { Dialog, Slide } from '@mui/material';
import CheckBranchItem from '../../BookingStep/components/CheckBranchItem'
import StepChooseTime from './StepChooseTime';
import {AppContext} from '../../../context/AppProvider';
import PopUp from '../../BookingStep/components/PopUpWarning';

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="left" ref={ref} {...props} />;
});
const is_dialog = true;
function StepChooseBranch(props) {
      const {setBrBooking, brBooking} = useContext(AppContext)
      const { open, setOpen, branches } = props;
      const [openNext, setOpenNext] = useState(false)
      const [popUp, setPopUp] = useState(false);
      ////console.log(branches);
      const handleNextStep=()=>{
            if(brBooking){
                  setOpenNext(true)
            }else{
                  setPopUp(true)
            }
      }
      return (
            <Dialog
                  fullScreen
                  open={open}
                  TransitionComponent={Transition}
            >
                  <div className="page-checkin">
                        <div className="wraper-checkin">
                              <div className="page-title bg-dark-blue-color">
                                    <h1 className="nunito-text-xl text-white-color ">
                                          Chọn chi nhánh
                                    </h1>
                              </div>
                              <div className="cus-cart-list ">
                                    {
                                          branches?.map((item, index) => (
                                                <CheckBranchItem
                                                      key={index}
                                                      branchItem={item}
                                                      setBrBooking={setBrBooking}
                                                />
                                          ))
                                    }
                                    <div className="confirm-btn branch_cart-btn">
                                          <div
                                                className="btn-skip nunito-text-mmd text-primary-color bg-white"
                                                onClick={() => setOpen(false)}
                                          >
                                                Quay lại
                                          </div>
                                          <div
                                                className="btn-allow nunito-text-mmd text-white-color bg-purple-color"
                                                onClick={handleNextStep}
                                          >
                                                Tiếp tục
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <PopUp
                              isOpen={popUp}
                              setIsOpen={setPopUp}
                              reason={"Vui lòng chọn địa điểm cho buổi hẹn"}
                        />
                  </div>
                  <StepChooseTime
                        open={openNext}
                        setOpen={setOpenNext}
                        is_dialog={is_dialog}
                  />
            </Dialog>
      );
}

export default StepChooseBranch;