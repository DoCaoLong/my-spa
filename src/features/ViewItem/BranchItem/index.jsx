import React from 'react';
//import { AppContext } from '../../../context/AppProvider';
import { useHistory } from 'react-router-dom';
import img from '../../../constants/imageList';
import scrollTop from "../../../utils/scrollTop";


function BranchItem(props) {
      const history = useHistory();
      const {
            dataBranch,
            organization_id,
            org,
            imageDefault,
            //styles, 
            setOpenAllBranch
      } = props;
      // const { setChooseBranch, chooseBranch } = useContext(AppContext)
      const handleChooseBranch = () => {
            // setChooseBranch(dataBranch);
            scrollTop();
            if (setOpenAllBranch) {
                  setOpenAllBranch(false);
            }
            else if (organization_id) {
                  history.push({
                        pathname: `/Frontend/Momo-layout-detail/${org.id}`,
                        state: org
                  });
            }
      }
      // console.log('organiDetail',organiDetail);
      return (
            <div >
                  <div
                        onClick={handleChooseBranch}
                        className="item flex-box-row branch-item branch-item"
                  // style={dataBranch === chooseBranch ?
                  //       {
                  //             boxShadow:'0px 4px 20px rgb(113 97 186 / 20%)',
                  //             padding: styles?.paddingItem,
                  //             borderRadius: styles?.borderRadius
                  //       }
                  //       :
                  //       {
                  //             padding: styles?.paddingItem,
                  //             borderRadius: styles?.borderRadius
                  //       }
                  // }
                  >
                        <div className="avatar">
                              <img src={(dataBranch?.image) ? dataBranch?.image_url : (imageDefault)} onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }} alt="banner" className="image-size cus-img-branch" />
                        </div>
                        <div className="address-info flex-box-col cus-detail-branch">
                              <div className="branch-name nunito-text-sm text-grey-color">
                                    {dataBranch?.name}
                              </div>
                              <div className="address nunito-text-md text-black-color">
                                    {dataBranch?.full_address}
                              </div>
                        </div>
                  </div>
                  <hr className="grey-line" />
            </div>
      );
}

export default BranchItem;