import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Text,
  Container,
  Button,
  Center,
  SimpleGrid,
} from '@chakra-ui/react';
const Footer = () => {
  let { push } = useHistory();
  return (
    <Box bgGradient="linear(to-l, gray.50, gray.100)">
      <Container
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <SimpleGrid columns={2} spacing={2}>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => {
              push('/');
            }}
          >
            Home page
          </Button>
          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => {
              push('/settings');
            }}
          >
            Settings
          </Button>
        </SimpleGrid>
        <Center my={4}>
          <Text>Made with ❤️ &nbsp;by Samir</Text>
        </Center>
      </Container>
    </Box>
  );
};

export default Footer;
