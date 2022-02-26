import React, { useState, useEffect } from 'react';
import organizationApi from '../../../apis/organizationApi';
import ServiceItem from './ServiceItem';

function OrgItem(props) {
      const { org_id, services, setAllOrg } = props;
      const [org, setOrg] = useState({})
      const servicesBtOrg = services.filter(item => item.organization_id === org_id)

      //const servicesSort = servicesBtOrg?.sort((a, b) => a?.)

      useEffect(()=>{
            async function handleGetOrgById(){
                  try {
                        const res = await organizationApi.getById({
                              id: org_id,
                              token:'',
                              branches:true
                        })
                        setOrg(res.data.context)
                        setAllOrg(prev => [...prev, res.data.context])
                  } catch (error) {
                        console.log(error)
                  }
            }
            handleGetOrgById()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      return (
            <>
                  <h3
                        id={org_id}
                        className="flex-row my-ser__org"
                  >
                        {org?.name}
                  </h3>
                  <ul>
                        {
                              servicesBtOrg.map((ser, index) => (
                                    <ServiceItem
                                          key={index}
                                          org={org}
                                          ser={ser}
                                    />
                              ))
                        }
                  </ul>
            </>
      );
}

export default OrgItem;