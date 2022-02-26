import React, { useContext } from 'react';
import img from '../../../constants/imageList';
import OrgSelectItem from './OrgSelectItem';
import { AppContext } from '../../../context/AppProvider'

function showOrgList() {
      document.querySelector('.my-ser-list-org').classList.toggle('my-ser-list-org__show')
}
function unique(arr) {
      var newArr = []
      for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i].id) === -1) {
                  newArr.push(arr[i].id)
            }
      }
      return newArr
}
function OrgSelect(props) {
      const { setBrBooking } = useContext(AppContext)
      const { orgAll, chooseOrg, setChooseOrg, services, setBookServices } = props;
      const handleChooseOrg = (item) => {
            setChooseOrg(item)
            setBrBooking();
            const list = services.filter(ser => ser.organization_id === item)
            setBookServices(list);
      }
      const orgAllId = unique(orgAll);
      return (
            <div
                  style={{
                        position: 'sticky',
                        top: '0',
                        zIndex: '2',
                        backgroundColor: 'var(--bgWhite)',
                        paddingTop:'12px'
                  }}
            >
                  <div 
                        onClick={()=>showOrgList()}
                        className="my-ser-box"
                  >
                        <div className="servicepack-filter-wrap">
                              <span className="servicepack-filter-input nunito-text-md text-grey-color ">
                                    {chooseOrg ?
                                          `${orgAll.find(item => item.id === chooseOrg).name}`
                                          :
                                          'Chọn doanh nghiệp bạn muốn đặt hẹn'
                                    }
                              </span>
                              <img
                                    className="servicepack-filter-btn"
                                    src={img.arrowDownIconWhite}
                                    alt=""
                              />
                        </div>
                        <ul
                              className="my-ser-list-org"
                        >
                              {
                                    orgAllId.map((item, index) => (
                                          <OrgSelectItem
                                                key={index}
                                                item={item}
                                                orgAll={orgAll}
                                                chooseOrg={chooseOrg}
                                                handleChooseOrg={handleChooseOrg}
                                          />
                                    ))
                              }
                        </ul>
                  </div>
            </div>
      );
}

export default OrgSelect;