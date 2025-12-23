const { v4: uuidv4 } = require('uuid');

// Initial dummy users
const users = [
  {
    id: uuidv4(),
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    age: 28,
    birthPlace: 'New York',
    country: 'USA',
    hobbyList: ['Reading', 'Hiking']
  },
  {
    id: uuidv4(),
    firstName: 'Jane',
    lastName: 'Smith',
    gender: 'Female',
    age: 32,
    birthPlace: 'London',
    country: 'UK',
    hobbyList: ['Painting', 'Yoga', 'Traveling']
  }
];

module.exports = { users };
