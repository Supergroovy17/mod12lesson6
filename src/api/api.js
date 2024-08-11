import axios from 'axios';

// Fetching posts from the API
export const fetchPosts = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log('Fetching ');
        return response.data;
    } catch (err) {
        console.error('Error fetching posts:', err);
        throw err; 
    }
};

// Adding a new post to the API
export const addPost = async ({ title, body }) => {
    try {
        if (!title || !body) {
            throw new Error('Title and body are required');
        }

        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            title,
            body,
        });
        return response.data;
    } catch (err) {
        console.error('Error adding post:', err);
        throw err; 
    }
};

// Updating a post in the API
export const updatePost = async ({ id, title, body }) => {
    try {
      if (!id || !title || !body) {
        throw new Error('ID, title, and body are required');
      }
     
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {id, title, body });
     console.log(response.data)
      return response.data;
    } catch (err) {
      console.error('Error updating post:', err);
      throw err;
    }
  };
// Deleting a post from the API
export const deletePost = async (postId) => {
  try {
      const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      console.log('Response:', response); 
      return postId; 
  } catch (err) {
      console.error('Error deleting post:', err);
      throw err; 
  }
};