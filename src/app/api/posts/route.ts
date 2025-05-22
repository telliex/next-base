import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { ApiRoute } from '@/lib/decorators';

export const GET = ApiRoute({
  path: '/posts',
  method: 'GET',
  summary: 'Get all posts',
  description: 'Retrieve a list of all posts with their authors',
  tags: ['Posts'],
})(async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
});

export const POST = ApiRoute({
  path: '/posts',
  method: 'POST',
  summary: 'Create a new post',
  description: 'Create a new post with the provided information',
  tags: ['Posts'],
})(async (request: Request) => {
  const { title, content, authorId } = await request.json();
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      authorId,
    },
  });
  return NextResponse.json(post, { status: 201 });
});
