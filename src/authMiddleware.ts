// src/authMiddleware.ts
import jwt from 'jsonwebtoken';

export function authenticateToken(req: { headers: { [x: string]: any; }; user: any; }, res: { sendStatus: (arg0: number) => any; }, next: () => void) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your-secret-key', (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
