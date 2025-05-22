import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import Counter from '@/components/Counter';
//import dynamic from 'next/dynamic';

//const UserForm = dynamic(() => import('@/components/UserForm'), { ssr: false });
import UserForm from '@/components/UserForm';

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>

      <div className="mb-8">
        <Counter />
      </div>

      <div className="mb-8">
        <UserForm />
      </div>

      <Button className="mb-4">Click me</Button>
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
