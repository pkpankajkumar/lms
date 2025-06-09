import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../services/api'; // your axios instance with baseURL

const BookIssue = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [book, setBook] = useState([]);

  useEffect(() => {
    API.get('/api/users')
      .then((res) => setUsers(res?.data || []))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    API.get('/api/books')
      .then((res) => setBook(res?.data || []))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchBookIssues();
  }, []);

  const fetchBookIssues = () => {
    API.get('/api/book-issues')
      .then((res) => setData(res?.data || []))
      .catch((err) => console.error(err));
  };

  console.log("data",data)

  const handleEdit = (id) => {
    navigate(`/book-issue-list/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await API.delete(`/api/book-issues/${id}`);
        setData(data.filter((entry) => entry.id !== id));
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    }
  };

  // const filteredData = data.filter((book) => {
  //   const lowerSearch = searchTerm.toLowerCase();
  //   return (
  //     (book.title?.toLowerCase?.().includes(lowerSearch) ?? false) ||
  //     (book.author?.toLowerCase?.().includes(lowerSearch) ?? false) ||
  //     (typeof book.issuedTo === 'string' &&
  //       book.issuedTo.toLowerCase().includes(lowerSearch))
  //   );
  // });

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box p={4} sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Book Issue/Return
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <TextField
              label="Search by Title, Author, or Issued To"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: '60%' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/book-issue-list/issue')}
              startIcon={<AddIcon />}
            >
              Issue Book
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Book Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Issued To</TableCell>
                <TableCell>Issued From Date</TableCell>
                <TableCell>Issued To Date</TableCell>
                <TableCell>Status of Order</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      {book.find((b) => b.id === req.bookId)?.title || '-'}
                    </TableCell>
                    <TableCell>
                      {book.find((b) => b.id === req.bookId)?.author || '-'}
                    </TableCell>
                    <TableCell>
                      {users.find((u) => u.id === req.issuedTo)?.name || '-'}
                    </TableCell>
                    <TableCell>{req.fromDate || '-'}</TableCell>
                    <TableCell>{req.toDate || '-'}</TableCell>
                    <TableCell>{req.status || '-'}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(req.id)}
                        startIcon={<EditIcon />}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(req.id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default BookIssue;
