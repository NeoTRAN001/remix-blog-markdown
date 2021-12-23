import { LoaderFunction, useLoaderData } from "remix";
import { getPost } from "~/post";
import { Text, Image, Divider } from "@chakra-ui/react";

export const loader : LoaderFunction = ({ params }) => {
  const { slug } = params;

  if(slug === undefined) throw new Error('Slug is required');
  return getPost(slug);
}

export default function Post() {
  const post = useLoaderData();

  return (
    <>
      <Text fontSize='4xl'>{post.title}</Text>
      <Image boxSize='150px' src={post.img} objectFit='cover'/>
      <Divider></Divider>
      <div dangerouslySetInnerHTML={{__html: post.body}} />
    </>
  )
}