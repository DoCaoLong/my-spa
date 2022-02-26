// import React, { useEffect, useState, useContext } from 'react';
// import productsApi from '../../../../apis/productsApi';
// import productCategoryOrg from '../../../../apis/productCategoryOrg'
// import ProductItem from './ProductItem';
// import { card_loading, OnLoad } from '../../../Loading/CartItem';
// import { CircularProgress } from '@mui/material';
// import { useParams } from "react-router-dom";
// import Error from '../../../Error';
// import {AppContext} from '../../../../context/AppProvider';
// import PopupFilter from '../Filter/PopupFilter'
// import img from '../../../../constants/imageList';

// const tabName = "Sản phẩm";
// function TabProduct(props) {
//       const {org, orgPrCate, setPrCate} = useContext(AppContext)
//       const {
//             chooseTab,
//             setIsOpen,
//             setNewItemCart,
//             imageDefault,
//             branchList
//       } = props;
//       const [chooseCategory, setChooseCategory] = useState();


//       const [data, setData] = useState({
//             products: [],
//             loading: false,
//             loadMore: false,
//             page: 1,
//             totalPage: 1
//       })
//       const [dateCate, setDataCate] = useState({
//             categories: [],
//             loadCate: false
//       })
//       const [chooseCard, setChooseCard] = useState({
//             chooseAll: false,
//             chooseSpecial: true,
//             chooseCate: undefined
//       })
//       const [dataSpecial, setDataSpecial] = useState({
//             special:[],
//             page:1,
//             totalPage:1
//       })

      

//       const [loading, setLoading] = useState(false);
//       const [loadingMore, setLoadingMore] = useState(false);
//       const [disableBtn,setDisableBtn] = useState();
//       const { id } = useParams();
//       const [products, setProducts] = useState([]);
//       const [page, setPage] = useState(1);
//       const [chooseSpecialSer, setChooseSpecialSer] = useState();
//       const [hasSpecial, setHasSpecial] = useState();
//       const [totalPage, setTotalPage] = useState(1);

//       const [totalPr, setTotalPr] = useState();
//       const [openFilter, setOpenFilter] = useState(false);
//       // Error catch 
//       const [openError, setOpenError] = useState({
//             openOther: false,
//             error:'',
//       });
//       // get category from org_id
//       useEffect(() => {
//             async function handleGetCateProduct() {
//                   setDataCate({...dateCate, loadCate:true})
//                   try {
//                         const res = await productCategoryOrg.getCategoryByOrgId({
//                               organization_id: id
//                         })
//                         setDataCate({
//                               categories:res.data.context.data,
//                               loadCate:false
//                         })
//                         setPrCate(res.data.context.data)
//                   } catch (err) {
//                         setOpenError({ openOther:true, error: err })
//                   }
//             }
//             if(org?.id === parseInt(id) && orgPrCate){
//                   setDataCate({...dateCate, categories:orgPrCate})
//             }else{
//                   handleGetCateProduct();
//             }     
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       }, [id])
//       async function handleGetProductSpecial() {
//             const res = await productsApi.getBySpecial({
//                   organization_id: id,
//                   currentPage: dataSpecial.page
//             })
//             setDataSpecial({
//                   ...dataSpecial,
//                   special:[res.data.context.data],
//                   totalPage: res.data.context.total
//             })
//       }
//       //-------------------------
//       // async function handleGetProducts() {
//       //       try {
//       //             if((chooseSpecialSer) && !chooseCategory ){
//       //                   const res = await productsApi.getBySpecial({
//       //                         organization_id: id,
//       //                         currentPage: data.page
//       //                   });
//       //                   //setProducts([...products, ...res.data.context.data])
//       //                   //setTotalPage(res.data.context.last_page)
//       //                   setTotalPr(res.data.context.total);
//       //                   setLoading(false)
//       //                   setLoadingMore(false);
//       //             }
//       //             else if (!chooseCategory  && !chooseSpecialSer) {
//       //                   const res = await productsApi.getAllProductByOrganizationId({
//       //                         organization_id: id,
//       //                         currentPage: page
//       //                   });
//       //                   console.log(res);
//       //                   setProducts([...products, ...res.data.context.data])
//       //                   //setTotalPage(res.data.context.last_page)
//       //                   setTotalPr(res.data.context.total);
//       //                   setLoading(false)
//       //                   setLoadingMore(false);
//       //             } else {
//       //                   const res = await productsApi.getProductByCategoryId({
//       //                         organization_id: id,
//       //                         currentPage: page,
//       //                         category_id: chooseCategory.id
//       //                   })
//       //                   setProducts([...products, ...res.data.context.data]);
//       //                   //setTotalPage(res.data.context.last_page)
//       //                   setTotalPr(res.data.context.total);
//       //                   setLoading(false);
//       //                   setLoadingMore(false);  
//       //             }
//       //       } catch (err) {
//       //             //console.log(err)
//       //             setLoading(false)
//       //             setOpenError({ openOther:true, error: err })
//       //       }
//       // }
//       // const getSpecialSer = async () => {
//       //       const res =  await productsApi.getBySpecial({
//       //             organization_id: id,
//       //             currentPage: page
//       //       })
//       //       console.log('res',res.data.context.data.length);
//       //       if(res.data.context.data.length === 0){
//       //             handleViewAll()
//       //       }
//       //       else{
//       //             // console.log('else');
//       //             setHasSpecial(true);
//       //             setChooseSpecialSer(true);
//       //             setChooseCategory(false);
//       //             setDisableBtn('special');
//       //             setProducts([...res.data.context.data])
//       //             setTotalPr(res.data.context.total);
//       //       }
//       // }
//       useEffect(() => {
//             handleGetProductSpecial()
//             // if(!hasSpecial){
//             //       getSpecialSer();
//             // }
//             // else{
//             //       handleGetProducts();
//             // }
//             // return () => { }
//             // eslint-disable-next-line react-hooks/exhaustive-deps
//       }, [])

