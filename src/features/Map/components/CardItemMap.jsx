import React from 'react';
import img from '../../../constants/imageList';
import scrollTop from '../../../utils/scrollTop';
import { useHistory } from 'react-router-dom'

function CardItemMap(props) {
    const { dataCard, imageDefault } = props;
    const history = useHistory();
    const timeOpen = dataCard?.opening_time;
    const distance = Math.round(dataCard?.distance);
    const date = new Date();
    const today = date.getDay() + 1;

    const timeOpenToday = timeOpen?.find((item, index) => index + 2 === today);
    const gotoPath = () => {
        const url = `https://maps.google.com/?q=${dataCard.latitude},${dataCard.longitude}`
        const newWindow = window.open(`${url}`, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }
    const gotoPageDetail = () => {
        history.push({
            pathname: `/Frontend/Momo-layout-detail/${dataCard.id}`,
            state: dataCard
        })
        scrollTop();
    }
    return (
        <div
            className='card-map__item-wrap'
        >
            <div className="card-map__item">
                <img
                    src={(dataCard.image) ? dataCard.image_url : imageDefault}
                    onError={(e) => { e.target.src = img.logoMyspa; e.target.style.objectFit = 'contain'; e.target.style.transform = 'scale(0.5)' }}
                    alt=""
                    className="card-map__item-img"
                    onClick={gotoPageDetail}
                />
                <div className="card-map__item-content">
                    <div onClick={gotoPageDetail} className="item-content__name">
                        {dataCard?.name}
                    </div>
                    <div
                        className='item-content__address'
                        onClick={gotoPageDetail}
                    >
                        <img src={img.mapPinActive} alt="" />
                        <span onClick={gotoPageDetail}>
                            {dataCard.full_address}
                        </span>
                    </div>
                    <div onClick={gotoPageDetail} className="item-content__address">
                        <img src={img.clock} alt="" />
                        <span className='item-content__time'>
                            Thứ {today} : {
                                timeOpenToday.time_opening === 'on' ?
                                    `${timeOpenToday.from_time_opening}-${timeOpenToday.to_time_opening}`
                                    :
                                    'Đóng cửa'
                            }
                        </span>
                    </div>
                    <div
                        onClick={gotoPath}
                        className="item-content__direct"
                    >
                        Chỉ đường({distance < 1000 ? `${distance}m` : `${Math.round(distance / 1000)}km`})
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardItemMap;