const express = require('express');
const { fetchPosts, fetchPhotos } = require('./posts.service');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { start = 0, limit = 10 } = req.query;
    const posts = await fetchPosts({ start, limit });

    // Fetch photos for each post's album
    const postsWithImages = await Promise.all(
      posts.map(async post => {
        const photos = await fetchPhotos(post.id); // Assuming albumId = post.id
        const images = photos.map(photo => ({ url: photo.url }));

        return {
          ...post,
          images,
        };
      })
    );

    res.json(postsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
