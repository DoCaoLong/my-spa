import React, { useContext } from 'react';
import TabCombo from '../Combos/TabCombo';
import TabProducts from '../Products/TabProducts';
//import TabProduct from '../Products/TabProduct'

import TabService from '../Servicess/TabService';
import { OnLoad } from '../../../Loading/CartItem';
import { AppContext } from '../../../../context/AppProvider';
const tabs = ['Dịch vụ', 'Sản phẩm', 'Combo'];
function ServiceList(props) {
      const {chooseTab, setChooseTab} = useContext(AppContext)
      const {
            org,
            loading,
            branchList,
            setIsOpen,
            api_token,
            setNewItemCart,
            imageDefault
      } = props;
      
      //Tab
      const handleChooseTag = (tab) => {
            setChooseTab(tab);
      }
      return (
            <div className="service-section bg-white">
                  <div className="page-title">
                        <ul className="page-detail__tab">
                              {
                                    (loading) ?
                                          (
                                                <>
                                                      <div
                                                            style={{ width: 'calc(100%/3)' }}
                                                            className="cate_on_load non_mg_left"
                                                      >
                                                            <OnLoad />
                                                      </div>
                                                      <div
                                                            style={{ width: 'calc(100%/3)' }}
                                                            className="cate_on_load"
                                                      >
                                                            <OnLoad />
                                                      </div>
                                                      <div
                                                            style={{ width: 'calc(100%/3)' }}
                                                            className="cate_on_load"
                                                      >
                                                            <OnLoad />
                                                      </div>
                                                </>
                                          )
                                          :
                                          tabs.map(item => (
                                                <li key={item}>
                                                      <button
                                                            className={(chooseTab === item)?'active':''}
                                                            onClick={() => handleChooseTag(item)}
                                                      >
                                                            {item}
                                                      </button>
                                                </li>
                                          ))
                              }
                        </ul>
                  </div>
                  <TabService
                        chooseTab={chooseTab}
                        org={org}
                        branchList={branchList}
                        setIsOpen={setIsOpen}
                        token={api_token}
                        setNewItemCart={setNewItemCart}
                        imageDefault={imageDefault}
                  />
                  <TabProducts
                        chooseTab={chooseTab}
                        org={org}
                        api_token={api_token}
                        branchList={branchList}
                        setIsOpen={setIsOpen}
                        setNewItemCart={setNewItemCart}
                        imageDefault={imageDefault}
                  />
                  {/* <TabProduct
                        chooseTab={chooseTab}
                        org={org}
                        api_token={api_token}
                        branchList={branchList}
                        setIsOpen={setIsOpen}
                        setNewItemCart={setNewItemCart}
                        imageDefault={imageDefault}
                  /> */}
                  <TabCombo
                        chooseTab={chooseTab}
                        org={org}
                        branchList={branchList}
                        setIsOpen={setIsOpen}
                        setNewItemCart={setNewItemCart}
                        imageDefault={imageDefault}
                  />
            </div>
      );
}

export default ServiceList;