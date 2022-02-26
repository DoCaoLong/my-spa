import axiosClient from "./axiosClient";

class ComboApi {
      getByOrg_id = (values) => {
            ////console.log(values);
            const params = {
                  page : values.page,
                  limit : 15,
                  is_momo_ecommerce_enable: true
            }
            const url = `/organizations/${values.org_id}/treatment_combo`;
            return axiosClient.get(url,{params});
      }
      getDetailById_orgId=(values)=>{
            const url = `/organizations/${values.org_id}/treatment_combo/${values.item_id}`;
            return axiosClient.get(url);
      }
}
const comboApi = new ComboApi();
export default comboApi;