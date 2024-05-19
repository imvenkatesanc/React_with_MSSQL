const { sql, poolPromise } = require('../config/db');

// async function createTable() {
//     try {
//     const pool = await poolPromise;
//     const query = `
//         CREATE TABLE demoUser (
//         ID INT IDENTITY(1,1) PRIMARY KEY,
//         Name NVARCHAR(100) NOT NULL,
//         City NVARCHAR(100),
//         Email NVARCHAR(100) NOT NULL
//         );
//     `;
//     await pool.request().query(query);
//     console.log('Table "Users" created successfully');
//     } catch (err) {
//     console.error('Error creating table:', err.message);
//     }
// }

// createTable();

// Get all users
async function getUsers() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT ID, Name, City, Email FROM demoUser');
    return result.recordset;
  } catch (err) {
    throw new Error(err);
  }
}

// Get a user by ID
async function getUserById(userId) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ID', sql.Int, userId)
      .query('SELECT ID, Name, City, Email FROM demoUser WHERE ID = @ID');
    return result.recordset[0];
  } catch (err) {
    throw new Error(err);
  }
}

// Create a new user
async function createUser(user) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Name', sql.NVarChar, user.Name)
      .input('City', sql.NVarChar, user.City)
      .input('Email', sql.NVarChar, user.Email)
      .query('INSERT INTO demoUser (Name, City, Email) VALUES (@Name, @City, @Email); SELECT SCOPE_IDENTITY() AS ID');
    return result.recordset[0].ID;
  } catch (err) {
    throw new Error(err);
  }
}

// Update a user
async function updateUser(user) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ID', sql.Int, user.ID)
      .input('Name', sql.NVarChar, user.Name)
      .input('City', sql.NVarChar, user.City)
      .input('Email', sql.NVarChar, user.Email)
      .query('UPDATE demoUser SET Name = @Name, City = @City, Email = @Email WHERE ID = @ID');
    return result.rowsAffected[0];
  } catch (err) {
    throw new Error(err);
  }
}

// Delete a user
async function deleteUser(userId) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('ID', sql.Int, userId)
      .query('DELETE FROM demoUser WHERE ID = @ID');
    return result.rowsAffected[0];
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
