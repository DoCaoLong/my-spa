import React, { useState } from "react";
import { useEffect } from "react";
import img from "../../../constants/imageList";
import AppointmentDetail from "../../AppointmentDetail/index";
import organizationApi from '../../../apis/organizationApi';
import { OnLoad } from '../../Loading/CartItem'
import Error from '../../Error';
export default function AppointmentItem(props) {
  // const { time, nameCalen, nameSpa, addSpa, note, detail } = props;
  const { datalist } = props;
  //get org & branch
  const [org, setOrg] = useState({});
  const tk = ((sessionStorage.getItem('userToken'))?JSON.parse(sessionStorage.getItem('userToken')).context.token:'');
  const [openError, setOpenError] = useState({
    openOther: false,
    error:'',
  });
  const [loadingItem, setLoadingItem] = useState(false);
  const [branch, setBranch] = useState()
  useEffect(() => {
    async function handleGetOrg_Br() {
      setLoadingItem(true)
      try {
        const res = await organizationApi.getById({ id: datalist.org_id, token: tk })
        const data = await res.data.context
        setOrg(data)
        setBranch(data?.branches?.find(item => item.id === datalist.branch_id))
        setLoadingItem(false)
      } catch (e) {
        setLoadingItem(false);
        //console.log(e);
        setOpenError({ openUnAuth: true, openOther:true, error: e })
      }
    }
    handleGetOrg_Br()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datalist.org_id])
  //-----;
  const [openDetail, setOpenDetail] = useState(false);
  
  const checkdotstt = (stt) => {
    switch (stt) {
      case "CONFIRMED":
        return <span className="appoi__detail status-dot-green" />;
      case "ARRIVED":
        return <span className="appoi__detail status-dot-green" />;
      case "NEW":
        return <span className="appoi__detail status-dot-blue" />;
      case "ONL_BOOKING":
        return <span className="appoi__detail status-dot-blue" />;
      case "DONE":
        return <span className="appoi__detail status-dot-purple status-dot" />
      case "CANCEL":
        return <span className="appoi__detail status-dot-red status-dot" />
      case "NOT COME":
        return <span className="appoi__detail status-dot-red status-dot" />
      default:
        break;
    }
  };
  return (
    loadingItem === true ?
      <div
        style={{ width: '100%', height:'100px', margin:'8px 0px' }}
      >
        <OnLoad />
      </div>
      :
      <>
        <li className="appointment__detail--item">
          <div className="appointment__title--time">
            {datalist.time} - {datalist.time_end}
          </div>
          <div className="appointment__title--text appoi__detail">
            {checkdotstt(datalist.status)}
            <div className="appoi__detail--list">
              <h4>
                {/* id: {datalist.id} * */}
                Vào lúc: {datalist.time}
              </h4>
              <ul>
                <li>{org?.name}</li>
                <li>{branch ? branch.full_address : org?.full_address}</li>
                {/* <li>{addSpa}</li> */}
              </ul>
              <div className="appoi__detail--seemore">
                <p
                  className="seemore-title"
                  onClick={() => setOpenDetail(true)}
                >
                  Chi tiết
                </p>
                <img className="" src={img.arrowCalendar} alt="" />
              </div>
            </div>
          </div>
        </li>
        <AppointmentDetail
          detail={datalist}
          org={org}
          branch={branch}
          openDetail={openDetail}
          setOpenDetail={setOpenDetail}
        />
        <Error
            open={openError.openOther}
            setOpen={setOpenError}
            error={openError.error}
        />
      </>
  );
}
