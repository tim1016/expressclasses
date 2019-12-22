import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';

import './controllers/LoginController';
import './controllers/RootController';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['asjdhgf'] }));
app.use(AppRouter.getInstance());

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
