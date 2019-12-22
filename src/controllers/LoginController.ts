import { Request, Response, NextFunction } from 'express';
import { get, controller, bodyValidator, post } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form action="" method="POST">
      <div>
        <label for="email">Email</label>
        <input type="email" name="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" name="password" />
      </div>
      <button type="submit">Login</button>
    </form>`);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === 'a@a.com' && password === '1') {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  logout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
