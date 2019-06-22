import React from "react";
import { Typography } from "material-ui";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const Loading = () => {
  return (
    <Typography align="center">
      <FontAwesomeIcon icon="spinner" size="2x" spin />
    </Typography>
  );
};

export default Loading;
