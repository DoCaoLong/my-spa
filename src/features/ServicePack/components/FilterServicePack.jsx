import { Button } from "@mui/material";
import React, { useState } from "react";
import img from "../../../constants/imageList";


const $ = document.querySelector.bind(document);
function openLocation() {
    $('.home-filter-location__drop').classList.toggle('home-filter-drop-active')
}
const openFilterLocation = () => {
    openLocation();
}
const DataService = [
    {
        id: 1,
        name: "Kanessa Beayty & Spa 1",
    },
    {
        id: 2,
        name: "Kanessa Beayty & Spa 2",
    },
    {
        id: 3,
        name: "Kanessa Beayty & Spa 3",
    },
    {
        id: 4,
        name: "Kanessa Beayty & Spa 4",
    },
    {
        id: 5,
        name: "Kanessa Beayty & Spa 5",
    },
    {
        id: 6,
        name: "Kanessa Beayty & Spa 6",
    },
    {
        id: 7,
        name: "Kanessa Beayty & Spa 7",
    },
    {
        id: 8,
        name: "Kanessa Beayty & Spa 8",
    },
];

function FilterServicePack() {
    const [chooseLocation, setChooseLocation] = useState('');
    const [search, setSearch] = useState('')

    const handleChooseLocation = (location) => {
        setChooseLocation(location);
        openLocation();
    }
    //handle search term
    const onChangeInputSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    return (
        <>
            <div className="pdx-24 servicepack-filter-container">
                <div className="servicepack-filter-wrap " onClick={openFilterLocation}>
                    <span className="servicepack-filter-input nunito-text-md text-grey-color ">
                        {chooseLocation
                            ? `${chooseLocation.name}`
                            : `Chọn doanh nghiệp bạn muốn đặt hẹn`}
                    </span>
                    <img
                        className="servicepack-filter-btn"
                        src={img.arrowDownIconWhite}
                        alt=""
                    />
                    <div className="home-filter-location-wrapper">
                        <ul className="home-filter-location__drop ">
                            <input
                                onChange={onChangeInputSearch}
                                value={search}
                                type="text"
                                className="home-filter-location__drop-search"
                                placeholder="Tìm kiếm khu vực..."
                            />
                            {DataService?.map((item) => (
                                <li key={item.id}>
                                    <Button
                                        style={
                                            chooseLocation === item
                                                ? { backgroundColor: "#7161ba", color: "#f5f5f7" }
                                                : { backgroundColor: "#f5f5f7", color: "#7161ba" }
                                        }
                                        onClick={() => handleChooseLocation(item)}
                                    >
                                        <span className="limit-1-line-text"> {item.name}</span>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterServicePack;
