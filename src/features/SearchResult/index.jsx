import React, { useState, useEffect, useContext } from "react";
import Head from "../../component/HeadTag/default";
import { Search_result } from "../../component/Constant/MetaConst";
import { useParams, useHistory } from 'react-router-dom'
import Header from "../Header/index";
import organizationApi from '../../apis/organizationApi'
import scrollTop from '../../utils/scrollTop';
import { AppContext } from '../../context/AppProvider';
import Error from '../Error';
import img from '../../constants/imageList';
import CartItemResult from '../PageFilterHome/components/CartItemResult';
import Map from "../Map";

const $ = document.querySelector.bind(document);
const openFilterTag = () => {
	$('.item-list__wrapper').classList.toggle('item-list__wrapper-active')
}
function SearchResult() {
	const headerTitle = 'Trang kết quả';
	const urlPrev = '/Frontend/Home';
	const history = useHistory();
	const {
		tags,
	} = useContext(AppContext);
	const [chooseTag, setChooseTag] = useState([]);
	const [openMap, setOpenMap] = useState(false)
	const [loading, setLoading] = useState(false)
	const [organizations, setOrganizations] = useState([]);
	// Error catch 
	const [openError, setOpenError] = useState({
		openOther: false,
		error: '',
	});
	// -----------
	const { searchText } = useParams();

	const values={
		keyword:searchText,
		tags: chooseTag.map(item => item.name).join(', ')
	}
	
	useEffect(() => {
		setLoading(true);
		async function getOrganizationBySearchValue() {
			try {
				const res = await organizationApi.getBySearchValueFilter(values);
				setOrganizations(res.data.context.data);
				setLoading(false);
			} catch (err) {
				setOpenError({ openOther: true, error: err });
			}
		}
		getOrganizationBySearchValue();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chooseTag])

	const handleChooseTag = (tag) => {
		setChooseTag(prev => {
			const isChoose = chooseTag.includes(tag)
			if (isChoose) {
				return chooseTag.filter(item => item !== tag)
			} else {
				return [...prev, tag]
			}
		});
	}
	//handle go page
	const gotoPageDetail = (org) => {
		history.push({
			pathname: `/Frontend/Momo-layout-detail/${org.id}`,
			state: org
		})
		scrollTop();
	}
	return (
		<>
			<Map
				openMap={openMap}
				setOpenMap={setOpenMap}
				organization={organizations}
				gotoPageDetail={gotoPageDetail}
			/>
			<div className="page-result">
				<Head
					Title={Search_result.title}
					Description={Search_result.description}
				></Head>
				<Header
					headerTitle={headerTitle}
					urlPrev={urlPrev}
				/>
				<div
					style={{ position: 'sticky', top: '0', left: '0', right: '0', zIndex: '2' }}
					className="infor-result-section page-title bg-dark-blue-color cus-infor-result-section"
				>
					<div className="wrap-items cus-wrap-items">
						<div
							onClick={openFilterTag}
							style={{ marginRight: 0 }}
							className="item-list"
						>
							<span className="nunito-text-sm text-grey-color">Danh mục</span>
							<span className="nunito-text-md text-primary-color">
								{
									chooseTag?.length > 0 ?
										chooseTag.map(item => item.name).join(', ')
										:
										'Tất cả'
								}
							</span>
							<div className="item-list__wrapper">
								<ul>
									{
										tags?.map((item, index) => (
											<li
												style={
													chooseTag.includes(item) ?
														{ backgroundColor: '#7161ba', color: '#f5f5f7' }
														:
														{ backgroundColor: '#f5f5f7', color: '#7161ba' }
												}
												onClick={() => handleChooseTag(item)}
												key={index}
											>
												{item.name}
											</li>
										))
									}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div id="infinity_load" style={{ display: "block" }}>
					<ul>
						{organizations?.map((item, index) => (
							<CartItemResult
								setOpenMap={setOpenMap}
								key={index}
								dataCard={item}
								imageDefault={(item.image) ? item.image_url : img.logoMyspa}
								gotoPageDetail={gotoPageDetail}
							/>
						))}
					</ul>
					<div style={{ width: "100%" }} className="tab-products__btn">
						{/* {
							data.more === true ?
							<div className="search__loading-spinner"><CircularProgress color="primary" /></div>
							:
							<button
							style={data.page === data.lastPage ? { display: 'none' } : { display: 'block' }}
							onClick={onViewMore}
							>
							Xem them
							</button>
							// <>
							// </>
						} */}
					</div>
					</div>
			</div>
			<Error
				open={openError.openOther}
				setOpen={setOpenError}
				error={openError.error}
			/>
		</>
	);
}

export default SearchResult;