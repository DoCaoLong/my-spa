import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import organizationApi from '../../../apis/organizationApi';
import { Checkbox } from '@mui/material';
import { AppContext } from '../../../context/AppProvider';
import formatNumber from '../../../commons/formatPrice';
import Skeleton from 'react-loading-skeleton';
import Error from '../../Error';

function showButtonApp() {
      document.querySelector(".my-ser-wrap__button").classList.remove("my-ser-wrap__button-show");
}

function OrgItem(props) {
      const { setBrBooking } = useContext(AppContext);
      const tk = ((sessionStorage.getItem('userToken'))?JSON.parse(sessionStorage.getItem('userToken')).context.token:'');
      const {
            org_id,
            services,
            bookServices,
            setBookServices,
            setOrgAll,
            chooseOrg,
            setChooseOrg,
            setIsOpen
      } = props;
      const [org, setOrg] = useState();
      const [loading, setLoading] = useState(false);
      // Error catch 
      const [openError, setOpenError] = useState({
            openOther: false,
            error:'',
      });
      // -----------

      useEffect(() => {
            setLoading(true)
            async function handleGetOrgById() {
                  try{
                  const res = await organizationApi.getById({ id: org_id, branches: true, token: tk });
                  setOrg(res.data.context);
                  setLoading(false);
                  setOrgAll(prev => [...prev, res.data.context])
                  }catch(err){
                        setOpenError({ openOther:true, error: err }) 
                  }
                  
            }
            handleGetOrgById();
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [org_id])
      const onChooseOrg = () => {
            showButtonApp();

            setBrBooking();
            if (setChooseOrg) {
                  setChooseOrg(org_id)
                  const list = services.filter(item => item.organization_id === org_id)
                  setBookServices(list);
            }
      }
      const handleChooseService = (ser) => {
            showButtonApp();

            setBrBooking()

            if (ser.organization_id !== chooseOrg && chooseOrg) {
                  setIsOpen(true)
            }
            setChooseOrg(ser.organization_id)
            setBookServices(bookServices.filter(item => item.organization_id === org_id))

            const isChoose = bookServices.includes(ser);
            setBookServices(prev => {
                  if (isChoose) {
                        return bookServices.filter(item => item !== ser)
                  } else {
                        return [...prev, ser]
                  }
            })
      }
      return (
            loading === true ?
                  <Skeleton style={{ width: '100%', height: '150px', margin:'16px 0px' }} />
                  :
                  <>
                        <h3
                              id={org_id}
                              className="flex-row my-ser__org"
                              onClick={onChooseOrg}
                        >
                              <Checkbox
                                    checked={chooseOrg === org_id}
                                    inputProps={{ 'aria-label': 'controlled' }}
                              />
                              {org?.name}
                        </h3>
                        <ul>
                              {
                                    services.filter(item => item.organization_id === org_id).map((ser, index) => (
                                          <li
                                                key={index}
                                                onClick={() => handleChooseService(ser)}
                                          >
                                                <div className="flex-row my-ser__org-ser-item">
                                                      <Checkbox
                                                            checked={bookServices.includes(ser)}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                      />
                                                      <div className="flex-row-sp item">
                                                            <img
                                                                  src={"https://picsum.photos/137/96?random=" + ser.id}
                                                                  alt=""
                                                            />
                                                            <div className="item-cnt">
                                                                  <p className='ser-name'>{ser.service_name}</p>
                                                                  <p className="ser-org">{org?.name}</p>
                                                                  <span className="flex-row ser-quantity">
                                                                        Số buổi:
                                                                        <p>{ser.quantity}</p>
                                                                        Thời gian:
                                                                        <p>{ser.duration} phút</p>
                                                                  </span>
                                                                  <p className="ser-price">
                                                                        {formatNumber(ser.price)}đ
                                                                  </p>
                                                            </div>
                                                      </div>
                                                </div>
                                          </li>
                                    ))
                              }
                        </ul>
                        <Error
                              open={openError.openOther}
                              setOpen={setOpenError}
                              error={openError.error}
                        />
                  </>
      );
}

export default OrgItem;