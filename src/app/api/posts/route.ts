import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });
  return NextResponse.json(posts);
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
