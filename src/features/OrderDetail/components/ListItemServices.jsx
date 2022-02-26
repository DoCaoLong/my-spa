import React from 'react';
import Item from './Item';

function ListItemServices(props) {
      const { detail, org, orderDetail, openDetail } = props;
      return (
            <ul>
                  {
                        detail.map((item,key) => (
                              <Item
                                    openDetail={openDetail}
                                    key={key}
                                    item={item}
                                    orderDetail={orderDetail.filter(e => e.productable_id === item.id)[0]}
                                    type={2}
                                    name={item.service_name}
                                    org={org}
                              />
                        ))
                  }
            </ul>
      );
}

export default ListItemServices;