
import express from 'express';
import { signup_get, signup_post, login_get, login_post } from '../controller/userController.js';

const router = express.Router();

// Authentication routes
router.get('/signup', signup_get); // Route to serve the signup page or form
router.post('/signup', signup_post); // Route to handle signup form submission

// router.get('/login', login_get); // Route to serve the login page or form
router.post('/login', login_post); // Route to handle login form submission

export default router;
