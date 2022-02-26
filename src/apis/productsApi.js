import axiosClient from './axiosClient';

class ProductsApi {
      getAllProductByOrganizationId = (values) => {
            const params = {
                  page : values.currentPage,
                  is_momo_ecommerce_enable: true,
            }
            const url = `organizations/${values.organization_id}/products`;
            return axiosClient.get(url,{params});
      }
      getProductByCategoryId = (values)=>{
            ////console.log(values);
            const params = {
                  page : values.currentPage,
                  limit : 15,
                  'filter[product_category_id]' : values.category_id,
                  is_momo_ecommerce_enable : true,
            }
            const url = `/organizations/${values.organization_id}`
                  + `/products`;
            return axiosClient.get(url,{params});
      }
      getDetailById_orgId=(values)=>{
            const url = `/organizations/${values.org_id}/products/${values.item_id}`
            return axiosClient.get(url);
      }
      getBySearch=(values)=>{
            const params = {
                  page : values.currentPage,
                  limit : 15,
                  'filter[keyword]' : values.searchKey,
                  is_momo_ecommerce_enable : true,
            } 
            const url = `/organizations/${values.org_id}/products`;
            return axiosClient.get(url,{params});
      }
      
      getBySpecial=(values)=>{
            const url = `/organizations/${values.organization_id}/products`
            const params={
                  special: true,
                  is_momo_ecommerce_enable: true
            }
            return axiosClient.get(url,{params});
      }

}
const productsApi = new ProductsApi();
export default productsApi;