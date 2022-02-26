import axiosClient from "./axiosClient";
class ApointmentApi {
  sendApointment = (props) => {
    const url = "organizations/" + props.orgId + "/appointments";

    return axiosClient.post(
      url,
      {
        ...props.apointment,
      },
      {
        headers: {
          Authorization: "Bearer " + props.token, // headers token
        },
      }
    );
  };  
  //get
  getAppoitment = ({month,token}) => {
    const params = {
      page: 1,
      limit : 500,
      sort:'-time_start',
      'filter[time_start]': month
    }
    const url = `appointments`;
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  // get detail appointment by id
  getAppointmentById = ({id, token}) => {
    const url = `appointments/${id}`;
    return axiosClient.get(url,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  //post
  postAppointment = ({org_id, values, token}) => { 
    const url = `organizations/${org_id}/appointments`
    return axiosClient.post(url, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
const apointmentApi = new ApointmentApi();
export default apointmentApi;
