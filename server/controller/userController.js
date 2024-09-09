import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import bcrypt from 'bcrypt';

const handleErrors = (err) => {
  console.log(err);
  let errors = { message: err.message, code: err.code };

  return errors;
};

const maxAge = 3 * 24 * 60 * 60; // Token expiration time

// Use the secret from your .env file
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

export const signup_get = (req, res) => {
  res.render('signup');
};

export const login_get = (req, res) => {
  res.render('login');
};

export const signup_post = async (req, res) => {
  const { NationalId, firstName, lastName, email, password } = req.body;
  try {
    // Check for both national ID and email duplication
    const existingNationalId = await User.findOne({ NationalId });
    const existingUser = await User.findOne({ email });

    if (existingNationalId || existingUser) {
      // Determine which error message to use
      let errorMessage = '';
      if (existingNationalId) {
        errorMessage = 'This national ID already exists';
      } else if (existingUser) {
        errorMessage = 'This email already exists';
      }
      throw Error(errorMessage);
    }

    // Create new user if no duplication is found
    const user = await User.create({ NationalId, firstName, lastName, email, password });
    const token = createToken(user._id);
    res.status(201).json({ token, user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw Error('incorrect email');
    
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) throw Error('incorrect password');

    const token = createToken(user._id);
    res.json({
      token,
      user: user._id,
      email
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const delete_user = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
};

export const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); // Clear cookie
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch users' });
  }
};
