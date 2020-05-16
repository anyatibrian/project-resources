import express, { Response, NextFunction, Request } from 'express'
import morgan from 'morgan';
import bodyParser, { json } from 'body-parser'
import { PrismaClient } from '@prisma/client'
import passport from 'passport'
require('custom-env').env('dvlop')
import { userRoutes } from './resources/users/Users.routes'
import { profileRoutes } from './resources/profile/Profile.routes'
import { socialRouter } from './resources/socialAuth/socialAuth.routes'

/**
 * configuring the applications to handle
 * various response body and logging using morgan
 */
export const app = express();
export const prisma = new PrismaClient()
const API: String = '/api/v1';

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(passport.session())
/**
 * loading the index page for the application
 */
app.get(`${API}`, (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send({
    status: req.user,
    message: 'loading the index page of the application',
  });
});

app.use(`${API}/users/auth`, userRoutes)
app.use(`${API}/users/auth`, socialRouter)
app.use(`${API}/users/profile`, profileRoutes)
