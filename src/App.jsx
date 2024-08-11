import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostsList from './components/PostsList';
import NewPostForm from './components/NewPostForm';
import EditPostForm from './components/EditPostForm';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';




const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        
        <Route path='postsList' element={<PostsList />} />
        <Route path='/newPostForm' element={<NewPostForm />} />
        <Route path='editPostForm' element={<EditPostForm />} />
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;

