import express, { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
import { IUser } from '../types/user.type';

const SECRET_KEY = process.env.SECRET_KEY as string;



const verifyToken = (req: express.Request, res: express.Response, next: NextFunction) => {

  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
      return res.sendStatus(401)
    }

    jwt.verify(token, SECRET_KEY, { algorithms: ['RS256'] }, (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(403).send(err);
      }
      req.body.user = decoded;
      next();
    })
  } catch (error) {
    res.status(500).end(error);
  }

}

const signIn = async (req: express.Request, res: express.Response, next: NextFunction) => {
  console.log('==> auth.service authentication');
  console.log('==> req.body', req.body);
  if (!req.body.email) {
    return res.status(400).send('Please provide an email.')
  }
  if (!req.body.password) {
    return res.status(400).send('Please provide a password.')
  }
  const { email, password } = req.body;

  try {
    const dbUser: IUser | null = await userModel.findOne({ email: req.body.email });
    if (dbUser === null) {
      return res.status(403).send('User not found with provided email.');
    }
    if (dbUser.email === email && dbUser.password === password) {

      const accessToken = jwt.sign({ email: dbUser.email }, SECRET_KEY);
      return res.status(200).send(accessToken);

    }
  } catch (error) {
    res.status(500).send(error);
  }
}

const signUp = async (req: express.Request, res: express.Response, next: NextFunction) => {
  return res.status(501).send('This functionality is under development');

}

const authenticationWithGoogle = (req: express.Request, res: express.Response, next: NextFunction) => {

  console.log('==> auth.service authenticationWithGoogle');
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.sendStatus(401)
  }

  try {
    const decoded: any = jwt.decode(token as string, { complete: true });
    if (decoded) {
      const { name, email, picture, email_verified, ...others } = decoded.payload
      req.body.user = { name, email, picture, email_verified };
      return res.status(200).send('success');
    }
  } catch (error) {
    res.status(500).end(error);
  }
  // next();

}
// const authorization = (req: express.Request, res: express.Response, next: NextFunction) => {
//   console.log('==> auth.service authorization');

//   // const verifyOptions: any = {
//   //   issuer: '',
//   //   subject: '',
//   //   audience: '',
//   //   expiresIn: "30d",
//   //   algorithm: ["RS256"]
//   // };
//   // const authHeader = req.headers['authorization']
//   // const token = authHeader && authHeader.split(' ')[1]

//   // if (token == null) {
//   //   return res.sendStatus(401)
//   // } 

//   //   try {
//   //     console.log('==> SECRET_KEY', SECRET_KEY);
//   //     const data = jwt.verify(token, SECRET_KEY, { algorithms: ['RS256'] }, (err: any, decoded: any) => {
//   //       console.log('==> Token decoded', decoded)
//   //       if(err) {
//   //         throw Error('JWT Token Verification error' +err)
//   //       } else {
//   //         console.log('==> Token decoded', decoded)
//   //       }
//   //     })
//   //     const decodedUser = jwt.decode(token, {complete: true});

//   //   } catch (error) {
//   //     console.log('==> catch', error)
//   //   }
//   next();

// }


export { signIn, verifyToken, signUp, authenticationWithGoogle }