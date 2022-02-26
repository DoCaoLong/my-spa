import React from 'react';
import Item from './Item';

function ListAllItem(props) {
      const {  org, orderDetail, openDetail, listProduct, listService, listTreatmentCombo} = props;
      return (
            <>
                  {
                        orderDetail?.items_product.length > 0 ?
                              <>
                                    <div className="order-de__cnt-list__item">
                                          <div className="order-de__cnt-list__item-head">
                                                Sản phẩm
                                          </div>
                                    </div>
                                    <ul>
                                          {
                                                listProduct.map((item,key)=>
                                                      <Item
                                                            openDetail={openDetail}
                                                            orderDetail={orderDetail.items_product.filter(e => e.productable_id === item.id)[0]}
                                                            key={key}
                                                            item={item}
                                                            org={org}
                                                            type={1}
                                                            name={item.product_name}
                                                      />
                                                )
                                          }
                                    </ul>
                              </>
                              :
                              <></>
                  }
                  {
                        orderDetail?.items_service.length > 0 ?
                              <>
                                    <div className="order-de__cnt-list__item">
                                          <div className="order-de__cnt-list__item-head">
                                                Dịch vụ
                                          </div>
                                    </div>
                                    <ul>
                                          {
                                                listService?.map(item => (
                                                      <Item
                                                            openDetail={openDetail}
                                                            orderDetail={orderDetail.items_service.filter(e => e.productable_id === item.id)[0]}
                                                            key={item.id}
                                                            item={item}
                                                            org={org}
                                                            type={2}
                                                            name={item.service_name}
                                                      />
                                                ))
                                          }
                                    </ul>
                              </>
                              :
                              <></>
                  }
                  {
                        orderDetail?.items_treatment_combo.length > 0 ?
                              <>
                                    <div className="order-de__cnt-list__item">
                                          <div className="order-de__cnt-list__item-head">
                                                Combo
                                          </div>
                                    </div>
                                    <ul>
                                          {
                                                listTreatmentCombo?.map(item => (
                                                      <Item
                                                            openDetail={openDetail}
                                                            orderDetail={orderDetail.items_treatment_combo.filter(e => e.productable_id === item.id)[0]}
                                                            key={item.id}
                                                            item={item}
                                                            org={org}
                                                            type={3}
                                                            name={item.name}
                                                      />
                                                ))
                                          }
                                    </ul>
                              </>
                              :
                              <></>
                  }
            </>
      );
}

export default ListAllItem;