import React, { useState } from 'react';
import { useEffect } from 'react';
import ListAllItem from './ListAllItem';
import ListItem from './ListItem';
import ListItemServices from './ListItemServices';
import ListItemCombo from './ListItemCombo';
import productsApi from '../../../apis/productsApi';
import servicesApi from '../../../apis/servicesApi';
import comboApi from '../../../apis/comboApi';
import { card_loading} from '../../Loading/CartItem';
import Error from '../../Error';

function OrderContent(props) {
      const { org, detail, openDetail} = props;
      const btns = [
            { id: 1, text: 'Tất cả', array: [detail.items_product, detail.items_service, detail.items_treatment_combo].flat() },
            { id: 2, text: 'Sản phẩm', array: detail.items_product },
            { id: 3, text: 'Dịch vụ', array: detail.items_service },
            { id: 4, text: 'Combo', array: detail.items_treatment_combo }
      ]
      const [loading,setLoading] = useState(true);
      const [activeBtn, setActiveBtn] = useState(1);
      const [listProduct, setListProduct] = useState([]);
      const [listService, setListService] = useState([]);
      const [listTreatmentCombo, setListTreatmentCombo] = useState([]);
      const [listAllItem,setListAllItem] = useState([]);
      const [openError, setOpenError] = useState({
            openOther: false,
            error:'',
      });

      const [element, setElement] = useState(<ListAllItem detail={[listProduct,listService,listTreatmentCombo]} />)
      useEffect(() => {
            switch (activeBtn) {
                  case 1:
                        return setElement(
                              <ListAllItem
                                    orderDetail={detail}
                                    listProduct={listProduct}
                                    listService={listService}
                                    listTreatmentCombo={listTreatmentCombo}
                                    openDetail={openDetail}
                                    org={org} />

                        )
                  case 2:
                        return setElement(
                              <ListItem
                                    orderDetail={detail.items_product}
                                    detail={listProduct}
                                    openDetail={openDetail}
                                    org={org} />

                        )
                  case 3:
                        return setElement(
                              <ListItemServices
                                    orderDetail={detail.items_service}
                                    detail={listService}
                                    openDetail={openDetail}
                                    org={org} />

                        )
                  case 4:
                        return setElement(
                              <ListItemCombo
                                    orderDetail={detail.items_treatment_combo}
                                    detail={listTreatmentCombo}
                                    openDetail={openDetail}
                                    org={org}
                              />)
                  default:
                        break;
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [activeBtn,listAllItem])
      useEffect(()=>{
            setListAllItem([listProduct,listService,listTreatmentCombo].flat());
            (listAllItem.length > 0 ) && setLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[listProduct,listService,listTreatmentCombo]);
      useEffect(()=>{
            getListDetail();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

      function getListDetail(){
            if(detail.items_service.length !== 0){
                  detail.items_service.forEach(item => callApi(item,servicesApi,setListService));
            }
            if(detail.items_product.length !== 0){
                  detail.items_product.forEach(item => callApi(item,productsApi,setListProduct));
            }
            if(detail.items_treatment_combo.length !== 0){
                  detail.items_treatment_combo.forEach(item => callApi(item,comboApi,setListTreatmentCombo));
            }
      }
      async function callApi(item,api,setList){
            try{
                  const res = await api.getDetailById_orgId({
                        org_id: org.id,
                        item_id: item.productable_id
                  })
                  setList(prev => [...prev,res.data.context]);
                  setLoading(false)
            }
            catch(err){
                  setOpenError({ openOther:true, error: err })
                  setLoading(false)
            }
      }
      return (
            <>
                  {
                  loading === true
                  ?
                  <div className="order-de__cnt-head__btn">
                        <div
                              style={{
                                    backgroundColor: 'var(--bgWhite)',
                                    width: '100%'
                              }}
                        >
                        {card_loading()}
                        </div>
                  </div>
                  :
                        (
                        <>
                        <div className="order-de__cnt-head__btn">
                              {
                                    btns.map(item => (
                                          <div
                                                key={item.id}
                                                style={item.array.length === 0 ? { display: 'none' } : {}}
                                          >
                                                <button
                                                      onClick={() => setActiveBtn(item.id)}
                                                      style={item.id === activeBtn ?
                                                            { color: 'var(--purple)', borderBottom: 'solid 1px var(--purple)' }
                                                            :
                                                            {}}
                                                >
                                                      {item.text}
                                                </button>
                                          </div>
                                    ))
                              }
                        </div>
                        <div className="order-de__cnt">
                              <div className="order-de__cnt-head">
                                    {element}
                              </div>
                        </div>
                        </>
                        )
                  }
                  <Error
                        open={openError.openOther}
                        setOpen={setOpenError}
                        error={openError.error}
                  />
            </>
      );
}

export default OrderContent;