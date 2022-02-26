import React from 'react';

function OrgSelectItem(props) {
      const {item, handleChooseOrg, chooseOrg, orgAll} = props;
      return (
            <li
                  onClick={() => handleChooseOrg(item)}
            >
                  <div
                        style={item === chooseOrg ?
                              { backgroundColor: 'var(--purple)', color: 'var(--bgWhite)' }
                              :
                              {}
                        }
                  >
                        <a
                              style={item === chooseOrg ?
                                    { color: 'var(--bgWhite)' }
                                    :
                                    {}
                              }
                              href={`#${item}`}>
                              <span>{orgAll.find(i => i.id === item).name}</span>
                        </a>
                  </div>
            </li>
      );
}

export default OrgSelectItem;