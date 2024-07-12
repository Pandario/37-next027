'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchPosts } from '../../lib/features/posts/postsSlice';
import StoreProvider from '../StoreProvider';

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

function FetchDataContent() {
  const dispatch = useAppDispatch();
  const posts: Post[] = useAppSelector((state) => state.posts.posts);
  const postStatus: string = useAppSelector((state) => state.posts.status);
  const error: string | null = useAppSelector((state) => state.posts.error);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }

    // Uncomment the following lines to enable periodic fetching every 2 seconds
    // const intervalId = setInterval(() => {
    //   dispatch(fetchPosts());
    // }, 2000);

    // return () => clearInterval(intervalId);
  }, [postStatus, dispatch]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      {postStatus === 'loading' && <div>Loading...</div>}
      {postStatus === 'failed' && <div>{error}</div>}
      {postStatus === 'succeeded' && (
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-4 flex-grow">
            {currentPosts.map((post) => (
              <div key={post.id} className="bg-white p-6 overflow-hidden rounded-lg shadow-md mb-6 h-64 max-w-xs mx-auto">
                <h3 className="text-xl font-bold mb-2">{truncateText(post.title, 30)}</h3>
                <p className="text-gray-700 overflow-hidden p-2 ">{truncateText(post.body, 150)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 lg:mt-0">
            <button
              onClick={handlePreviousPage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Previous
            </button>
            <span>{` Page ${currentPage} of ${totalPages} `}</span>
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FetchDataPage() {
  return (
    <StoreProvider>
      <FetchDataContent />
    </StoreProvider>
  );
}