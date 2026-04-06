'use client';
import { useEffect, useState , use } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

const postSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  body: z.string().min(10, "Body must be at least 10 characters"),
});
export default function UserPosts({ params}: {params: Promise<{id: string}>}) {
const resolvedParams = use(params);
const userId = resolvedParams.id;
  const [apiIsLoading, setApiIsLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(postSchema)
  });
useEffect(() => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  fetch(`${apiUrl}/posts?userId=${userId}`)
    .then(res => {
      if(!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      setPosts(data);
      setApiIsLoading(false);
    })
    .catch(() => {
      setApiError(true);
      setApiIsLoading(false);
    });
}, [userId]);

  const onSubmit = (data: any) => {
    const newPost = { ...data, id: Date.now(), userId: Number(userId) };
    setPosts([newPost, ...posts]);
    reset();
    alert("Post added locally!");
  };

  if (apiIsLoading) return <p className="p-10 text-center text-xl">Loading posts...</p>;
  if (apiError) return <p className="p-10 text-center text-red-500">Something went wrong</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link href="/" className="text-blue-500 mb-6 inline-block">← Back to Users</Link>
      
      <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-12 space-y-4 bg-gray-50 p-6 rounded-lg shadow-inner">
        <div>
          <input {...register("title")} placeholder="Post Title" className="w-full border p-3 rounded text-black" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message as string}</p>}
        </div>
        
        <div>
          <textarea {...register("body")} placeholder="What's on your mind?" className="w-full border p-3 rounded text-black h-32" />
          {errors.body && <p className="text-red-500 text-xs mt-1">{errors.body.message as string}</p>}
        </div>
        
        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 w-full transition">
          Submit Post
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-black">User Posts</h2>
      <div className="space-y-6">
        {posts.map((post: any) => (
          <div key={post.id} className="p-4 bg-white border border-gray-100 shadow-sm rounded-lg">
            <h3 className="font-bold text-lg capitalize mb-2 text-black">{post.title}</h3>
            <p className="text-gray-700 leading-relaxed">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}