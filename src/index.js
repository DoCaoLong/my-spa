import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Loading } from "./utils/loadingOptions";
// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

const App = React.lazy(() => import('./App'));
// Sentry.init({
//   dsn: "https://14466fb4887440789dc42a9b9e1bf7a2@o1108259.ingest.sentry.io/6147383",
//   integrations: [new Integrations.BrowserTracing()],

//   // We recommend adjusting this value in production, or using tracesSampler
//   // for finer control
//   tracesSampleRate: 1.0,
// });
ReactDOM.render(
  <Suspense fallback={
    <Loading/>
  }>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Suspense>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
