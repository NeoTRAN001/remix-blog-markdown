import path from 'path';
import fs from 'fs/promises';
import fm from 'front-matter';
import { marked } from 'marked';

export type PostAttributes = {
  slug: string,
  title: string,
  img: string,
  content: string
}

type Post = {
  attributes: PostAttributes,
  body: string
}

type NewPost = {
  body: string,
  slug: string,
  img: string,
  title: string
}

const postPath = path.join(__dirname, '..', 'posts');

export const getPosts = async () => {
  const dir = await fs.readdir(postPath);

  return Promise.all(dir.map(async (filename) => {
    const file = await fs.readFile(path.join(postPath, filename), 'utf8');
    const { attributes } : Post = fm(file.toString());

    return { 
      slug: filename.replace('.md', ''),
      title: attributes.title,
      img: attributes.img
    }
  }));
}

export const getPost = async (slug: string) => {
  const file = await fs.readFile(path.join(postPath, `${slug}.md`), 'utf8');
  const { attributes, body } : Post = fm(file.toString());

  return {
    body: marked(body),
    slug,
    title: attributes.title,
    img: attributes.img
  }
}

export const createPost = async (post: NewPost) => {
  const newPost: string = `---
title: ${post.title}
img: ${post.img}
---

${post.body}
  `;

  await fs.writeFile(
    path.join(postPath, `${post.slug}.md`),
    newPost  
  );

  return getPost(post.slug);
}