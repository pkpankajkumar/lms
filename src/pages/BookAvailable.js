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
  TextField
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import API from '../services/api'; // axios instance with baseURL

const BookAvailable = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    API.get('/api/available-books') // use API instance here
      .then(res => setBooks(res?.data || []))
      .catch(err => console.error('Failed to fetch books:', err));
  }, []);

  const filteredBooks = books.filter(book => {
    const search = searchTerm.toLowerCase();
    return (
      (book.title?.toLowerCase?.().includes(search) ?? false) ||
      (book.author?.toLowerCase?.().includes(search) ?? false)
    );
  });

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box p={4} sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Book Available in List
          </Typography>

          <Box mb={2} width="60%">
            <TextField
              fullWidth
              label="Search by Book Title or Author"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Book Title</TableCell>
                <TableCell>Author</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No matching books found.
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

export default BookAvailable;
