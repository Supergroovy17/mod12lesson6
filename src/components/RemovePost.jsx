import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Alert } from 'react-bootstrap'; 
import { deletePost } from '../api/api'; 


const RemovePost = ({ post }) => {
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']); 
    },
    onError: (error) => {
      
      console.error('Error deleting post:', error);
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(post.id);
    }
  };
  
  return (
    <div className="post">
      {deletePostMutation.isError && (
        <Alert variant="danger">
          <Alert.Heading>Deletion Error</Alert.Heading>
          <p>{deletePostMutation.error.message}</p>
        </Alert>
      )}
      <Button 
        variant="danger" 
        onClick={handleDelete} 
        disabled={deletePostMutation.isLoading}
      >
        {deletePostMutation.isLoading ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  );
};

export default RemovePost;
