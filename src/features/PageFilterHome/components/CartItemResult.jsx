import React from 'react';
import '../../../assets/style/card-item-result.css';
import img from '../../../constants/imageList';
import { useHistory } from 'react-router-dom'

function CartItemResult(props) {
    const { dataCard, setOpenMap, gotoPageDetail } = props;
    const history = useHistory();
    const listTag = dataCard.tags?.map(item => item.name)
    const distance = Math.round(dataCard.distance);
    const date = new Date();
    const today = date.getDay() + 1
    const timeOpenToday = dataCard.opening_time?.find((item,index) => index + 2 === today)

    const chooseOrgClick = () => {
        setOpenMap(true)
    }
    const gotoPageBranch = () => {
        history.push({
            pathname: `/Frontend/View-more-branch/${dataCard.id}`,
            state: dataCard
        });
    }
    const onGotoDetail = () => {
        if (gotoPageDetail) {
            gotoPageDetail(dataCard)
        }
    }
    return (
        <>
            <div className="re-card__item">
                <img 
                    onClick={onGotoDetail} className='re-card__item-img' 
                    src={(dataCard.image)?dataCard.image_url:""} 
                    alt="" 
                    onError={(e) => {
                    e.target.src = img.logoMyspa;
                    e.target.style.objectFit = "contain";
                    e.target.style.transform = "scale(0.5)";
                    }}
                />
                <div className="re-card__item-cnt">
                    <span onClick={onGotoDetail} className='org-name'>
                        {dataCard.name}
                    </span>
                    <div onClick={chooseOrgClick} className='flex-row-sp'>
                        <div className="org-address">
                            <img src={img.mapPin} alt="" />
                            <span>
                                {dataCard.full_address}
                            </span>
                        </div>
                        <img className='icon-left' src={img.polygon} alt="" />
                    </div>
                    <div className="flex-row org-tags">
                        <img src={img.catalog} alt="" />
                        <span>{listTag.join(', ')}</span>
                    </div>
                    <div className="flex-row org-tags">
                        <img src={img.clockGrey} alt="" />
                        <span>
                            Thứ {today} :
                            {
                                timeOpenToday.time_opening === 'on' ?
                                    `${timeOpenToday.from_time_opening}-${timeOpenToday.to_time_opening}`
                                    :
                                    'Đóng cửa'
                            }
                        </span>
                    </div>
                    <div className="flex-row org-rate">
                        <div className="flex-row org-rate__start">
                            <img src={img.heart} alt="" />
                            <span>{dataCard.favorites_count}</span>
                        </div>
                        <span className="flex-row org-rate__distance">
                            <div></div>
                            cách bạn {distance < 1000 ? `${distance}(m)` : `${Math.round(distance / 1000)}(km)`}
                        </span>
                    </div>
                    <div className='flex-row'>
                        {
                            dataCard.branches.length > 0 ?
                                <div onClick={gotoPageBranch} className="item-right__button org-view-btn">
                                    Xem thêm {dataCard.branches.length} cơ sở khác
                                </div>
                                :
                                <></>
                        }
                        <div onClick={onGotoDetail} className="item-right__button org-view-btn">
                            Chi tiết
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartItemResult;