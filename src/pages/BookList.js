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

const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/books')
      .then((res) => setBooks(res?.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (id) => {
    navigate(`/books/edit/${id}`);
  };

  const filteredBooks = books.filter((book) => {
    const lowerSearch = searchTerm.toLowerCase();

    return (
      (book.title?.toLowerCase?.().includes(lowerSearch) ?? false) ||
      (book.author?.toLowerCase?.().includes(lowerSearch) ?? false) ||
      (typeof book.issuedTo === 'string' && book.issuedTo.toLowerCase().includes(lowerSearch))
    );
  });

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box p={4} sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Book List
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <TextField
              label="Search by Title, Author"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: '60%' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/books/add')}
              startIcon={<AddIcon />}
            >
              Add Book
            </Button>
          </Box>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(book.id)}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No matching records found.
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

export default BookList;
