// The title of the sidebar
import React from "react";
import { Heading } from "@primer/components";

const SidebarTitle = props => (
  <Heading
    color="bodytext"
    as="h1"
    fontSize={3}
    px={4}
    pt={4}
    pb={3}
    {...props}
  />
);

export default SidebarTitle;
