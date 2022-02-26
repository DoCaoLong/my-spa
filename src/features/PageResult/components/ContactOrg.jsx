import React, { useState } from 'react';

function ContactOrg(props) {
      const [contacted, setContacted] = useState(false);
      const handleSubmit = () => {
            setContacted(true);
            if(contacted === false){
                  //console.log('org_id');
            }
      }
      return (
            <div className="org-de__contact">
                  <div className="org-de__contact-title">
                        {`Doanh nghiệp chưa liên kết \n nhấn "Quan tâm" để nhận thông tin"`}
                  </div>
                  <button
                        onClick={handleSubmit}
                        style={contacted === true ? { backgroundColor: 'var(--purple)', color: '#FFFFFF' } : {}}
                  >
                        {contacted === true ? 'Đã quan tâm' : 'Quan tâm'}
                  </button>
            </div>
      );
}

export default ContactOrg;