import axiosClient from "./axiosClient";

class Category {
      getByOrg_id = (values) => {
            const url = `/organizations/${values.org_id}/service_categories`;
            const params = {
                  page: 1,
                  limit: 15,
                  is_momo_ecommerce_enable: true
            }
            return axiosClient.get(url, { params });
      }
}
const servicesCategory = new Category()
export default servicesCategory