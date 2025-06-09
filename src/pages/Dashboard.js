import {React,useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import CardGenerator from './CardGenerator'
import axios from 'axios';
import API from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

   const [data, setData] = useState([]);
  const [issuedCount, setIssuedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
   const [books, setBooks] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await API.get('api/book-issues');
      let fetchedData = res?.data || [];

      if (user?.role !== 'admin') {
        fetchedData = fetchedData.filter((item) => item.issuedTo === user.id);
      }

      setData(fetchedData);

      const issued = fetchedData.filter((item) => item.status === 'Issued').length;
      const rejected = fetchedData.filter((item) => item.status === 'Rejected').length;
      const request = fetchedData.filter((item) => item.status === 'Request').length;
     

      setIssuedCount(issued);
      setRejectedCount(rejected);
      setRequestCount(request);
      
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  API.get('/api/available-books') // use API instance here
    .then(res => {
      setBooks(res?.data || []);
      setAvailableCount(res?.data.length || 0);
    })
    .catch(err => console.error('Failed to fetch books:', err));
}, []);



  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box p={4} sx={{ flexGrow: 1 }}>
         
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CardGenerator
                  key={1}
                  text={`Total Book Issued(${issuedCount})`}
                  img
                  url="/book-request-list"
                  imgUrl="svg/cardArrow.svg"
                  borderColor="#016944"
                  textColor="#282828"
                  iconColor="#A3DBC7"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CardGenerator
                  key={2}
                  text={`Total Book Available(${availableCount})`}
                  img
                  url="/book-available-list"
                  imgUrl="svg/cardArrow.svg"
                  borderColor="#016944"
                  textColor="#282828"
                  iconColor="#A3DBC7"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CardGenerator
                  key={2}
                  text={`Total Request Order Book for issue(${requestCount})`}
                  img
                  url="/book-request-list"
                  imgUrl="svg/cardArrow.svg"
                  borderColor="#016944"
                  textColor="#282828"
                  iconColor="#A3DBC7"
                />
              </Grid>

                <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CardGenerator
                  key={2}
                  text={`Total Request Reject Count(${rejectedCount})`}
                  img
                  url="/book-request-list"
                  imgUrl="svg/cardArrow.svg"
                  borderColor="#016944"
                  textColor="#282828"
                  iconColor="#A3DBC7"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;