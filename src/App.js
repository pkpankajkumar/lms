import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';
import Student from './pages/Student';
import StudentForm from './pages/studentForm';

import BookIssue from './pages/BookIssue';
import BookIssueForm from './pages/BookIssueForm';
import BookAvailable from './pages/BookAvailable';
import BookRequest from './pages/BookRequest';
import BookRequestForm from './pages/BookRequestForm';


const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        <Route path="/books" element={<PrivateRoute><BookList /></PrivateRoute>} />
        <Route path="/books/add" element={<PrivateRoute><BookForm /></PrivateRoute>} />
        <Route path="/books/edit/:id" element={<PrivateRoute><BookForm /></PrivateRoute>} />

        <Route path="/student" element={<PrivateRoute><Student /></PrivateRoute>} />
        <Route path="/student/add" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
        <Route path="/student/edit/:id" element={<PrivateRoute><StudentForm /></PrivateRoute>} />

        <Route path="/book-issue-list" element={<PrivateRoute><BookIssue /></PrivateRoute>} />
        <Route path="/book-issue-list/issue" element={<PrivateRoute><BookIssueForm /></PrivateRoute>} />
        <Route path="/book-issue-list/edit/:id" element={<PrivateRoute><BookIssueForm /></PrivateRoute>} />
       
        <Route path="/book-available-list" element={<PrivateRoute><BookAvailable /></PrivateRoute>} />
       
        <Route path="/book-request-list" element={<PrivateRoute><BookRequest/></PrivateRoute>} />
        <Route path="/book-request-list/request" element={<PrivateRoute><BookRequestForm /></PrivateRoute>} />
        <Route path="/book-request-list/edit/:id" element={<PrivateRoute><BookRequestForm /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;