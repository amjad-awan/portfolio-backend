import Blog from "../models/blogModal.js";

export const addBlog = async (req, res) => {
  const { title, description, photoId, comments, likes } = req.body;

  // Create a new blog instance
  const newBlog = new Blog({
    title,
    description,
    photoId,
    comments,
    likes,
  });

  try {
    // Save the blog to the database
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error saving blog post", error });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const Blogs =  await Blog.find();
    res.status(201).json({
      message: "blogs fetched",
      data: Blogs,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error });
  }
};


export const getSingleBlog = async (req, res) => {
    const {id}= req.params  
    try {
      const BlogFetched = await Blog.findOne({_id:id})

      res.status(201).json({
        message: "blog fetched",
        data: BlogFetched,
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog", error: error });
    }
  };


// Add a like to a blog post
export const addLike = async (req, res) => {
  const { blogId, userId } = req.body;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (blog.likes.includes(userId)) {
      blog.likes.pop(userId);
      return res
        .status(400)
        .json({ message: "User has already liked this post" });
    }

    blog.likes.push(userId);
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error adding like", error });
  }
};

export const addComment = async (req, res) => {
  const { blogId, username,email, comment } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    const newComment = { username,email, comment, replies: [] };
    blog.comments.push(newComment);
    await blog.save();
    const addedComment = blog.comments[blog.comments.length - 1];
    console.log("addedComment",addedComment)

    res.status(200).json({success:true, comment:addedComment, message: "Comment is added" });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

export const addReply = async (req, res) => {
  const { blogId, commentId, username, comment } = req.body;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const commentToReply = blog.comments.id(commentId);

    if (!commentToReply) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const newReply = { username, comment };
    commentToReply.replies.push(newReply);
    await blog.save();
  
    // Retrieve the last added reply
    const addedReply = commentToReply.replies[commentToReply.replies.length - 1];
    res.status(200).json({
      success:true,
      message:"Reply added",
      reply:addedReply
      
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error });
  }
};
