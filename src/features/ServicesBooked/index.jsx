import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import MothYear from './components/MothYear';
import OrgItem from './components/OrgItem';
import PageNullResult from '../PageNotResult';
import apointmentApi from '../../apis/apointmentApi';


function unique(arr) {
      var newArr = []
      for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) {
                  newArr.push(arr[i])
            }
      }
      return newArr
}

function ServicesBooked(props) {
      const { tab } = props;
      const d = new Date();
      const [time, setTime] = useState({
            month: d.getMonth() + 1,
            year: d.getFullYear()
      })
      const [allOrg, setAllOrg] = useState([])
      const [apps, setApps] = useState([])
      const timeParams = `${time.year}-${time.month < 10 ? `0${time.month}` : time.month}`;
      const tk = ((JSON.parse(sessionStorage.getItem('userToken')))?.context.token)||'';
      //const tk = '413|vzYArAdwXqwUWPIdgXM0f3MeJ5DW4xBVoDASFzxh'
      useEffect(()=>{
            async function handleGetApps(){
                  try {
                        const res = await apointmentApi.getAppoitment({
                              month: timeParams, token:tk
                        })
                        setApps(res.data.context.data)
                  } catch (error) {
                        console.log(error)
                  }
            }
            handleGetApps()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[timeParams])
      const orgs_id = apps.map((item) => item.organization_id)
      const orgs_id_list = unique(orgs_id);
      return (
            <div
                  className='my-ser-wrap'
                  style={tab === 2 ? { display: 'block' } : { display: 'none' }}>
                  <MothYear
                        time={time}
                        setTime={setTime}
                  />
                  {
                        apps.length === 0 ?
                              <PageNullResult
                                    title="Không có lịch hẹn"
                                    text={`Thành thật xin lỗi !\n Bạn không có lịch hẹn nào vào tháng ${time?.month} năm ${time?.year}`}
                              />
                              :
                              orgs_id_list.map(item => (
                                    <OrgItem
                                          allOrg={allOrg}
                                          setAllOrg={setAllOrg}
                                          key={item}
                                          services={apps}
                                          org_id={item}
                                    />
                              ))
                  }
            </div>
      );
}

export default ServicesBooked;