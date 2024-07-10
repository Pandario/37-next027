
'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchReversedPosts } from '../../lib/features/posts/reversedPostsSlice';
import StoreProvider from '../StoreProvider';

function FetchData2Content() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.reversedPosts.posts);
  const postStatus = useAppSelector((state) => state.reversedPosts.status);
  const error = useAppSelector((state) => state.reversedPosts.error);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchReversedPosts());
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
      <h2>Reversed Posts</h2>
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

export default function FetchData2Page() {
  return (
    <StoreProvider>
      <FetchData2Content />
    </StoreProvider>
  );
}