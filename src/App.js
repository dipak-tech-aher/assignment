import React from 'react';
import ParentCheckbox from './ParentCheckbox';
import ChildCheckbox from './ChildCheckbox';
import APIProgressBar from './ProgressBar';

const App = () => {
  const apiUrls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/comments',
    'https://jsonplaceholder.typicode.com/albums'
  ];

  return (
    <>

      <div>
        <ParentCheckbox label="Parent">
          <ChildCheckbox label="Child 1" />
          <ChildCheckbox label="Child 2" />
          <ChildCheckbox label="Child 3" />
        </ParentCheckbox>
      </div>
      <div>
        <h1>API Progress Bar Example</h1>
        <APIProgressBar urls={apiUrls} />
      </div>
    </>
  );
};

export default App;
