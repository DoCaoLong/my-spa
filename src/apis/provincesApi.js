import axiosClient from "./axiosClient";

class ProvincesApi {
      getProvinces = () => {
            const url = `/provinces`;
            const params = {
                  type: 'PROVINCE',
                  sort: '-organizations_count'
            }
            return axiosClient.get(url, { params })
      }
}
const provincesApi = new ProvincesApi();
export default provincesApi