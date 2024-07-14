'use client';

import React, { useState } from 'react';

/**
 * Represents a post object.
 */
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/**
 * Props for the CreatePostPage component.
 */
interface CreatePostPageProps {
  onPostCreated: (newPost: Post) => void;
}

/**
 * CreatePostPage component allows users to create a new post.
 * It stores the post in local storage and notifies the parent component.
 * 
 * @param {CreatePostPageProps} props - The props for the component.
 * @returns {JSX.Element} The rendered CreatePostPage component.
 */
const CreatePostPage: React.FC<CreatePostPageProps> = ({ onPostCreated }) => {
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');

  /**
   * Handles the creation of a new post.
   * Stores the new post in local storage and notifies the parent component.
   * 
   * @returns {Post} The newly created post object.
   */
  const handleCreatePost = (): Post => {
    const newPost: Post = {
      userId: 1,
      id: Date.now(), // Using timestamp as a unique ID
      title,
      body,
    };

    // Store posts in local storage
    const storedPosts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');
    storedPosts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(storedPosts));

    setTitle('');
    setBody('');

    // Notify parent component about the new post
    onPostCreated(newPost);

    return newPost;
  };

  return (
    <div className="container lg:w-1/3 mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Post</h2>
      <div className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700  text-sm font-bold mb-2">Body</label>
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