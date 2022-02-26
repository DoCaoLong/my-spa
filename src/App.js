// "import logo from './logo.svg';"
import AppProvider from "./context/AppProvider";
import RouterConfig from "./router/router_config";
import React, { useState, useEffect } from 'react';
import { Success } from "./utils/loadingOptions";
function App() {
  const [completed, setcompleted] = useState(undefined);
  useEffect(() => {
        setTimeout(()=>{
          setcompleted(true)
        },500);
  }, []);
    return (
      <>
        {!completed ? (
            <Success/>
        ) : (  
          <>
            <AppProvider>
            <RouterConfig />
            </AppProvider>
          </>
        )}
      </>
    );
}


export default App;
