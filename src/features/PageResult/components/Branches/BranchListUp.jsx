import React from 'react';
import img from '../../../../constants/imageList';
import BranchItem from '../../../ViewItem/BranchItem/index';
import {Slide, Dialog} from '@mui/material'


const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
      paddingItem: '4px 6px',
      borderRadius: '12px'
}
function BranchListUp(props) {
      const { openAllBranch, setOpenAllBranch, branches, org, imageDefault } = props;
      return (
            <Dialog
                  fullScreen
                  open={openAllBranch}
                  TransitionComponent={Transition}
            >
                  <div
                        //  style={openAllBranch === true ? { marginTop: '0px' } : { marginTop: '100vh' }}
                        className="up-branch-list"
                  >
                        <div className="up-branch-list__cnt">
                              <div className="up-branch-list__cnt-head">
                                    <div></div>
                                    <span className="nunito-text-xl text-primary-color text-align-center">
                                          Danh sách cơ sở
                                    </span>
                                    <img onClick={() => setOpenAllBranch(false)} src={img.closeCircle} alt="" />
                              </div>
                              <div className="up-branch-list__cnt-list">
                                    <div className="list-group flex-box-col">
                                          {
                                                branches?.slice(3, branches.length).map(item => (
                                                      <BranchItem
                                                            org={org}
                                                            key={item.id}
                                                            dataBranch={item}
                                                            imageDefault={imageDefault}
                                                            styles={styles}
                                                            setOpenAllBranch={setOpenAllBranch}
                                                      />
                                                ))
                                          }
                                    </div>
                              </div>
                        </div>
                  </div>
            </Dialog>
            // <div
            //       style={openAllBranch === true ? { marginTop: '0px' } : { marginTop: '100vh' }}
            //       className="up-branch-list"
            // >
            //       <div className="up-branch-list__cnt">
            //             <div className="up-branch-list__cnt-head">
            //                   <div></div>
            //                   <span className="nunito-text-xl text-primary-color text-align-center">
            //                         Danh sách cơ sở
            //                   </span>
            //                   <img onClick={() => setOpenAllBranch(false)} src={img.closeCircle} alt="" />
            //             </div>
            //             <div className="up-branch-list__cnt-list">
            //                   <div className="list-group flex-box-col">
            //                         {
            //                               branches?.slice(3, branches.length).map(item => (
            //                                     <BranchItem
            //                                           key={item.id}
            //                                           dataBranch={item}
            //                                           styles={styles}
            //                                           setOpenAllBranch={setOpenAllBranch}
            //                                     />
            //                               ))
            //                         }
            //                   </div>
            //             </div>
            //       </div>
            // </div>
      );
}

export default BranchListUp;