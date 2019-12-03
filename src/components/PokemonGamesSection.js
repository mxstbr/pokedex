// The "Games" section of the Pokemon details column
import React from "react";
import { Box } from "@primer/components";
import ProfileSection from "./ProfileSection";
import ProfileSectionTitle from "./ProfileSectionTitle";

export default ({ games }) => (
  <ProfileSection>
    <ProfileSectionTitle>Games</ProfileSectionTitle>
    <Box as="ul">
      {games.map(game => (
        <li key={game.id}>
          {game.names.find(name => name.language.name === "en").name}
        </li>
      ))}
    </Box>
  </ProfileSection>
);
