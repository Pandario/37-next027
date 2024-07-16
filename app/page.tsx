'use client'
import React, { useState } from 'react';



import CreatePostPage from './components/CreatePostPage';
import FetchDataPage from './components/FetchDataPage';
import FetchData2Page from './components/FetchData2Page';
import PostsPage from './components/PostsPage';


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