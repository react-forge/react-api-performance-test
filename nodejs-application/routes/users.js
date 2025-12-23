const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { users } = require('../data/users');

// GET /api/users - Get all users with optional limit
router.get('/', (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    
    if (limit && (isNaN(limit) || limit < 1)) {
      return res.status(400).json({ error: 'Invalid limit parameter' });
    }

    const result = limit ? users.slice(0, limit) : users;
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  try {
    const user = users.find(u => u.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/users - Create new user
router.post('/', (req, res) => {
  try {
    const { firstName, lastName, gender, age, birthPlace, country, hobbyList } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !gender || !age || !birthPlace || !country) {
      return res.status(400).json({ 
        error: 'Missing required fields: firstName, lastName, gender, age, birthPlace, country' 
      });
    }

    // Validate gender
    if (!['Male', 'Female', 'Other'].includes(gender)) {
      return res.status(400).json({ 
        error: 'Invalid gender. Must be Male, Female, or Other' 
      });
    }

    // Validate age
    if (typeof age !== 'number' || age < 0) {
      return res.status(400).json({ error: 'Age must be a positive number' });
    }

    const newUser = {
      id: uuidv4(),
      firstName,
      lastName,
      gender,
      age,
      birthPlace,
      country,
      hobbyList: hobbyList || []
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/users/:id - Update entire user
router.put('/:id', (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { firstName, lastName, gender, age, birthPlace, country, hobbyList } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !gender || !age || !birthPlace || !country) {
      return res.status(400).json({ 
        error: 'Missing required fields: firstName, lastName, gender, age, birthPlace, country' 
      });
    }

    // Validate gender
    if (!['Male', 'Female', 'Other'].includes(gender)) {
      return res.status(400).json({ 
        error: 'Invalid gender. Must be Male, Female, or Other' 
      });
    }

    // Validate age
    if (typeof age !== 'number' || age < 0) {
      return res.status(400).json({ error: 'Age must be a positive number' });
    }

    users[userIndex] = {
      id: req.params.id,
      firstName,
      lastName,
      gender,
      age,
      birthPlace,
      country,
      hobbyList: hobbyList || []
    };
    
    res.json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/users/:id - Partial update user
router.patch('/:id', (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { firstName, lastName, gender, age, birthPlace, country, hobbyList } = req.body;
    
    // Validate gender if provided
    if (gender && !['Male', 'Female', 'Other'].includes(gender)) {
      return res.status(400).json({ 
        error: 'Invalid gender. Must be Male, Female, or Other' 
      });
    }

    // Validate age if provided
    if (age !== undefined && (typeof age !== 'number' || age < 0)) {
      return res.status(400).json({ error: 'Age must be a positive number' });
    }

    // Update only provided fields
    if (firstName !== undefined) users[userIndex].firstName = firstName;
    if (lastName !== undefined) users[userIndex].lastName = lastName;
    if (gender !== undefined) users[userIndex].gender = gender;
    if (age !== undefined) users[userIndex].age = age;
    if (birthPlace !== undefined) users[userIndex].birthPlace = birthPlace;
    if (country !== undefined) users[userIndex].country = country;
    if (hobbyList !== undefined) users[userIndex].hobbyList = hobbyList;
    
    res.json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
