// The main pokemon profile in the details view, renders some basic information about a pokemon
import React from "react";
import { Flex, Heading, Text } from "@primer/components";
import ProfileSection from "./ProfileSection";
import ProfileSectionTitle from "./ProfileSectionTitle";

export default ({ pokemon }) => (
  <>
    <ProfileSection>
      <Flex alignItems="center">
        <Heading as="h1">{pokemon.name}</Heading>
        <img
          src={pokemon.sprites.front_default}
          alt={`${pokemon.name} sprite`}
        />
      </Flex>
    </ProfileSection>
    <ProfileSection>
      <ProfileSectionTitle>Stats</ProfileSectionTitle>
      <Flex flexWrap="wrap">
        {pokemon.stats.map(stat => (
          <Flex
            flex="1 0 30%"
            mr={2}
            my={2}
            flexDirection="column"
            alignItems="flex-start"
            key={stat.stat.name}
          >
            <Text fontSize={1} color="gray.6">
              {stat.stat.name}
            </Text>
            <Text fontSize={4} fontWeight="bold">
              {stat.base_stat}
            </Text>
          </Flex>
        ))}
      </Flex>
    </ProfileSection>
    <ProfileSection>
      <ProfileSectionTitle>Abilities</ProfileSectionTitle>
      <ul>
        {pokemon.abilities.map(({ ability }) => (
          <li key={ability.name}>{ability.name}</li>
        ))}
      </ul>
    </ProfileSection>
  </>
);
