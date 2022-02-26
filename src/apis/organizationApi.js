
import axiosClient from './axiosClient';

const location_user = JSON.parse(sessionStorage.getItem('locationAccept'));
class OrganizationApi {

      getAll = () => {
            const params = {
                  'filter[is_momo_ecommerce_enable]': true,
                  sort: '-priority|-id'
            }
            const url = `/organizations`;
            return axiosClient.get(url, { params });
      }
      getOrgFavorite = ({ token }) => {
            const url = '/organizations';
            const params = {
                  page: 1,
                  limit: 15,
                  'filter[is_momo_ecommerce_enable]': true,
                  include: 'branches'
            }
            const config = token && {
                  headers: {
                        Authorization: `Bearer ${token}`,
                  },
            }
            return axiosClient.get(url, { ...config, params })
      }
      getById = ({ id, token, branches }) => {
            let params = {};
            branches && (params = { ...params, withBranches: branches })
            const url = `/organizations/${id}`;
            const config = token && {
                  headers: {
                        Authorization: `Bearer ${token}`,
                  },
            }
            return axiosClient.get(url, { ...config, params });
      }
      getOrganizationByProvince_code = ({ code, include, page, limit, is_not_momo }) => {
            // is_momo_ecommerce_enable = (is_not_momo) || true;
            const params = {
                  page: (page) ? page : 1,
                  limit: (limit) ? limit : 15,
                  'filter[is_momo_ecommerce_enable]': (is_not_momo) || true,
                  'filter[province_code]': code,
                  //include: include,
                  include: 'tags',
                  sort: '-priority|-id',
                  'filter[location]': location_user ? `${location_user.lat},${location_user.long}` : ''
            }
            const url = `/organizations`;
            return axiosClient.get(url, { params })
      }
      //
      getBySearchValue = (value) => {
            // is_momo_ecommerce_enable =null;
            const params = {
                  page: 1,
                  limit: 15,
                  include: 'tags',
                  sort: '-priority|-id',
                  'filter[keyword]': value.keyword,
                  'filter[location]': `${value.location?.lat},${value.location?.long}`
            }
            const url = `/organizations`;
            return axiosClient.get(url, { params });
      }
      getBySearchValueFilter = (values) => {
            console.log(values);
            const url = `/organizations`;
            const params = {
                  page: 1,
                  limit: 15,
                  'filter[keyword]': values.keyword,
                  include: 'tags',
                  sort: '-priority|-id',
                  'filter[tags]': values.tags,
                  'filter[min_price]': '',
                  'filter[max_price]': '',
                  'filter[location]': location_user ? `${location_user.lat},${location_user.long}` : ''
            }
            return axiosClient.get(url, { params })
      }
      getByFilterLocation = (coordinates) => {
            const params = {
                  'filter[location]': coordinates.lat + ', ' + coordinates.long
            }
            const url = `/organizations`
            return axiosClient.get(url, { params });
      }
      getByFilter = (values) => {
            const url = `/organizations`
            const params = {
                  page: values.page,
                  limit: 15,
                  'filter[tags]': values.stringTag,
                  'filter[province_code]': values.province_code,
                  include: 'tags',
                  sort: '-priority|-id',
                  'filter[is_momo_ecommerce_enable]': true,
                  'filter[min_price]': values.rangePrices.min,
                  'filter[max_price]': values.rangePrices.max,
                  'filter[location]': `${values.location_user?.lat},${values.location_user?.long}`
            }
            return axiosClient.get(url, { params })
      }
      getByFilerWithKeyword = (values) => {
            let params = {
                  'filter[tags]': values.stringTag,
                  'filter[keyword]': values.keyword,
                  include: 'tags',
                  sort: '-priority|-id',
                  'filter[is_momo_ecommerce_enable]': true,
            }
            values.rangePrices.min && (params = {
                  ...params,
                  'filter[min_price]': values.rangePrices.min,
            });
            values.rangePrices.max && (params = {
                  ...params,
                  'filter[max_price]': values.rangePrices.max,
            })
            const url = `/organizations`;
            return axiosClient(url, { params });
      }
}
const organizationApi = new OrganizationApi();
export default organizationApi;