import React from 'react';
import { Heading } from 'evergreen-ui';
import { Text, Box, Switch, SimpleGrid } from '@chakra-ui/react';
import Footer from '../components/Footer';

export const Settings = () => {
  return (
    <>
      <Box w={350} h={300} borderRadius="xl" p={4}>
        <Box mr={2}>
          <Heading size={900}>Settings</Heading>
        </Box>
        <Box my={3}>
          <SimpleGrid columns={2} spacing={2}>
            <Box>
              <Text fontSize="md">Auto OCR</Text>
              <Switch colorScheme="red" size="md" />
            </Box>
            <Box>
              <Text fontSize="md">Avoid Ads</Text>
              <Switch colorScheme="red" size="md" />
            </Box>
            <Box>
              <Text fontSize="md">Manual Entry</Text>
              <Switch colorScheme="red" size="md" />
            </Box>
            <Box>
              <Text fontSize="md">Save Screenshot</Text>
              <Switch colorScheme="red" size="md" />
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
      <Footer></Footer>
    </>
  );
};
