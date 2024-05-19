const userModel = require('../model/userModel');

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Get a user by ID
async function getUser(req, res) {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Create a new user
async function createUser(req, res) {
  try {
    const userId = await userModel.createUser(req.body);
    res.status(201).json({ id: userId });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Update a user
async function updateUser(req, res) {
  try {
    const rowsAffected = await userModel.updateUser(req.body);
    if (rowsAffected > 0) {
      res.send('User updated successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Delete a user
async function deleteUser(req, res) {
  try {
    const rowsAffected = await userModel.deleteUser(req.params.id);
    if (rowsAffected > 0) {
      res.send('User deleted successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
