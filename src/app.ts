import express, { Application, Request, Response } from 'express';
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

export default app;
