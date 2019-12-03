// The main sidebar
import React from "react";
import Column from "./Column";
import { BorderBox } from "@primer/components";

export default props => {
  return (
    <Column
      as={BorderBox}
      bg="gray.0"
      minWidth="200px"
      border="none"
      borderRightWidth="1px"
      borderRightStyle="solid"
      borderRadius="0px"
      {...props}
    />
  );
};
