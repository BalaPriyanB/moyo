import axios from "axios";

const base = "https://moyo-mhe5.onrender.com";

const handleError = (error) => {
  if (error.response && error.response.data.message) {
    throw new Error(error.response.data.message);
  }
  throw new Error(error.message);
};

export const getAllPosts = async (searchKeyword = "", page = 1, limit = 10) => {
  try {
    const { data, headers } = await axios.get(
      `${base}/api/posts`, 
      {
        params: { searchKeyword, page, limit }
      }
    );
    return { data, headers };
  } catch (error) {
    handleError(error);
  }
};

export const getSinglePost = async ({ slug }) => {
  try {
    const { data } = await axios.get(`${base}/api/posts/${slug}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const deletePost = async ({ slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(`${base}/api/posts/${slug}`, config);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const updatePost = async ({ updatedData, slug, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`${base}/api/posts/${slug}`, updatedData, config);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createPost = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(`${base}/api/posts`, {}, config);
    return data;
  } catch (error) {
    handleError(error);
  }
};
