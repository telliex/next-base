import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
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
}

export async function POST(request: Request) {
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
}
