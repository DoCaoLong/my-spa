import axiosClient from "./axiosClient";
class GalleriesApi {
  // get detail appointment by id
  getGalleriesByOrgId = (id) => {
    return axiosClient.get(
      `/organizations/${id}/moba_galleries?page=1&limit=15`
    );
  }
}
const galleriesApi = new GalleriesApi();
export default galleriesApi;
