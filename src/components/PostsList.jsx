import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/api';
import { Spinner, Alert, Container, Card, Button } from 'react-bootstrap';
import EditPostForm from './EditPostForm';
import RemovePost from './RemovePost'; // Import RemovePost component

const PostsList = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  // Fetching data with useQuery
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    return (
      <Alert variant="danger" onClose={() => setShowEditForm(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{error.message}</p>
      </Alert>
    );
  }

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setShowEditForm(true);
  };

  const handleEditSuccess = () => {
    setShowEditForm(false);
    setSelectedPost(null);
  };

  return (
    <Container>
      {showEditForm && selectedPost && (
        <EditPostForm post={selectedPost} onSuccess={handleEditSuccess} />
      )}
      <div>
        {posts.map((post) => (
          <Card key={post.id} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>
                {post.body}
              </Card.Text>
              <Button 
                variant="primary" 
                onClick={() => handleEditClick(post)}
              >
                Edit
              </Button>
              <RemovePost post={post} /> {RemovePost}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default PostsList;
