import axiosClient from './axiosClient';

class ProductCategoryOrg {
      getCategoryByOrgId = (values) => {
            const url = `/organizations/${values.organization_id}/product_categories`;
            //const url = `https://devapi.myspa.vn/v1/organizations/${values.organization_id}/product_categories?is_momo_ecommerce_enable=true&page=1&limit=15`
            const params = {
                  page: 1,
                  limit: 15,
                  is_momo_ecommerce_enable: true,
            }
            return axiosClient.get(url,{params})
      }
}
const productCategoryOrg = new ProductCategoryOrg();
export default productCategoryOrg;