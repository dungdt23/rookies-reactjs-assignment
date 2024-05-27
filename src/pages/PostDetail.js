import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Container } from '@mui/material';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/posts/${id}`);
        setPost(result.data);
        console.log("Detail" + result.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Post Detail Information
      </Typography>
      <Typography variant="body1" gutterBottom>
        ID: {post?.id}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Ttile: {post?.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Views: {post?.views}
      </Typography>
    </Container>
  );
};

export default PostDetail;
