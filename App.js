import React, { useState } from 'react';

import './App.css';


function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [viewIndex, setViewIndex] = useState(-1);
  

  const addUser = () => {
    if (name && age) {
      setUsers([...users, { name, age }]);
      setName('');
      setAge('');
    }
  };

  const deleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const editUser = (index) => {
    setName(users[index].name);
    setAge(users[index].age);
    setEditIndex(index);
  };

  const saveEdit = () => {
    if (name && age && editIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = { name, age };
      setUsers(updatedUsers);
      setName('');
      setAge('');
      setEditIndex(-1);
    }
  };

  const viewUser = (index) => {
    setViewIndex(index);
  };

  const closeView = () => {
    setViewIndex(-1);
  };
  const closeEdit = () => {
    setEditIndex(-1);
  };

 
  
  const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 6; // Number of users to display per page

// Calculate the index range for the current page
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

// Function to change the current page
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};
const getColor = (age) => {
  if (age <= 25) return 'green';
  if (age <= 50) return 'purple';
  return 'orange';
};

  const userCards = currentUsers.map((user, index) => (
    <div className="user-card" key={index}>
      <div className={`age-circle ${getColor(user.age)}`}></div>
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>Age: {user.age}</p>
      </div>
      <div className="user-actions">
      <button
        onClick={() => deleteUser(index)}
        className="delete-button" // Apply the delete-button class
      >
        Delete
      </button>
      <button onClick={() => editUser(index)} className="blue-button">
        Edit
      </button>
      <button onClick={() => viewUser(index)} className="blue-button">
        View
      </button>
      </div>
    </div>
  ));

  // const getColor = (age) => {
  //   if (age <= 25) return 'green';
  //   if (age <= 50) return 'purple';
  //   return 'orange';
  // };
  
  const pageNumbers = [];
for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
  pageNumbers.push(i);
}


  return (
    <div className="App">
       <div className="header-container">
      <h1>List Of Users</h1>
     
      <div className="form">
      {/* <button onClick={addUser}>Add User</button> */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {/* {editIndex === -1 ? ( */}
          <button onClick={addUser}>Add User</button>
          </div>
       {/* <button onClick={saveEdit}>Save Edit</button> */}
       
      {/* } */}
      
      </div>
      <div className="user-list">{userCards}</div>
      <div className="pagination">
  {pageNumbers.map((number) => (
    <button key={number} onClick={() => paginate(number)}>
      {number}
    </button>
  ))}
</div>
{editIndex !== -1 && (
   <div className="user-view">
   <div className="user-view-content">
  
  
   <button onClick={closeEdit} className="close-button">
              Close
            </button>    
          <h2>User Details</h2>
            <p>Name: {users[editIndex].name}</p>
            <p>Age: {users[editIndex].age}</p>
            <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
            <button onClick={saveEdit}>Submit</button>
          </div>
        </div>
        )}
      {viewIndex !== -1 && (
        <div className="user-view">
          <div className="user-view-content">
            <button onClick={closeView} className="close-button">
              Close
            </button>
            <h2>User Details</h2>
            <p>Name: {users[viewIndex].name}</p>
            <p>Age: {users[viewIndex].age}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
