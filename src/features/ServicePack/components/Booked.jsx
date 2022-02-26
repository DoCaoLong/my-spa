import React from 'react'
import MerchantBooked from './MerchantBooked'
// import Merchant from './Merchant';
export default function Booked() {
    const MerchantList = [
	{
		id:"1",
		Name:"SPA NAME 1"
	},
	{
		id:"2",
		Name:"SPA NAME 2"
	}
]
    return (
		<>
		{MerchantList?.map((item,index)=>(
			<MerchantBooked
				key={index}
				Name={item.Name}
			/>
			// <div className="service-type">
			// <Merchant
			// key={index}
			// Name={item.Name}
			// />
			// </div>
		))}
		</>
    )
}
