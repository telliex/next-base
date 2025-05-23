import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import Counter from '@/components/Counter';
import Link from 'next/link';
//import dynamic from 'next/dynamic';

//const UserForm = dynamic(() => import('@/components/UserForm'), { ssr: false });

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div className="container mx-auto p-4">
      <header className="py-4 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Practice</h1>
        <div className="space-x-4">
          <Link href="/login">
            <Button variant="outline">登入</Button>
          </Link>
          <Link href="/register">
            <Button>註冊</Button>
          </Link>
        </div>
      </header>

      <div className="mb-8">
        <Counter />
      </div>

      <h2 className="text-2xl font-bold mb-4">文章列表</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="my-2">{post.content}</p>
            <p className="text-sm text-gray-600">
              By: {post.author?.name ?? 'Unknown'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
