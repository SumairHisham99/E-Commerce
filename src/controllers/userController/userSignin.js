const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage');
const { userAuthn } = require('../../middleware/authentication');
const { UserModel } = require('../../models/index');

const router = express.Router();

// User Login  route
router.post('/user/login', async (req, res) => {
    try {
        // Check for token in local storage
        if (localStorage.getItem('userToken')) {
            return res.status(401).json({ error: 'User already logged in' });
        };
        
        const { email, password } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ user_id: user.id }, 'User-Authn', { expiresIn: '1h' });

        // Set the token in the headers
        res.setHeader('Authorization', `Bearer ${token}`);

        // Set the token in the localstorage
        localStorage.setItem('userToken', `Bearer ${token}`);

        // Send the token in the response
        res.json({ token });

    } catch (error) {
        
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  });
  
  // User Logout  route
  router.post('/user/logout', userAuthn, async (req, res) => {
    try {

        // Check for token in local storage
        if (!localStorage.getItem('userToken')) {
            return res.status(401).json({ error: 'User already logged Out!' });
        };

        const token = '';

        // Remove the token in the headers
        res.setHeader('Authorization', `Bearer ${token}`);
        // Remove the token in the localstorage
        localStorage.removeItem(`userToken`);

        console.log("LoggedOut!")

    } catch (error) {
        
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  });
  
  module.exports = router;