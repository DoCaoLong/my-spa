import React, { useState, useEffect, useContext } from "react";
import Head from "../../component/HeadTag/default";
import { Search_result } from "../../component/Constant/MetaConst";
import { OnLoad } from '../Loading/CartItem';
import { useParams, useHistory } from 'react-router-dom'
import Header from "../Header/index";
import organizationApi from '../../apis/organizationApi'
//import tagsApi from '../../apis/tagApi';
import scrollTop from '../../utils/scrollTop';
import { Box, Slider } from '@mui/material';
// import formatNumber from "../../utils/formatPrice";
import { AppContext } from '../../context/AppProvider';
import CardItem from '../ViewItem/CardItem/index';
import PageNullResult from "../PageNotResult";
import Error from '../Error';

const $ = document.querySelector.bind(document);
const openFilterTag = () => {
	$('.item-list__wrapper').classList.toggle('item-list__wrapper-active')
	$('.page-result__slider').classList.remove('page-result__slider-active')
}
const openFilterPrices = () => {
	$('.page-result__slider').classList.toggle('page-result__slider-active')
	$('.item-list__wrapper').classList.remove('item-list__wrapper-active')
}
function valuetext(value) {
	return `${value} đ`;
}
function SearchResult() {
	const headerTitle = 'Trang kết quả';
	const urlPrev = '/Frontend/Home';
	const history = useHistory();
	const {
		// tagList,
		tags,
		// pricesRange
	} = useContext(AppContext);
	//const [tagLists, setTagLists] = useState([]);
	const [chooseTag, setChooseTag] = useState('');
	const [loading, setLoading] = useState(false)
	const [organizations, setOrganizations] = useState([]);
	const [valueSlider, setValuesSlider] = useState([0, 5000000]);
	// Error catch 
	const [openError, setOpenError] = useState({
		openOther: false,
		error: '',
	});
	// -----------
	const { searchText } = useParams();
	const values = {
		keyword: encodeURI(searchText),
		stringTags: '',
		rangePrices: { min: valueSlider[0], max: valueSlider[1] }
	}
	async function getOrganizationByFilter() {
		try {
			const res = await organizationApi.getBySearchValue(values.keyword)
			setOrganizations(res.data.context.data);
		} catch (err) {
			setOpenError({ openOther: true, error: err })
		}
	}
	useEffect(() => {
		setLoading(true);
		async function getOrganizationBySearchValue() {
			try {
				const res = await organizationApi.getBySearchValue(searchText);
				setOrganizations(res.data.context.data);
				setLoading(false);
			} catch (err) {
				setOpenError({ openOther: true, error: err });
			}
		}
		getOrganizationBySearchValue();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		// searchText
	])

	const handleChooseTag = (tag) => {
		setChooseTag(tag);
		getOrganizationByFilter(
			{
				...values,
				stringTags: encodeURI(tag),
				// rangePrices: { min: valueSlider[0], max: valueSlider[1] }
				rangePrices: { min: null, max: null }
			}
		);
	}
	const handleChangePriceRange = (event, newValue) => {
		setValuesSlider(newValue);
	}
	const handleFilterPricesRange = () => {
		getOrganizationByFilter(
			{
				...values,
				stringTags: encodeURI(chooseTag),
				rangePrices: {
					// min: valueSlider[0], max: valueSlider[1]
					min: null, max: null
				}
			}
		);
		openFilterPrices();
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
								{chooseTag.length > 0 ? chooseTag : 'Tất cả'}
							</span>
							<div className="item-list__wrapper">
								<ul>
									{
										tags?.map((item, index) => (
											<li
												style={
													chooseTag === item ?
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
						{/* <div
						onClick={openFilterPrices}
						className="item-price"
					>
						<span className="nunito-text-sm text-grey-color">Khoảng giá</span>
						<div className="item-price-wrap">
							<span className="nunito-text-sm text-primary-color">
								{formatNumber(valueSlider[0])}đ
							</span>
							<span className="nunito-text-sm text-primary-color">-</span>
							<span className="nunito-text-sm text-primary-color">
								{formatNumber(valueSlider[1])}đ
							</span>
						</div>
					</div> */}
						<div className="page-result__slider" style={{ marginTop: '70px' }}>
							<Box>
								<Slider
									min={0}
									max={5000000}
									step={100000}
									getAriaLabel={() => 'Temperature range'}
									value={valueSlider}
									onChange={handleChangePriceRange}
									valueLabelDisplay="auto"
									getAriaValueText={valuetext}
								/>
							</Box>
							<button onClick={handleFilterPricesRange}>Lọc khoảng giá</button>
						</div>
					</div>
				</div>
				<div className="cards-wrap ">
					{
						loading === true ?
							(
								<>
									<div className="card">
										<div
											className="card-image img-height-result"
											style={{ padding: '10px 15px' }}
										>
											<OnLoad />
										</div>

										<div
											className="card-content"
										>
											<OnLoad />
											<br />
											<OnLoad />
										</div>
									</div>
									<div className="card">
										<div
											className="card-image img-height-result"
											style={{ padding: '10px 15px' }}
										>
											<OnLoad />
										</div>

										<div
											className="card-content"
										>
											<OnLoad />
											<br />
											<OnLoad />
										</div>
									</div>
									<div className="card" style={{ marginBottom: '0' }}>
										<div
											className="card-image img-height-result"
											style={{ padding: '10px 15px', marginBottom: '0' }}
										>
											<OnLoad />
										</div>

										<div
											className="card-content"
										>
											<OnLoad />
											<br />
											<OnLoad />
										</div>
									</div>
									<div className="card">
										<div
											className="card-image img-height-result"
											style={{ padding: '10px 15px' }}
										>
											<OnLoad />
										</div>

										<div
											className="card-content"
										>
											<OnLoad />
											<br />
											<OnLoad />
										</div>
									</div>
								</>
							)
							// <div className="search__loading-spinner"><CircularProgress color="primary"/></div>
							:
							organizations.length === 0 ?
								<div className="cus-cart_none">
									<PageNullResult
										title='Không tìm thấy kết quả phù hợp <br/> <br/>'
										// text='Thành thật xin lỗi, chúng tôi không tìm thấy cơ sở làm đẹp phù hợp với tùy chọn của bạn.<br><br> Hãy thử tìm kiếm tùy chọn khác nhé!'
										text='Hãy thử tìm kiếm tùy chọn khác nhé!'
									/>
								</div>
								:
								organizations?.map((item, key) => (
									<CardItem
										key={key}
										dataCard={item}
										gotoPageDetail={gotoPageDetail}
										chooseCard={item}
									/>
								))
					}
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