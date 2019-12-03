// An item in the sidebar
import React from "react";
import { BorderBox } from "@primer/components";

const ListItem = props => {
  return (
    <BorderBox
      py={3}
      ml={4}
      pr={5}
      border="none"
      borderBottomStyle="solid"
      borderBottomWidth="1px"
      {...props}
    ></BorderBox>
  );
};

export default ListItem;
