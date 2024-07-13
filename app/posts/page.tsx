'use client';

import React, { useEffect, useState } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch posts from local storage
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-4 flex-grow">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 overflow-hidden rounded-lg shadow-md mb-6 h-64 max-w-xs mx-auto">
              <h3 className="text-xl font-bold mb-2">{truncateText(post.title, 30)}</h3>
              <p className="text-gray-700 overflow-hidden p-2 ">{truncateText(post.body, 150)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <PostsPage />;
}