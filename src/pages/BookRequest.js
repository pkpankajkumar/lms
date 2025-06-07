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
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const BookRequest = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const user = JSON.parse(localStorage.getItem('user')); // <-- Parse stored user JSON

  useEffect(() => {
    axios
      .get('http://localhost:5000/bookIssue')
      .then((res) => setData(res?.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (id) => {
    navigate(`/book-request-list/edit/${id}`);
  };

 const filteredData = data
  .filter((book) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      (book.title?.toLowerCase?.().includes(lowerSearch) ?? false) ||
      (book.author?.toLowerCase?.().includes(lowerSearch) ?? false) ||
      (typeof book.issuedTo === 'string' &&
        book.issuedTo.toLowerCase().includes(lowerSearch))
    );
  })
  .filter((book) => {
    const issuedToStr = String(book.issuedTo).trim().toLowerCase();
    const userNameStr = String(user?.name || '').trim().toLowerCase();
    const userIdStr = String(user?.id || '').trim().toLowerCase();

    return issuedToStr === userNameStr || issuedToStr === userIdStr;
  });


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
                <TableCell>Author</TableCell>
                <TableCell>Issued To</TableCell>
                <TableCell>Issued From Date</TableCell>
                <TableCell>Issued To Date</TableCell>
                <TableCell>Status of Order</TableCell>
                {/* <TableCell>Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.issuedTo || '-'}</TableCell>
                    <TableCell>{book.fromDate || '-'}</TableCell>
                    <TableCell>{book.toDate || '-'}</TableCell>
                    <TableCell>{book.status || '-'}</TableCell>

                    {/* <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(book.id)}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </TableCell> */}
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
