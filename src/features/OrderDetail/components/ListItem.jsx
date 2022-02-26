import React from 'react';
import Item from './Item';

// list item product
function ListItem(props) {
      const { detail, org, orderDetail , openDetail} = props;
      return (
            <ul>
                  {
                        detail.map(item => (
                              <Item
                                    key={item.id}
                                    item={item}
                                    orderDetail={orderDetail.filter(e => e.productable_id === item.id)[0]}
                                    type={1}
                                    name={item.product_name}
                                    org={org}
                                    openDetail={openDetail}
                              />
                        ))
                  }
            </ul>
      );
}

export default ListItem;