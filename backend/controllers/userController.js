// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// controllers/userController.js

const register = async (req, res) => {
    try {
      const { username, email, password, level, storeId, orgId } = req.body;
 
      const newUser = new User({ username, email, password, level });
        if (level === 0) {
        newUser.storeId = null;
        newUser.orgId = null;
      } else {
        newUser.storeId = storeId;
        newUser.orgId = orgId;
      }
  
      await newUser.save();
  
      res.status(201).send(newUser);
    } catch (error) {
        console.log(error);
      res.status(400).send(error.message);
    }
  };
  

// controllers/userController.js

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ _id: user._id, level: user.level }, 'SANIKAMORE', { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  const createAdmin = async (req, res) => {
    try {
      const { username, email, password, storeId, orgId } = req.body;
  
      const requestingUser = req.user;
      if (!requestingUser || requestingUser.level !== 0) {
        return res.status(403).json({ error: 'Permission denied. Only superadmins can create an admin user.' });
      }
  
      // Create a new admin user
      const newAdminUser = new User({ username, email, password, level: 1, storeId, orgId, isAdmin: true });
      await newAdminUser.save();
  
      res.status(201).send(newAdminUser);
    } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  };

  const loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const adminUser = await User.findOne({ email, level: 1 });
  
      if (!adminUser) {
        return res.status(404).json({ error: 'Admin user not found' });
      }
  
      if (password !== adminUser.password) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const token = jwt.sign({ _id: adminUser._id, level: adminUser.level }, 'SANIKAMORE', { expiresIn: '1h' });
      res.cookie('authToken', token, { httpOnly: true });
  
      res.json({ adminUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // controllers/userController.js

// controllers/userController.js

const createUser = async (req, res) => {
  try {
    const { username, email, password, storeId, orgId } = req.body;

    const requestingUser = req.user;
    if (!requestingUser || requestingUser.level !== 1) {
      return res.status(403).json({ error: 'Permission denied. Only level 1 users can create a level 2 user.' });
    }

    const newUserId = requestingUser._id; // Admin's ID

    const newUser = new User({
      username,
      email,
      password,
      level: 2,
      storeId,
      orgId,
      createdBy: newUserId, // Store the admin's ID who created the user
    });

    await newUser.save();

    res.status(201).send(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, level: 2 });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ _id: user._id, level: user.level }, 'SANIKAMORE', { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  createAdmin,
  loginAdmin,
  createUser, 
  loginUser  
};
