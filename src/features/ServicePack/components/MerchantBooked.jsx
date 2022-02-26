import React, { useState } from 'react'
// import { useSelector } from "react-redux";
import Appointmented from './Appointmented';
import Checkbox from '@mui/material/Checkbox';

    function MerchantBooked({Name,key}) {
    // const serviceList = useSelector((state)=> state.serviceBooking);
    const [checked, setChecked] = useState(false);
	const [propsChecked, setPropsChecked] = useState();
    //console.log('service list');
    //console.log(serviceList);
	const handleChange = (event) => {
		//console.log(event.target.checked)
		setChecked(event.target.checked);
		setPropsChecked(event.target);
	};
    return(
        <div className="service-type">
            <div className='flex-row'>
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                    name={Name}
                />
                <h3 className="nunito-text-xl text-primary-color">{Name}</h3>
            </div>
            <hr className="purple-line" />
            <Appointmented
                key={key}
                setPropsChecked={setChecked}
                PropsChecked = {propsChecked}
                merchantName={(propsChecked)&&(propsChecked.name)}
            />
        </div>
    )
}

export default MerchantBooked;