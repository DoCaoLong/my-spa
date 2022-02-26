import React from 'react';
import img from '../../../constants/imageList';

function dropList(){
      document.querySelector('.mt-ye__list').classList.toggle('mt-ye__list-drop')
}
function dropListYear(){
      document.querySelector('.mt-ye__list-year').classList.toggle('mt-ye__list-year__drop')
}

function MothYear(props) {
      const {time, setTime} = props
      const months = [];
      const years = []
      for (var i = 1; i <= 12; i++) {
            months.push(i)
      }
      for (var j = 2000; j <= 2100; j++) {
            years.push(j)
      }
      const onDropMonth=()=>{
            dropList()
      }
      const onChooseMonth = (month) => {
            setTime({
                  ...time,
                  month: month
            })
      }
      const onChooseYear=(year)=>{
            setTime({
                  ...time,
                  year: year
            })
      }
      return (
            <div className='flex-row-sp mt-ya-cnt'>
                  <span className="mt-ye__title">
                        Xem theo :
                  </span>
                  <div
                        className='flex-row'
                  >
                        <div 
                              className="mt-ye__box"
                              onClick={onDropMonth}
                        >
                              <span className="mt-ye__box-select">
                                    Tháng {time.month}
                                    <img src={img.arrowDownIcon} alt="" />
                              </span>
                              <div className='mt-ye__list'>
                                    <ul>
                                          {
                                                months.map(item => (
                                                      <li
                                                            key={item}
                                                            onClick={() => onChooseMonth(item)}
                                                            style={item === time.month ? { color: 'var(--purple)' } : {}}
                                                      >
                                                            Tháng {item}
                                                      </li>
                                                ))
                                          }
                                    </ul>
                              </div>
                        </div>
                        <div className="mt-ye__box" onClick={()=>dropListYear()}>
                              <span className="mt-ye__box-select">
                                    Năm {time.year}
                                    <img src={img.arrowDownIcon} alt="" />
                              </span>
                              <div className='mt-ye__list-year'>
                                    <ul>
                                          {
                                                years.map(item => (
                                                      <li
                                                            onClick={()=>onChooseYear(item)}
                                                            key={item}
                                                            style={item === time.year ? { color: 'var(--purple)' } : {}}
                                                      >
                                                            Năm {item}
                                                      </li>
                                                ))
                                          }
                                    </ul>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default MothYear;