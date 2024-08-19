const axios = require('axios').default;

/**
 * Fetches posts from a remote API with pagination.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
async function fetchPosts(params) {
  const { start = 0, limit = 10 } = params || {};
  const { data: posts } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts',
    {
      params: {
        _start: start,
        _limit: limit,
      },
    }
  );

  // Fetch user details for each post
  const postsWithUsers = await Promise.all(
    posts.map(async post => {
      const { data: user } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${post.userId}`
      );

      return {
        ...post,
        user,
      };
    })
  );

  return postsWithUsers;
}

/**
 * Fetches photos from a remote API based on albumId.
 * @async
 * @param {number} albumId - The ID of the album to fetch photos for.
 * @returns {Promise<Array>} - A promise that resolves to an array of photos.
 */
async function fetchPhotos(albumId) {
  const { data: photos } = await axios.get(
    `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
  );
  return photos;
}

module.exports = { fetchPosts, fetchPhotos };
