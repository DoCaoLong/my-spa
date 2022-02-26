import axiosClient from "./axiosClient";
class PaymentApi{
    // const dispatch = useDispatch();
    getMethod=()=>{
          const url=`/paymentmethods`;
          return axiosClient.get(url);
    }
    sendPayment=(props)=>{
          const url ='organizations/'+props.carts.locationId+'/orders';
          let method = props.method.data.filter(item => item.name_key ==="MOMO")[0];

          return axiosClient.post(url,
                {
                    ...props.carts.obj, 
                    "payment_method_id": method.id
                },
                {
                    headers: {
                        'Authorization': 'Bearer '+props.token// headers token
                    }
                });
    }
    getStatus=(props)=>{
        const url ='paymentgateways/'+props.paymentId+'/status?cancel='+(props.cancel)||false;
        return axiosClient.get(url,{
            headers: {
                'Authorization': 'Bearer '+props.token// headers token
            }
        });
    }
}
const paymentApi = new PaymentApi();
export default paymentApi;