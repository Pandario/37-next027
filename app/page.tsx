import React from 'react';
import FetchDataPage from './fetchData/page';
import FetchData2Page from './fetchData2/page';

export default function Home() {
  return (
    <div>
      <h1>Main Page</h1>
      <p>Welcome to the main page of the application.</p>
      <FetchDataPage/>
      <FetchData2Page/>
    </div>
  );
}