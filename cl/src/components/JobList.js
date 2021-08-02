/* eslint-disable react-hooks/exhaustive-deps */
import '../App.css';
import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const JobList = () => {
  const classes = useStyles();
  const API_SERVER = process.env.REACT_APP_API_SERVER

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
    },
  });

  const [jobList, setjobList] = useState(
     [{uid: 'cargando',
     created_by: 'cargando',
     state: 'cargando'}] 
    )

  useEffect(() => {
    const getJobs = async () => {
      const jobsFromServer = await fetchJobs()
      setjobList(jobsFromServer)
    }
    getJobs()
  },[])

  const fetchJobs = async () => {
    const res = await fetch(API_SERVER+'/jobs_processed/')
    const data = await res.json()
    console.log(data)
    return data
  }
  return(
    <ThemeProvider theme={darkTheme}>
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Unique ID</TableCell>
          <TableCell>Created By</TableCell>
          <TableCell>State</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {jobList && jobList.map(item => (
          <TableRow key={item.uid}>
          <TableCell>{item.uid}</TableCell>
          <TableCell>{item.created_by}</TableCell>
          <TableCell>{item.state}</TableCell>
        </TableRow>
        ))}
      </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
  );
}

export default JobList;
