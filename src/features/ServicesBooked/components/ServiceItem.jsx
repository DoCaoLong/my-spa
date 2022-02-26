import React, { useState } from 'react';
import AppointmentDetail from '../../AppointmentDetail/index';
import img from '../../../constants/imageList';

function ServiceItem(props) {
      const { org, ser } = props;
      const [openDetail, setOpenDetail] = useState(false)


      const timeStart = ser?.time_start?.split(' ');
      const branch = org?.branches?.find((item) => item.id === ser?.branch_id)
      const d = new Date();
      const toMonth = d.getMonth() + 1;
      const toDate = d.getDate();
      const today = `${d.getFullYear()}${toMonth < 10 ? `0${toMonth}` : toMonth}${toDate < 10 ? `0${toDate}` : toDate}`;
      const timeAppArr = timeStart[0]?.split('-');
      const timeArr = `${timeAppArr[0]}${timeAppArr[1]}${timeAppArr[2]}`
      return (
            <li>
                  <div className="flex-row my-ser__org-ser-item">
                        <div
                              style={{ width: '100%' }}
                              className="flex-row-sp item"
                        >
                              <img
                                   src={org?.image_url}
                                   onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }}
                                   alt=""
                              />
                              <div
                                    style={{ width: 'calc(100% - 137px)' }}
                                    className="item-cnt"
                              >
                                    <p className='ser-name'>{org?.name}</p>
                                    <p className="ser-org">{branch?.full_address}</p>
                                    <span className="flex-row ser-quantity">
                                          Thời gian:
                                          <p>{timeStart[1]}, {timeStart[0]}</p>
                                    </span>
                                    <p className="flex-row-sp ser-price">
                                          <span
                                                style={
                                                      parseInt(timeArr) >= parseInt(today) ?
                                                            {
                                                                  backgroundColor: 'var(--green)'
                                                            } :
                                                            {
                                                                  backgroundColor: 'var(--red)'
                                                            }
                                                }
                                          >
                                                {parseInt(timeArr) >= parseInt(today) ? 'Lịch hẹn sắp tới' : 'Lịch hẹn đã qua'}
                                          </span>
                                          <span
                                                onClick={() => setOpenDetail(true)}
                                          >
                                                Chi tiết
                                          </span>
                                    </p>
                              </div>
                        </div>
                  </div>
                  {/* show detail appointment */}
                  <AppointmentDetail
                        openDetail={openDetail}
                        setOpenDetail={setOpenDetail}
                        detail={{ ...ser, time: timeStart[1], date: timeStart[0] }}
                        org={org}
                        branch={branch}
                        time={timeStart[1]}
                  />
            </li>
      );
}

export default ServiceItem;