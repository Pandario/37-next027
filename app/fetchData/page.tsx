
'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchPosts } from '../../lib/features/posts/postsSlice';
import StoreProvider from '../StoreProvider';

function FetchDataContent() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.posts);
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h2>Posts</h2>
      {postStatus === 'loading' && <div>Loading...</div>}
      {postStatus === 'failed' && <div>{error}</div>}
      {postStatus === 'succeeded' && (
        <div>
          <ul>
            {currentPosts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <div>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{` Page ${currentPage} of ${totalPages} `}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
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