import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { UserRouter } from './app/modules/user/user.routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// using routes from user module
app.use('/api/users', UserRouter);




app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Global Error Handling Middleware
app.use((err:any, req: Request, res : Response) => {
  // Sending JSON response with error details
  console.log({err, j: 1});
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: err
  });
});

export default app;
