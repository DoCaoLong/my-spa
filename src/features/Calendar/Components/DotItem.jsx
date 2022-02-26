import React, { useState, useEffect } from "react";

function DotItem(props) {
  const { dotStatus } = props;
  const [element, setElement] = useState();
  useEffect(() => {
    switch (dotStatus) {
      case "CONFIRMED":
        return setElement(
          <span className="appoi__detail status-dot-green status-dot" />
        );
      case "ARRIVED":
        return setElement(
          <span className="appoi__detail status-dot-green status-dot" />
        );
      case "NEW":
        return setElement(
          <span className="appoi__detail status-dot-blue status-dot" />
        );
      case "ONL_BOOKING":
        return setElement(
          <span className="appoi__detail status-dot-blue status-dot" />
        );
      case "DONE":
        return setElement(
          <span className="appoi__detail status-dot-purple status-dot" />
        );
      case "CANCEL":
        return setElement(
          <span className="appoi__detail status-dot-red status-dot" />
        );
      case "NOT COME":
        return setElement(
          <span className="appoi__detail status-dot-red status-dot" />
        );
      default:
        break;
    }
  }, [dotStatus]);
  return <div>{element}</div>;
}

export default DotItem;
