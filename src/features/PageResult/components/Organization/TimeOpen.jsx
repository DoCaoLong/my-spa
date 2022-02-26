import React, { useState } from 'react';
import img from '../../../../constants/imageList';
import { imgRotate } from '../../../../utils/imgRotate'

function TimeOpen(props) {
      const { detail } = props;
      const [openTime, setOpenTime] = useState(false);
      const date = new Date();
      const today = date.getDay() + 1;
      const sunday = detail?.opening_time?.slice(6, 7);
      const days = detail?.opening_time?.slice(0, 6);
      const openDay = days?.find((item, index) => index + 2 === today);
      return (
            <>
                  <div className="open-time-block flex-box-row">
                        <img className="icon" src={img.clock} alt="clock icon" />
                        <span className="nunito-text-md text-black-color">
                              Lịch làm việc:
                        </span>
                  </div>
                  <div
                        onClick={() => setOpenTime(!openTime)}
                        className="time-block flex-box-row"
                  >
                        <div
                              className="time-item item flex-box-col"
                        >
                              <span className="day nunito-text-sm text-grey-color time-word__today">
                                    Thứ {today}
                                    <img
                                          style={openTime === true ? imgRotate : {}}
                                          src={img.arrowDownIcon}
                                          alt=""
                                    />
                              </span>
                              <span className="from-to nunito-text-md text-black-color">
                                    {
                                          (openDay?.time_opening === 'on' && openDay?.time_opening &&openDay?.time_opening !== '') ?
                                          `${openDay?.from_time_opening} - ${openDay?.to_time_opening}`
                                          :
                                          'Đóng cửa'
                                    }
                              </span>
                              <div
                                    className={((openTime)?'time-block__list active':'time-block__list')}
                              >
                                    <ul>
                                          {
                                                days?.map((item, index) => (
                                                      <li
                                                            key={index}
                                                            className={(today === index + 2) ? 'active' : ''}
                                                      >
                                                            <span>Thứ {index + 2}</span>
                                                            {
                                                                  (item?.time_opening === 'on' && item?.time_opening &&item?.time_opening !== '') ?
                                                                        <span>
                                                                              {item.from_time_opening} - {item.to_time_opening}
                                                                        </span>
                                                                  :
                                                                        <span>Đóng cửa</span>
                                                            }
                                                      </li>
                                                ))
                                          }
                                    </ul>
                              </div>
                        </div>
                        <div className="time-item item flex-box-col">
                              <span className="day nunito-text-sm text-grey-color">
                                    Chủ nhật
                              </span>
                              <span className="from-to nunito-text-md text-black-color">
                                    {
                                          sunday?.map((item, index) => (
                                                <span key={index}>
                                                      {
                                                            (item?.time_opening === 'on' && item?.time_opening &&item?.time_opening !== '') ?
                                                                  <span>
                                                                        {item.from_time_opening} - {item.to_time_opening}
                                                                  </span>
                                                            :
                                                                  <span>Đóng cửa</span>
                                                      }
                                                </span>
                                          ))
                                    }
                              </span>
                        </div>

                  </div>
            </>
      );
}

export default TimeOpen;