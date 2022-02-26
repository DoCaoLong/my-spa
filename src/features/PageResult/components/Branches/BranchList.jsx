import React from 'react';
import BranchListUp from './BranchListUp';
import BranchItem from '../../../ViewItem/BranchItem/index'
import { useState } from 'react';

const styles = {
      paddingItem: '4px 6px',
      borderRadius: '12px'
}
function BranchList(props) {
      const { branches, organiDetail, imageDefault } = props;
      const [openAllBranch, setOpenAllBranch] = useState(false)
      return (
            <>
                  <div className="branch-list-section bg-white">
                        <h3 className="nunito-text-xl text-primary-color text-align-center">
                              Danh sách chi nhánh ({branches?.length} chi nhánh)
                        </h3>
                        <div className="list-group flex-box-col">
                              {
                                    branches?.slice(0, 3).map(item => (
                                          <BranchItem
                                                key={item.id}
                                                dataBranch={item}
                                                org={organiDetail}
                                                imageDefault={imageDefault}
                                                styles={styles}
                                          />
                                    ))
                              }
                        </div>
                        {
                              branches?.length > 3 ?
                                    <div className="branch-list-section__more">
                                          <button
                                                onClick={() => setOpenAllBranch(true)}
                                          >
                                                Xem thêm {branches?.length - 3} cơ sở khác
                                          </button>
                                    </div>
                                    :
                                    <></>
                        }
                  </div>
                  <BranchListUp
                        org={organiDetail}
                        openAllBranch={openAllBranch}
                        imageDefault={imageDefault}
                        setOpenAllBranch={setOpenAllBranch}
                        branches={branches}
                  />
            </>
      );
}

export default BranchList;