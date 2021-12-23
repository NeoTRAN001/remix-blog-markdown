import React from 'react';
import { Link } from 'remix';
import { Flex, Spacer, Box, Button,Heading } from '@chakra-ui/react';

export const Menu = () => {
  return (
    <Flex id="menu" mt="10px" mb="35px">
      <Box p='2'>
        <Link to="/">
          <Heading size='md'>QwertyPy</Heading>
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Link to="/create">
          <Button colorScheme='teal' mr='4'>
            Crear Post
          </Button>
        </Link>
      </Box>
    </Flex>
  )
}
