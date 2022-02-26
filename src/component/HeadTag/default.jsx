import React from "react";
import Meta from "../Constant/MetaConst";
import { Helmet } from "react-helmet";
Default.propTypes = {};

function Default({ Title, Description }) {
  return (
    <Helmet>
      <meta name="description" content={Description || Meta.description} />
      <title>{Title || Meta.title}</title>
    </Helmet>
  );
}

export default Default;
