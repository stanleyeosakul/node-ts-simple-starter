// *************************************************
// INITIALIZATION
// *************************************************
// Require dependencies
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import * as cors from 'cors';
import { Application, json, urlencoded, Request, Response, NextFunction } from 'express';
import { Database } from './config/db';

// Import routers
import PostRouter from './router/PostRouter';
import UserRouter from './router/UserRouter';

// *************************************************
// CORE APPLICATION LOGIC
// *************************************************
class App {

  app: Application;
  private db: Database = new Database();

  constructor() { 
    this.app = express();
    this.config();
    this.routes();
  }

  // *************************************************
  // APP CONFIGURATION
  // *************************************************
  config() {

    // Disable etag and x-powered-by
    this.app.disable('etag').disable('x-powered-by');

    // MongoDB Setup using Mongoose
    this.db.connectDatabase();

    // Middleware
    this.app.use(json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(logger('dev'));
    this.app.use(cors());

  }

  // *************************************************
  // APP ROUTES
  // *************************************************
  routes() {
    
    // API Routes
    this.app.use('/api/posts', PostRouter);
    this.app.use('/api/users', UserRouter);

    // Home Route
    this.app.get('/', (req, res) => res.send('hello'));

    // API Route Error Handler
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json({ success: false, status: 404, message: 'Page Not Found' });
    });
    this.app.use((err, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500).json({ success: false, status: err.status, message: `Server Error: ${err.message}` });
    });
  }

}

export default new App();