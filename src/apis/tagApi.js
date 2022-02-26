import axiosClient from "./axiosClient";

class TagsApi{
      getTags = () => {
            const url = `/tags`;
            return axiosClient.get(url)
      }
}
const tagsApi = new TagsApi();
export default tagsApi