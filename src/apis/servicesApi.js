import axiosClient from './axiosClient';

class ServicesApi {
      getServicesByOrg = (values) => {
            const params = {
                  page : values.page,
                  limit : 15,
                  is_momo_ecommerce_enable : true,
            }
            const url = `/organizations/${values.org_id}/services`;
            return axiosClient.get(url,{params});
      }
      getDetailById_orgId = (values) => {
            const url = `/organizations/${values.org_id}/services/${values.item_id}`;
            return axiosClient.get(url);
      }
      getByOrgId_cateId = (values) => {
            const params = {
                  page : values.page,
                  limit : 15,
                  'filter[service_group_id]' : values.cate_id,
                  is_momo_ecommerce_enable : true,
            }
            const url = `/organizations/${values.org_id}/services`;
            return axiosClient.get(url, { params });
      }
      getBySearch = (values) => {
            const params = {
                  page: 1,
                  limit: 15,
                  'filter[keyword]': values.searchKey,
                  is_momo_ecommerce_enable: true,
            }
            const url = `/organizations/${values.org_id}/services`
            //const url = `/organizations/1/services?page=1&limit=15&filter[keyword]=${params.searchKey}&is_momo_ecommerce_enable=true`
            return axiosClient.get(url, { params });
      }
      getBySpecial = (values) => {
            const url = `/organizations/${values.org_id}/services`
            const params = {
                  special: true,
                  is_momo_ecommerce_enable: true
            }
            return axiosClient.get(url, { params });
      }
}
const servicesApi = new ServicesApi();
export default servicesApi;