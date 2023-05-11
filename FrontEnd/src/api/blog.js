import axios from 'axios';

//get all blogs
export const getAllBlogs = async () => {
  try {
    const response = await axios.get('http://localhost:9120/api/blog');
    console.log('blog', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//get blog by id
export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:9120/api/blog/${id}`);
    //console.log('blog', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//get accepted blogs
export const getAcceptedBlogs = async () => {
  try {
    const response = await axios.get('http://localhost:9120/api/blog');
    return response.data.filter((blog) => blog.isAccepted);
  } catch (error) {
    console.log(error);
    return [];
  }
};

//create blog
export const createBlog = async (blog) => {
  try {
    const response = await axios.post('http://localhost:9120/api/blog', blog);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//update blog
export const updateBlog = async (id, blog) => {
  try {
    const response = await axios.put(
      `http://localhost:9120/api/blog/${id}`,
      blog
    );
    console.log('blog', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//delete blog
export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:9120/api/blog/${id}`);
    console.log('blog', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//search blog
export const searchBlog = async (keyword) => {
  try {
    const response = await axios.get(
      `http://localhost:9120/api/blog/search/q=${keyword}`
    );
    console.log('blog', response);
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//comment on blog
export const commentonBlog = async (id, comment) => {
  try {
    const response = await axios.post(
      `http://localhost:9120/api/blog/comment/${id}`,
      comment
    );
    console.log('blog', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//like blog
export const likeBlog = async (id, user) => {
  try {
    const response = await axios.post(
      `http://localhost:9120/api/blog/like/${id}`,
      { userId: user }
    );
    console.log('blog', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//dislike blog
export const disLikeBlog = async (id, user) => {
  try {
    const response = await axios.post(
      `http://localhost:9120/api/blog/dislike/${id}`,
      { userId: user }
    );
    console.log('blog', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// update blog as accept
export const updateBlogAccept = async (id, blog) => {
  try {
    const response = await axios.put(
      `http://localhost:9120/api/blog/${id}/accept`,
      blog
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

//get blogs by author
export const getBlogsByAuthor = async (authorId) => {
  try {
    const response = await axios.get(
      `http://localhost:9120/api/blog/author/${authorId}`
    );
    return response.data.filter((blog) => blog.isAccepted);
  } catch (error) {
    console.log(error);
    return [];
  }
};

// update blog comment status
export const blogCommentAccept = async (id, blog) => {
  try {
    const response = await axios.put(
      `http://localhost:9120/api/blog/${id}/comment`,
      blog
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// delete blog comment
export const deleteBlogComment = async (id, commentId) => {
  try {
    const response = await axios.delete(
      `http://localhost:9120/api/blog/comment/${id}/${commentId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// handle bookmark
export const handleBlogBookamrk = async (id, user) => {
  try {
    const response = await axios.post(
      `http://localhost:9120/api/blog/bookmark/${id}`,
      { userId: user }
    );
    console.log('blog', response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// get user's bookmarked blogs
export const getBookmarkedBlogs = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:9120/api/blog/bookmark/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};