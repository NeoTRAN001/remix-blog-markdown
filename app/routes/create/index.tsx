import { Heading, Input, Textarea, Text, Box, Button } from '@chakra-ui/react';
import { Form, redirect, useActionData } from 'remix';
import { ActionFunction } from '@remix-run/server-runtime';
import { createPost } from '~/post';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get('title') as string;
  const body = formData.get('body') as string;
  const slug = formData.get('slug') as string;
  const img = formData.get('img') as string;

  let erros = {
    title: false,
    body: false,
    slug: false,
    img: false
  }

  if(!title) erros.title = true;
  if(!body) erros.body = true;
  if(!slug) erros.slug = true;
  if(!img) erros.img = true;

  if(erros.title || erros.body || erros.img || erros.slug) return erros;

  await createPost({ title, body, slug, img });

  return redirect('/posts/' + slug);
}

export default function Create() {

  const errors = useActionData();

  return (
    <Box m="20" mt="0">
      <Heading>Create Post</Heading>
      <Form method="post">
        <Text mb='8px' fontSize='1xl'>Title:</Text>
        <Input isInvalid={errors?.title} placeholder='Title' name='title'/>

        <Text mb='8px' fontSize='1xl'>Slug:</Text>
        <Input isInvalid={errors?.slug} placeholder='Slug' name='slug'/>
        
        <Text mb='8px' fontSize='1xl'>Image Address:</Text>
        <Input isInvalid={errors?.img} placeholder='Img address' name='img'/>
        
        <Text mb='8px' fontSize='1xl'>Content:</Text>
        <Textarea isInvalid={errors?.body} placeholder='Body Post' rows={5} name="body"/>
        
        <Button colorScheme='pink' variant='solid' mt="2" type="submit">
          Create
        </Button>
      </Form>
    </Box>
  )
}