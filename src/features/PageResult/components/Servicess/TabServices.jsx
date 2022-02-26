// import { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import {AppContext} from '../../../../context/AppProvider';
// export default function TabService(props){
//     const { id } = useParams();
//     const { org, chooseCateSer, setChooseCateSer, orgSerCate, setOrgSerCate } = useContext(AppContext);
//     const [cate,setCate] = useState();
//     // console.log('org,',org,'chooseCateSer,',chooseCateSer,' setChooseCateSer,',setChooseCateSer,' orgSerCate,',orgSerCate,' setOrgSerCate',setOrgSerCate);
//     // console.log('props',props);
//     async function handleGetCateByOrg(){

//     }
//     useEffect(()=>{
//         if(org?.id === parseInt(id) && orgSerCate){
//             setCate(orgSerCate)
//         }else{
//             handleGetCateByOrg()
//         }
//     },[id])
//     return(
//         <div>
//             alo
//         </div>
//     )
// }