import jwt from 'jsonwebtoken';
import {User} from '../models/userModel.js';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Use optional chaining for cleaner code

  if (!token) return res.sendStatus(401); // Unauthorized if no token is provided

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET); // Verify token and decode it
    const user = await User.findById(decoded.id); // Find user by ID from decoded token

    if (!user) return res.sendStatus(404); // Not found if user doesn't exist

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token verification or user retrieval failed:', err);
    res.sendStatus(err.name === 'JsonWebTokenError' ? 403 : 500); // Forbidden if token is invalid, otherwise internal server error
  }
};

export default verifyToken;







//import { verify } from 'jsonwebtoken';
/*import User from '../models/userModel.js';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token,process.env.JWT_SECRET, async(err,user) => {
   

  //verify(token, 'your_secret_key', async (err, user) => {
    if (err) return res.sendStatus(403);
try{
  const findUser = await User.findById(user.id);
  if(!findUser) return res.sendStatus(404);
  req.user = findUser;
      next();
    } catch (err) {
      console.error('Unable to Retrieve User Data:', err);
      res.sendStatus(500);
}
  }); 
}; 

export default verifyToken; */


