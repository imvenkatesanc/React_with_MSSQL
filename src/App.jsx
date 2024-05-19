import React, { useEffect, useState } from 'react'
import { FaTrash,FaUserTimes,FaEdit,FaPlusCircle } from 'react-icons/fa';

function App() {
  const [user,setUser] = useState([]);
  const [deleteDialog,setDeleteDialog] = useState(false);
  const [editDialog,setEditDialog] = useState(false);
  const [addDialog,setAddDialog] = useState(false);
  const [userDelete,setUserDelete] = useState(null);
  const [userEdit,setUserEdit] = useState(null);
  const [editId,setEditId] = useState(null);
  const [newUser,setNewUser] = useState({});

  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      if(!response.ok){
        throw new Error('failed to fetch data')
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userDelete}`,{
        method: 'DELETE'
      });
      if(!response.ok){
        throw new Error('Failed to delete');
      };
      setUser(user.filter(user => user.ID !== userDelete));
      setDeleteDialog(false);
      setUserDelete(null);
    } catch (error) {
      console.error(error);
    }
  }
  
  const editUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${editId}`,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userEdit)
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      fetchUsers();
      setEditDialog(false);
      editUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  const addUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });
      if (!response.ok) {
        throw new Error('Failed to add new user');
      }
      fetchUsers();
      setAddDialog(false);
      setNewUser({});
    } catch (error) {
      console.error(error);
    }
  }
  const handleDelete = (id) => {
    setDeleteDialog(true);
    setUserDelete(id);
  }
  const handleEdit = (user,uId) =>{
    setEditDialog(true);
    setUserEdit(user);
    setEditId(uId);
  }
  const handleAdd = () =>{
    setAddDialog(true);
    setNewUser({});
  }
  const closeDialog = () =>{
    setDeleteDialog(false);
    setEditDialog(false);
    setAddDialog(false);
    setUserDelete(null);
    setUserEdit(null);
    setNewUser({});
  }
  return (
    <>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>City</th>
        <th>Email</th>
        <th>Actions &nbsp; <button className='add-btn' onClick={()=>handleAdd()}>Add <FaPlusCircle /></button></th>
      </tr>
    </thead>
    <tbody>
      {user.map(user => (
        <tr key={user.ID}>
          <td>{user.ID}</td>
          <td>{user.Name}</td>
          <td>{user.City}</td>
          <td>{user.Email}</td>
          <td>
            <button className='del-btn' onClick={()=>handleDelete(user.ID)}>Delete <FaTrash/> </button> &nbsp;
            <button className='edit-btn' onClick={()=>handleEdit(user,user.ID)}>Edit <FaEdit /></button>
          </td>
        </tr>
      ))}
    </tbody>
      {deleteDialog && <div className='dialog-over'>
      <div className='dialog'>
        <FaUserTimes className='del-usr'/>
        <p>Are you sure you want to delete this user!</p>
        <button className='del' onClick={deleteUser}>Delete</button>
        <button className='no-del' onClick={closeDialog}>No</button>
      </div>
      </div>}
      {editDialog && (
        <div className='dialog-over'>
          <div className='dialog'>
            <FaEdit className='edit-usr'/>
            <p>Edit User</p>
            <input
              type='text'
              placeholder='Name'
              value={userEdit.Name}
              onChange={(e) => setUserEdit({ ...userEdit, Name: e.target.value })}
            />
            <input
              type='text'
              placeholder='City'
              value={userEdit.City}
              onChange={(e) => setUserEdit({ ...userEdit, City: e.target.value })}
            />
            <input
              type='email'
              placeholder='Email'
              value={userEdit.Email}
              onChange={(e) => setUserEdit({ ...userEdit, Email: e.target.value })}
            />
            <button className='no-del' onClick={editUser}>Save</button>
            <button className='del' onClick={closeDialog}>Cancel</button>
          </div>
        </div>
      )}
      {addDialog && (
        <div className='dialog-over'>
          <div className='dialog'>
            <FaPlusCircle className='add-usr'/>
            <p>Add New User</p>
            <input
              type='text'
              placeholder='Name'
              value={newUser.Name}
              onChange={(e) => setNewUser({ ...newUser, Name: e.target.value })}
            />
            <input
              type='text'
              placeholder='City'
              value={newUser.City}
              onChange={(e) => setNewUser({ ...newUser, City: e.target.value })}
            />
            <input
              type='email'
              placeholder='Email'
              value={newUser.Email}
              onChange={(e) => setNewUser({ ...newUser, Email: e.target.value })}
            />
            <button className='no-del' onClick={addUser}>Submit</button>
            <button className='del' onClick={closeDialog}>Cancel</button>
          </div>
        </div>
      )}

    </>
  )
}
export default App;