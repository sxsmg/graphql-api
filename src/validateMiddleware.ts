// src/validationMiddleware.ts
import { ValidationError, validationResult } from 'express-validator';
import { Request } from 'express-validator/src/base';

export function validateInputs(req: Request, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors: ValidationError[]; }): any; new(): any; }; }; }, next: () => void) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
}
