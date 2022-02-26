import React from 'react';
import img from '../../../../constants/imageList';

function BranchItemMap(props) {
    const { dataCard, imageDefault } = props;
    const distance = Math.round(dataCard?.distance);
    const gotoPath = () => {
        const url = `https://maps.google.com/?q=${dataCard.latitude},${dataCard.longitude}`
        const newWindow = window.open(`${url}`, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
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
                //onClick={gotoPageDetail}
                />
                <div className="card-map__item-content">
                    <div className="item-content__name">
                        {dataCard?.name}
                    </div>
                    <div className='item-content__address' >
                        <img src={img.mapPinActive} alt="" />
                        <span >
                            {dataCard.full_address}
                        </span>
                    </div>
                    <div
                        className="item-content__address"
                    >
                        {/* <img src={img.clock} alt="" />
                        {
                            timeOpen?.map((item, index) => (
                                <span
                                    style={index + 2 === today ? { display: 'block' } : { display: 'none' }}
                                    className="item-content__time"
                                >
                                    {
                                        item.time_opening === 'on' ?
                                            `Thứ ${today}: ${item.from_time_opening}-${item.to_time_opening}`
                                            :
                                            `Thứ ${today}:Đóng cửa`
                                    }
                                </span>
                            ))
                        } */}
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

export default BranchItemMap;