import React from 'react'
import MerchantNoBook from './MerchantNoBook';
// import myOrders from '../../../dataOrders';

export default function NoBooked() {
	// const myServices = myOrders.filter(item => item.status === 'COMPLETE')
	//console.log(myServices);
	const MerchantList = [
		{
			id: "1",
			Name: "SPA NAME 1"
		},
		{
			id: "2",
			Name: "SPA NAME 2"
		}
	]
	return (
		<>
			{MerchantList?.map((item, index) => (
				<MerchantNoBook
					key={index}
					Name={item.Name}
				/>
			))}
		</>
	)
}
