import { Link, useLoaderData } from 'remix';
import { getPosts, PostAttributes } from '~/post';
import { Wrap, WrapItem, Image, Box, Badge, Center } from '@chakra-ui/react';

export const loader = () => {
  return getPosts();
}

export default function Index() {

  const posts = useLoaderData<PostAttributes[]>();

  return (
    <Center>
      <Wrap>
          {
            posts.map(post => {
              return (
                <WrapItem key={post.slug}>
                  <Link to={`/posts/${post.slug}`}>
                    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                      
                      <Image src={post.img} />

                      <Box p='6'>
                        <Box display='flex' alignItems='baseline'>
                          <Badge borderRadius='full' px='2' colorScheme='teal'>
                            New
                          </Badge>
                        </Box>

                        <Box
                          mt='1'
                          fontWeight='semibold'
                          as='h4'
                          lineHeight='tight'
                          isTruncated
                        >
                          {post.title}
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                </WrapItem>
              )
            })
          }
      </Wrap>
    </Center>
  );
}
