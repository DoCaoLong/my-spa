
import axiosClient from "./axiosClient";

class OrderOrgApi {
      getOrders = ({ token, page }) => {
            const url = `/orders`
            const params = {
                  limit: 6,
                  page: page,
                  sort: '-created_at',
                  include: 'itemsProduct|itemsService|itemsTreatmentCombo',
                  'filter[platform]': 'MOMO'
            }
            return axiosClient.get(url, {
                  params,
                  headers: {
                        Authorization: `Bearer ${token}`,
                  },
            });
      }
      getOrderServices = ({ token }) => {
            const url = `/orders/services?page=1&limit=15`;
            return axiosClient.get(url, {
                  headers: {
                        Authorization: `Bearer ${token}`,
                  },
            })
      }
      getServicesUser = ({ token, page }) => {
            const url = `/orders`;
            const params = {
                  limit: 4,
                  page: page,
                  sort: '-created_at',
                  include: 'services',
                  'filter[platform]': 'MOMO',
                  'filter[status]':'PAID'
            }
            return axiosClient.get(url, {
                  params,
                  headers: {
                        Authorization: `Bearer ${token}`,
                  },
            });
      }
}
const orderOrgApi = new OrderOrgApi();
export default orderOrgApi;