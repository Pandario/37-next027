'use client';

import React, { useState } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const CreatePostPage = ({ onPostCreated }: { onPostCreated: () => void }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleCreatePost = () => {
    const newPost: Post = {
      userId: 1,
      id: Date.now(), // Using timestamp as a unique ID
      title,
      body,
    };

    // Store posts in local storage
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    storedPosts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(storedPosts));

    setTitle('');
    setBody('');

    // Notify parent component about the new post
    onPostCreated();
  };

  return (
    <div className="container  w-1/3 mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Post</h2>
      <div className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={8}
          />
        </div>
        <button
          onClick={handleCreatePost}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;