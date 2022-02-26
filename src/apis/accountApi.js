import axiosClient from "./axiosClient";
class AccountApi {
      // const dispatch = useDispatch();
      loginUser = (props) => {
            const url = `/auth/momo`;
            const acc = {};
            acc.telephone = props.telephone;
            acc.fullname = props.name ? props.name : null;
            if (props?.email && props.email !== 'undefined') {
                  acc.email = props.email;
            }
            // //console.log('acc',acc)
            // alert(JSON.stringify(acc))
            return axiosClient.post(url, acc);
      }
      getAccount = () => {
            const url = `users/profile`;
            return axiosClient.get(url);
      }
}
const accountApi = new AccountApi();
export default accountApi;