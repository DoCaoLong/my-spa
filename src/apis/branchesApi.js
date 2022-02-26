import axiosClient from "./axiosClient";

class BranchesApi{
      getAll=()=>{
            const url=`/branches`;
            return axiosClient.get(url);
      }
      getBranchesByOrganizationId=(id)=>{
            const url =`/organizations/${id}/branches`;
            return axiosClient.get(url, {id});
      }
}
const branchesApi = new BranchesApi();
export default branchesApi;