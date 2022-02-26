import React, {useContext} from 'react';
import HomeBotSection from './HomeBotSection';
import Userguided from "../../Userguide/component/guided"
import {AppContext} from '../../../context/AppProvider'

function HomeBot() {
  const {listOrg} = useContext(AppContext)
  return (
    <>
      <div className="home-bot">
        <h2 className="home-bot-desc">Địa điểm bạn quan tâm</h2>
        <div className="home-bot-city">
          {
            listOrg?.map((item,index) => 
              <HomeBotSection
                key={index}
                code={item.proCode}
                title={item.proTitle}
                organization={item.listOrg.data}
              />
            )
          }
        </div>
      </div>
    <Userguided
      header={true}
    />
    </>
  );
}

export default HomeBot;
