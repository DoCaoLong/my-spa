import React from 'react';
import Item from './Item';

function ListItemCombo(props) {
      const { detail, org, orderDetail } = props;
      return (
            <ul>
                  {
                        detail.map((item,key) => (
                              <Item
                                    key={key}
                                    item={item}
                                    orderDetail={orderDetail.filter(e => e.productable_id === item.id)[0]}
                                    type={3}
                                    name={item.name}
                                    org={org}
                              />
                        ))
                  }
            </ul>
      );
}

export default ListItemCombo;