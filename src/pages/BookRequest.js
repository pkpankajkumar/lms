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
import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import API from '../services/api'; // axios instance with baseURL

const BookRequest = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [book, setBook] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch all users
  useEffect(() => {
    API.get('/api/users')
      .then((res) => setUsers(res?.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch all books
  useEffect(() => {
    API.get('/api/books')
      .then((res) => setBook(res?.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch all book issues
  useEffect(() => {
    API.get('/api/book-issues')
      .then((res) => setData(res?.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (id) => {
    navigate(`/book-request-list/edit/${id}`);
  };

  // const filteredData = data
  //   .filter((book) => {
  //     const lowerSearch = searchTerm.toLowerCase();
  //     return (
  //       (book.title?.toLowerCase?.().includes(lowerSearch) ?? false) ||
  //       (book.author?.toLowerCase?.().includes(lowerSearch) ?? false) ||
  //       (typeof book.issuedTo === 'string' &&
  //         book.issuedTo.toLowerCase().includes(lowerSearch))
  //     );
  //   })
  //   .filter((book) => {
  //     if (user?.role === 'admin') return true;

  //     const issuedToStr = String(book.issuedTo).trim().toLowerCase();
  //     const userNameStr = String(user?.name || '').trim().toLowerCase();
  //     const userIdStr = String(user?.id || '').trim().toLowerCase();

  //     return issuedToStr === userNameStr || issuedToStr === userIdStr;
  //   });

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box p={4} sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Book Request/Order
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
              onClick={() => navigate('/book-request-list/request')}
              startIcon={<AddIcon />}
            >
              Add Request
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Book Title</TableCell>
                <TableCell>Issued To</TableCell>
                <TableCell>Issued From Date</TableCell>
                <TableCell>Issued To Date</TableCell>
                <TableCell>Status of Order</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>{book.find((b) => b.id == req.bookId)?.title || '-'}</TableCell>
                    <TableCell>{users.find((u) => u.id == req.issuedTo)?.name || '-'}</TableCell>
                    <TableCell>{req.fromDate || '-'}</TableCell>
                    <TableCell>{req.toDate || '-'}</TableCell>
                    <TableCell>{req.status || '-'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
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

export default BookRequest;
