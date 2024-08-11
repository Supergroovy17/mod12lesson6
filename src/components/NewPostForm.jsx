import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addPost } from '../api/api'
import { Container, Form, Button, Alert } from 'react-bootstrap'; 


const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showError, setShowError] = useState(false); // Added for error handling
  
  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      console.log(data);
  
    },
    onError: () => {
      setShowError(true); 
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Mutate and call addPost with the post data
    mutate({ title, body });
  };

  return (
    <Container>
      {isError && showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      )}
      <h1>Add Post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="body">
          <Form.Label>Body</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isLoading ? 'Adding Post...' : 'Add Post'}
        </Button>
      </Form>
    </Container>
  );
};

export default NewPostForm;

