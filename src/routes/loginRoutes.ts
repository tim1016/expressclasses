import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  } else {
    res.status(403).send('Not permitted');
  }
}

const router = Router();

// router.get('/login', (req: Request, res: Response) => {
//   res.send(`
//   <form action="" method="POST">
//     <div>
//       <label for="email">Email</label>
//       <input type="email" name="email" />
//     </div>
//     <div>
//       <label for="password">Password</label>
//       <input type="password" name="password" />
//     </div>
//     <button type="submit">Login</button>
//   </form>`);
// });

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (email && password && email === 'a@a.com' && password === '1') {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

router.get(
  '/protected',
  requireAuth,
  (req: Request, res: Response, next: NextFunction) => {
    res.send('Welcome to protected route, logged In User');
  }
);

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
    <div>
      <div>You are now logged  in</div>
      <a href="/logout">Log Out</a>
    </div>
    `);
  } else {
    res.send(`
    <div>
      <div>You are not logged in</div>
      <a href="/auth/login">Login</a>
    </div>
    `);
  }
});

export { router };
