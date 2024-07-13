'use client';

import React, { useEffect, useMemo, useState } from 'react';

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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    // Fetch posts from local storage
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = useMemo(() => posts.slice(indexOfFirstPost, indexOfLastPost), [posts, indexOfFirstPost, indexOfLastPost]);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage === totalPages ? 1 : prevPage + 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? totalPages : prevPage - 1));
  };

  const handleDeleteLastPost = () => {
    if (posts.length > 0) {
      const updatedPosts = [...posts];
      updatedPosts.pop(); // Remove the last post
      setPosts(updatedPosts);
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <div className="flex flex-col">
        
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-4 flex-grow">
            {currentPosts.map((post) => (
              <div key={post.id} className="bg-white p-6 overflow-hidden rounded-lg shadow-md mb-6 h-64 w-80 mx-auto">
                <h3 className="text-xl font-bold mb-2">{truncateText(post.title, 30)}</h3>
                <p className="text-gray-700 overflow-hidden p-2">{truncateText(post.body, 150)}</p>
              </div>
            ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-center">
            <div className="bg-white p-6 overflow-hidden rounded-lg shadow-md mb-6 h-64 w-80">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Posts</h3>
                <p className="text-gray-700">Not found &#58;&#40;</p>
              </div>
            </div>
            </div>
          )}
        
        <div className="flex justify-between items-center mt-4 lg:mt-0">
          <button
            onClick={handlePreviousPage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Previous
          </button>

          <span>{` Page ${currentPage} of ${totalPages} `}</span>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleDeleteLastPost}
            >
              Delete
          </button>
          <button
            onClick={handleNextPage}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <PostsPage />;
}