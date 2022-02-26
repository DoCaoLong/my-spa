import React, { useContext, useState } from 'react';
//import services from '../../dataMyServices';
import OrgItem from './components/OrgItem';
import OrgSelect from './components/OrgSelect';
import PopupPayment from '../BookingStep/components/PopUpWarning';
import StepChooseBranch from './bookingStep/StepChooseBranch';
import StepChooseTime from './bookingStep/StepChooseTime';
import { useEffect } from 'react';
import { AppContext } from '../../context/AppProvider';

// onload event 
window.addEventListener("scroll", function () {
      const scrolled = window.scrollY;
      var cartBottom = document.querySelector(".my-ser-wrap__button");

      var windowPosition = scrolled > 30;
      if (cartBottom) {
            cartBottom.classList.toggle("my-ser-wrap__button-show", windowPosition);
            const scrollable =
                  document.documentElement.scrollHeight - window.innerHeight;
            if (Math.ceil(scrolled) >= scrollable) {
                  cartBottom.classList.remove("my-ser-wrap__button-show");
            }
      }
});
//////
      

function ServicesNotBook(props) {
      const { 
            tab, 
            orgAll, 
            setOrgAll,
            services 
      } = props;
      const { setSerBooking, setOrgBooking, openNextBranches, setOpenNextBranches } = useContext(AppContext)
      const [isOpen, setIsOpen] = useState(false);
      const [chooseOrg, setChooseOrg] = useState();
      const [nextStepTime, setNextStepTime] = useState(false);
      const [bookServices, setBookServices] = useState([])
      //const [orgAll, setOrgAll] = useState([]);
      const [branches, setBranches] = useState();
      const org_list = [];
      for (var item_ser of services) {
            const org = { org_id: item_ser.organization_id }
            org_list.push(org)
      }
      function unique(arr) {
            var newArr = []
            for (var i = 0; i < arr.length; i++) {
                  if (newArr.indexOf(arr[i].org_id) === -1) {
                        newArr.push(arr[i].org_id)
                  }
            }
            return newArr
      }
      const orgs = unique(org_list);
      const orgLength = bookServices.filter(item => item.organization_id === bookServices[0]?.organization_id)
      const gotoBookingStep = () => {
            if (bookServices.length > 0) {
                  if (bookServices.length === orgLength.length) {
                        if (branches.length > 0) {
                              setOpenNextBranches(true);
                        } else {
                              setNextStepTime(true)
                        }
                        setSerBooking(bookServices)
                  } else {
                        setIsOpen(true)
                  }
            }
      }
      useEffect(()=>{
            if(bookServices){
                  const arr = orgAll.filter(item => item.id === bookServices[0]?.organization_id)
                  setBranches(arr[0]?.branches)
                  setOrgBooking(arr[0])
            }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[bookServices])
      useEffect(()=>{
            if(bookServices.length === 0){
                  setChooseOrg();
            }
      },[bookServices.length])
      return (
            <>
                  <div 
                        className="my-ser-wrap"
                        style={tab === 1 ? { display: 'block' } : { display: 'none' }}
                  >
                        <OrgSelect
                              orgAll={orgAll}
                              chooseOrg={chooseOrg}
                              setChooseOrg={setChooseOrg}
                              services={services}
                              setBookServices={setBookServices}
                        />
                        <ul
                              className="my-ser-wrap__org"
                        >
                              {
                                    orgs.map((org, index) => (
                                          <OrgItem
                                                key={index}
                                                org_id={org}
                                                services={services}
                                                bookServices={bookServices}
                                                setBookServices={setBookServices}
                                                setOrgAll={setOrgAll}
                                                chooseOrg={chooseOrg}
                                                setChooseOrg={setChooseOrg}
                                                setIsOpen={setIsOpen}
                                          />
                                    ))
                              }
                        </ul>
                        <div className="my-ser-wrap__button">
                              <span className="my-ser-wrap__button-head">
                                    Đã chọn <span>{bookServices.length}</span> dịch vụ
                              </span>
                              <button
                                    style={bookServices.length === 0 ? { opacity: '0.4' } : { opacity: '1' }}
                                    onClick={gotoBookingStep}
                              >
                                    Đặt hẹn ngay
                              </button>
                        </div>
                  </div>
                  {/* dialog & step */}
                  <PopupPayment
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        reason="Bạn chỉ đặt hẹn các dịch vụ cùng lúc tại một cơ sở. Nếu bạn chọn đặt hẹn dịch vụ tại “Spa Name 2”, các dịch vụ bạn chọn ở “Spa Name 1” sẽ bị hủy.
                        Bạn có muốn tiếp tục?"
                  />
                  <StepChooseBranch
                        open={openNextBranches}
                        setOpen={setOpenNextBranches}
                        branches={branches}
                  />
                  {/* if org null branch */}
                  <StepChooseTime
                        open={nextStepTime}
                        setOpen={setNextStepTime}
                        is_dialog={true}
                  />
            </>
      );
}

export default ServicesNotBook;