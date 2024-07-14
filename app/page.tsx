'use client'
import React, { useState } from 'react';
import FetchDataPage from './fetchData/page';
import FetchData2Page from './fetchData2/page';

import PostsPage from './posts/page';
import CreatePostPage from './components/CreatePostPage';


export default function Home() {
  const [updateKey, setUpdateKey] = useState(0);

  const handlePostCreated = () => {
    setUpdateKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <h1>Main Page</h1>
      <p>Welcome to the main page of the application.</p>
      <FetchDataPage/>
      <FetchData2Page/>
      <CreatePostPage onPostCreated={handlePostCreated}/>
      <PostsPage key={updateKey}/>

    </div>
  );
}