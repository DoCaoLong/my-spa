import React, { useEffect, useState } from 'react';
import comboApi from '../../../../apis/comboApi';
import '../../../../assets/style/combo-detail.css';
import { CircularProgress } from '@mui/material'
import ComboItem from './ComboItem';
import Error from '../../../Error';
import { useParams } from 'react-router-dom';

const tabName = "Combo"
function TabCombo(props) {
      const {id} = useParams()
      const { chooseTab, branchList, setIsOpen, setNewItemCart, org, imageDefault } = props;
      const [page, setPage] = useState(1);
      const [combos, setCombos] = useState([])
      const [totalItem, setTotalItem] = useState();
      const [openError, setOpenError] = useState({
            openOther: false,
            error:'',
      });
      const [loadingMore, setLoadingMore] = useState(false);
      async function handleGetCombo() {
            try {
                  const res = await comboApi.getByOrg_id({
                        org_id: id,
                        page: page
                  });
                  setCombos([...combos, ...res.data.context.data])
                  setTotalItem(res.data.context.total);
                  setLoadingMore(false);
            } catch (err) {
                  //console.log(err);
                  setOpenError({ openOther:true, error: err })
            }
      }
      useEffect(()=> {
            handleGetCombo();
            // eslint-disable-next-line react-hooks/exhaustive-deps
      },[page, id])
      const handleViewMore = () => {
            setLoadingMore(true);
            setPage(page + 1);
      }
      return (
            <div
                  className="cb-cnt"
                  style={chooseTab === tabName ? {} : { display: 'none' }}
            >
                  <ul className="cb-cnt__list">
                        {
                              combos.length <= 0 ?
                               <>
                                    Hiện cửa hàng không có combo! 
                               </>
                               :
                              combos.map((item, index) => (
                                    <ComboItem
                                          key={index}
                                          combo={item}
                                          org={org}
                                          branchList={branchList}
                                          setIsOpen={setIsOpen}
                                          setNewItemCart={setNewItemCart}
                                          imageDefault={imageDefault}
                                    />
                              ))
                        }
                  </ul>
                  {
                        totalItem <= combos.length ?
                              <>
                              </>
                              :
                              <div className="tab-products__btn">
                                    {
                                          loadingMore === true ? <div className="search__loading-spinner"><CircularProgress color="primary" /> </div>
                                                :
                                                <button
                                                      onClick={handleViewMore}
                                                >
                                                      {
                                                            combos.length === 0 ?
                                                                  'Không có Combos'
                                                                  :
                                                                  `Xem thêm ${totalItem - combos.length} combo`
                                                      }
                                                </button>
                                    }
                              </div>
                  }
                  <Error
                        open={openError.openOther}
                        setOpen={setOpenError}
                        error={openError.error}
                  />
            </div>
      );
}

export default TabCombo;