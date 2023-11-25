import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { UserRouter } from './app/modules/user/user.routes';
import { z } from 'zod';
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
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Handling the Zod error with a professional error message
  if (err instanceof z.ZodError) {
    res.status(400).json({
      success: false,
      message: `${
        err?.issues[0]?.message !== 'Required'
          ? `${err?.issues[0]?.code} : ${err?.issues[0]?.message}`
          : 'field is required! Please provide required data.'
      }`,
      error: err?.issues,
    });
  } else {
    // Sending JSON response with error details
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
});

export default app;
