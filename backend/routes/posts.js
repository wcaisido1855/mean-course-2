const express = require('express');
const multer = require('multer');
const Post = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

// define where the multer package should put files which it detects in the incoming requests. the 'cb' variable stands for callback, which multer requires.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid File Extentsion');
    if (isValid) {
      error = null;
    }
    cb(null, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    // Callback Below actually creates the image name
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

// To Call the File Upload function and validation above, just add this to router.post as an expected argument: "multer(storage).single('image')"
router.post(
  '',
  multer({ storage: storage }).single('image'),
  (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });
    post.save().then((createdPost) => {
      res.status(201).json({
        message: 'Post added successfully',
        postId: createdPost._id
      });
    });
  }
);

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json({ message: 'Update successful!' });
  });
});

/*Success message after successfully GET ing data*/
router.get('', (req, res, next) => {
  Post.find().then((documents) => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: documents
    });
  });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found!' });
    }
  });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: 'Post deleted!' });
  });
});

module.exports = router;
