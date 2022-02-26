import axiosClient from './axiosClient';

class Favorite {
      orgLike = (id, tk) => {
            const params = {
                  organization_id: id
            }
            const url = `/favorites`
            return axiosClient.post(url, params, {
                  headers: {
                        Authorization: `Bearer ${tk}`,
                  },
            });
      };
      orgDisLike = (id, tk) => {
            const url = `/favorites`
            return axiosClient.delete(url, {
                  headers: {
                        Authorization: `Bearer ${tk}`,
                  },
                  data: { organization_id: id }
            });
      }
}
const favorite = new Favorite();
export default favorite;