//       const viewMoreClick = () => {
//             // setLoadingMore(true)
//             // setPage(page + 1);  
//       }
//       const setCategoryClick = (item) => {
//             // if(disableBtn !== item.id){
//             // setLoading(true);
//             // setChooseCategory(item);
//             // setProducts([]);
//             // setPage(1);
//             // setDisableBtn(item.id);
//             // setChooseSpecialSer(false);
//             // }
//       }

//       const handleChooseSpecial = () => {
//             // if(disableBtn !== 'special'){
//             // setLoading(true);
//             // setChooseSpecialSer(true);
//             // setChooseCategory(false);
//             // setPage(1);
//             // setProducts([]);
//             // setDisableBtn('special');
//             // }
//       }
//       const handleViewAll = () => {
//             // if(disableBtn !== 'all'){
//             // setLoading(true)
//             // setChooseCategory();
//             // setChooseSpecialSer(false);
//             // setPage(1);
//             // setProducts([]);
//             // setDisableBtn('all');
//             // }
//       }
//       // console.log('product',products);
//       return (
//             <>
//                   <Error
//                         open={openError.openOther}
//                         setOpen={setOpenError}
//                         error={openError.error}
//                   />
//                   <div
//                         className="tab-products"
//                         style={chooseTab === tabName ? {} : { display: 'none' }}
//                   >
//                         <div style={{ backgroundColor: '#FFFFFF' }} className="sticky-box cus-sticky-box" id="scroll-animate">
//                               <div
//                                     onClick={()=>setOpenFilter(true)}
//                                     className='ip-filter'
//                               >
//                                     <img src={img.search} alt="" />
//                                     <input disabled={true} className="ip-filter__input" type="text" placeholder='Tìm kiếm tên sản phẩm...' />
//                               </div>
//                               <div className="list-service-type  owl-carousel owl-theme" id="service-type">
//                                     <div className="list-service-type__wrapper">
//                                           {
//                                                 dataSpecial.special.length > 0 ?
//                                                       <div
//                                                             style={(!chooseCategory && chooseSpecialSer) ?
//                                                                   {
//                                                                         backgroundColor: 'var(--red)',
//                                                                         color: 'var(--bgWhite)',
//                                                                         boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.37)'
//                                                                   }
//                                                                   :
//                                                                   {
//                                                                         backgroundColor: 'var(--red)',
//                                                                         color: 'var(--bgWhite)',
//                                                                   }
//                                                             }
//                                                             onClick={handleChooseSpecial}
//                                                             className="item"
//                                                       >
//                                                             Ưu đãi
//                                                       </div>
//                                                       :
//                                                       <></>
//                                           }
//                                           {
//                                                 dateCate.loadCate === true ?
//                                                       (
//                                                             [1, 3, 2, 4].map(index => (
//                                                                   <div
//                                                                         key={index}
//                                                                         style={{ width: '97px' }}
//                                                                         className="cate_on_load"
//                                                                   >
//                                                                         <OnLoad />
//                                                                   </div>
//                                                             ))
//                                                       )
//                                                       :
//                                                       ((dateCate.categories.length === 0) ?
//                                                             ''
//                                                             :
//                                                             (<>
//                                                                   <div
//                                                                         style={(!chooseCategory && !chooseSpecialSer) ?
//                                                                               {
//                                                                                     backgroundColor: 'var(--purple)',
//                                                                                     color: 'var(--bgWhite)',
//                                                                                     boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.37)'
//                                                                               }
//                                                                               :
//                                                                               {}
//                                                                         }
//                                                                         onClick={handleViewAll}
//                                                                         className="item"
//                                                                   >
//                                                                         Tất cả
//                                                                   </div>
//                                                                   {dateCate.categories?.map(item => (
//                                                                         (item.name && item.products_count !== 0) && (
//                                                                               <div
//                                                                                     style={
//                                                                                           chooseCategory === item ?
//                                                                                                 {
//                                                                                                       backgroundColor: 'var(--purple)',
//                                                                                                       color: 'var(--bgWhite)',
//                                                                                                       boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.37)'
//                                                                                                 }
//                                                                                                 :
//                                                                                                 {}
//                                                                                     }
//                                                                                     key={item.id}
//                                                                                     className="item"
//                                                                                     onClick={() => setCategoryClick(item)}
//                                                                               >
//                                                                                     {item.name}
//                                                                               </div>
//                                                                         )
//                                                                   ))}
//                                                             </>))
//                                           }
//                                     </div>
//                               </div>
//                         </div>
//                         <div className="service-type">
//                               {loading === true ? (
//                                     <>
//                                           {card_loading()}
//                                           {card_loading()}
//                                           {card_loading()}
//                                           {card_loading()}
//                                           {card_loading()}
//                                           {card_loading()}
//                                           {card_loading()}
//                                     </>
//                               )
//                                     :
//                                     (
//                                           products.map((item, index) => (
//                                                 <ProductItem
//                                                       key={index}
//                                                       product={item}
//                                                       setIsOpen={setIsOpen}
//                                                       setNewItemCart={setNewItemCart}
//                                                       imageDefault={imageDefault}
//                                                       org={org}
//                                                 />
//                                           ))
//                                     )
//                               }
//                         </div>
//                         {
//                               totalPr <= products.length ?
//                                     <></>
//                                     :
//                                     <div className="tab-products__btn">
//                                           {
//                                                 loadingMore === true ?
//                                                       <div className="search__loading-spinner"><CircularProgress color="primary" /></div>
//                                                       :
//                                                       <button
//                                                             onClick={viewMoreClick}
//                                                       >
//                                                             {products.length === 0 ?
//                                                                   'Không có sản phẩm'
//                                                                   :
//                                                                   `Xem thêm ${totalPr - products.length} sản phẩm khác`
//                                                             }
//                                                       </button>
//                                           }
//                                     </div>
//                         }
//                   </div>
//                   <PopupFilter
//                         type={false}
//                         imageDefault={imageDefault}
//                         org_id={id}
//                         openFilter={openFilter}
//                         setIsOpen={setIsOpen}
//                         setOpenFilter={setOpenFilter}
//                         locationId={id}
//                         org={org}
//                         branchList={branchList}
//                         setNewItemCart={setNewItemCart}
//                   />
//             </>
//       );
// }

// export default TabProduct;