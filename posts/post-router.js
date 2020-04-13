const express = require("express");
const posts = require("../data/db");

const router = express.Router();

module.exports = router;

router.get("/", (req, res) => {
  posts
    .find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err, "GET POSTS");
      res.status(500).json({
        message: "Error retrieving posts",
      });
    });
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Missing post title or contents",
    });
  }

  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err, "POST POSTS");
      res.status(500).json({
        message: "Error adding post",
      });
    });
});

router.get("/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "could not find post with the given id",
        });
      }
    })

    .catch((err) => {
      console.log(err, "GET POST ID");
      res.status(500).json({
        message: "could not retrieve post from database",
      });
    });
});

router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      message: "Missing title or contents",
    });
  }

  posts
    .update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "could not retrieve post with that id",
        });
      }
    })

    .catch((err) => {
      console.log(err, "PUT POST ID");
      res.status(500).json({
        message: "Error updating post",
      });
    });
});

router.delete("/:id", (req, res) => {
  posts
    .remove(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json({
          message: "post successfully deleted ",
        });
      } else {
        res.status(404).json({
          message: "Post could not be found",
        });
      }
    })
    .catch((err) => {
      console.log(err, "DELETE POST ID");
      res.status(500).json({
        message: "Error removing the post ",
      });
    });
});

router.get("/:id/comments", (req, res) => {
  posts
    .findPostComments(req.params.id)
    .then((comments) => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({
          message: "could not retrieve post with that id",
        });
      }
    })
    .catch((err) => {
      console.log(err, "GET ID COMMENTS");
    });
});

router.post("/:id/comments", (req, res) => {
  const { id: post_id } = req.params;
  const { text } = req.body;
  if (!req.body.text) {
    res.status(404).json({
      message: "missing text ",
    });
  }

  if (!req.params.id) {
    res.status(404).json({
      message: "could not find post with that id",
    });
  }
  console.log(req.body);

  posts
    .insertComment({ text, post_id })
    .then((comment) => {
      if (comment) {
        res.status(201).json(comment.text);
      } else {
        res.status(400).json({
          message: "Could not find post with that id",
        });
      }
    })
    .catch((err) => {
      console.log(err, "POST ID COMMENT");
      res.status(500).json({
        message: "Could not create comment",
      });
    });
});
