const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//Create Post
router.post("/create", async (req, res) => {
	try {
		const post = new Post(req.body);
		!post && res.status(400).json("Wrong Credential");

		const savedPost = await post.save();

		res.status(200).json(savedPost);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Read Post
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		res.status(200).json(post);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Update Post
router.put("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (post.username === req.body.username) {
			try {
				const updatePost = await Post.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
					},
					{ new: true }
				);

				!updatePost && res.status(400).send("Wrong credential");
				res.status(200).json(updatePost);
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json("You can update your post only !!!");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//Delete Post
router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (post.username === req.body.username) {
			try {
				await Post.findByIdAndDelete(req.params.id);

				res.status(200).json("Post has been Deleted !!!");
			} catch (err) {
				res.status(500).json(err);
			}
		} else {
			res.status(401).json("You can delete your post only !!!");
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

//Read All Post
router.get("/", async (req, res) => {
	let posts;

	const username = req.query.user;
	const catName = req.query.cat;

	try {
		if (username) {
			posts = await Post.find({ username });
		} else if (catName) {
			posts = await Post.find({
				categories: {
					$in: [catName],
				},
			});
		}else{
      posts = await Post.find();
    }
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
