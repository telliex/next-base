import prisma from '@/lib/prisma';

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>By: {post.author?.name ?? 'Unknown'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
