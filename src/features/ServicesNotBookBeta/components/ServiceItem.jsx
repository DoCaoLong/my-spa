// import React, { useState } from 'react';
// import {Checkbox} from '@mui/material'

// function ServiceItem(props) {
//       const [service, setService] = useState({});

//       return (
//             <li
//                   key={index}
//                   onClick={() => handleChooseService(ser)}
//             >
//                   <div className="flex-row my-ser__org-ser-item">
//                         <Checkbox
//                               checked={serBooking.includes(ser)}
//                               inputProps={{ 'aria-label': 'controlled' }}
//                         />
//                         <div className="flex-row-sp item">
//                               <img
//                                     src={"https://picsum.photos/137/96?random=" + ser.sid}
//                                     alt=""
//                               />
//                               <div className="item-cnt">
//                                     <p className='ser-name'>{ser.serviceable.id}</p>
//                                     <p className="ser-org">{org?.name}</p>
//                                     <span className="flex-row ser-quantity">
//                                           Số buổi:
//                                           <p>{ser.quantity}</p>
//                                           Thời gian:
//                                           <p>{ser.duration} phút</p>
//                                     </span>
//                                     <p className="ser-price">
//                                           {/* {formatNumber(ser.price)}đ */}
//                                     </p>
//                               </div>
//                         </div>
//                   </div>
//             </li>
//       );
// }

// export default ServiceItem;