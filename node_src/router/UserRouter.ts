import { Router, Request, Response } from 'express';
import User from '../models/User';

class UserRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // ************************************
  // RESTful API - Users
  // ************************************

  // Get All Users
  getAllUsers(req: Request, res: Response): void {
    User.find({})
      .then((data) => res.status(200).json({ success: true, data }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // Get User
  getUser(req: Request, res: Response) {
    User.findOne({ username: req.params.username }).populate('posts')
      .then((data) => res.status(200).json({ success: true, data }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // Create User
  createUser(req: Request, res: Response) {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const posts = req.body.posts;

    const user = new User({ name, username, email, password, posts });

    user.save()
      .then((data) => res.status(200).json({ success: true, data }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // Update User
  updateUser(req: Request, res: Response) {
    User.findOneAndUpdate({ username: req.params.username }, req.body)
      .then((data) => res.status(200).json({ success: true, data }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // Delete User
  deleteUser(req: Request, res: Response) {
    User.findOneAndRemove({ username: req.params.username })
      .then((data) => res.status(200).json({ success: true, data }))
      .catch((err) => res.status(500).json({ success: false, err }));
  }

  // ************************************
  // RESTful API Route Assignment
  // ************************************
  routes() {
    this.router.route('/')
      .get(this.getAllUsers)
      .post(this.createUser);

    this.router.route('/:username')
      .get(this.getUser)
      .put(this.updateUser)
      .delete(this.deleteUser);
  }

}

// ************************************
// Export UserRouter
// ************************************
export default new UserRouter().router;