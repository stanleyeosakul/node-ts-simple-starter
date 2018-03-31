import { Router, Request, Response } from 'express';
import Post from '../models/Post';

class PostRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // ************************************
  // RESTful API - Posts
  // ************************************

  // Get All Posts
  getAllPosts(req: Request, res: Response): void {
    Post.find({})
      .then((data) => res.status(200).json({ success: true, data }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // Get Post
  getPost(req: Request, res: Response) {
    Post.findOne({ slug: req.params.slug })
      .then((data) => res.status(200).json({ success: true, data }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // Create Post
  createPost(req: Request, res: Response) {
    const title = req.body.title;
    const content = req.body.content;
    const slug = req.body.slug;
    const featuredImage = req.body.featuredImage;

    const post = new Post({ title, content, slug, featuredImage });

    post.save()
      .then((data) => res.status(200).json({ success: true, data }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // Update Post
  updatePost(req: Request, res: Response) {
    Post.findOneAndUpdate({ slug: req.params.slug }, req.body)
      .then((data) => res.status(200).json({ success: true, data }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // Delete Post
  deletePost(req: Request, res: Response) {
    Post.findOneAndRemove({ slug: req.params.slug })
      .then((data) => res.status(200).json({ success: true, data }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // ************************************
  // RESTful API Route Assignment
  // ************************************
  routes() {
    this.router.route('/')
      .get(this.getAllPosts)
      .post(this.createPost);

    this.router.route('/:slug')
      .get(this.getPost)
      .put(this.updatePost)
      .delete(this.deletePost);
  }

}

// ************************************
// Export PostRouter
// ************************************
export default new PostRouter().router;