import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Alert, Form } from 'react-bootstrap';
import { updatePost } from '../api/api';

const EditPostForm = ({ post, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      setTitle('');
      setBody('');
      setShowSuccess(true);
      if (onSuccess) onSuccess();
    },
    onError: () => {
      setShowError(true);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (post) {
      mutate({ id: post.id, title, body });
    }
  };

  return (
    <div>
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          <Alert.Heading>Success!</Alert.Heading>
          <p>The post was updated successfully.</p>
        </Alert>
      )}
      {isError && showError && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="body">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Post'}
        </Button>
      </Form>
    </div>
  );
};

export default EditPostForm;
