import React, { useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TaskStatus from "./TaskStatus";
import DateTime from "./DateTime";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import List from './Lists';
import { useNavigate } from "react-router-dom";


export const Home = () => {
  const [searchedStatus, setSearchedStatus] = useState('');
  const navigate = useNavigate();
  const getTaskStatus = (data) => {
    setSearchedStatus(data);
  };

    return (<div style={{ display: 'flex', justifyContent: 'center' }}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item md={2.5} xs={2} sm={2}></Grid>
          <Grid item md={8} xs={8} sm={8}>
            <img
              src={`https://wallpaperaccess.com/full/1489353.jpg`}
              srcSet={`https://wallpaperaccess.com/full/1489353.jpg`}
              alt={'task list img'}
              loading="lazy"
              style={{width: '955px', height: '500px'}}
            />
          </Grid>
        <Grid item md={2.5} xs={4} sm={4}></Grid>
        <Grid item md={8} xs={8} sm={8}>
          <div style={{ marginTop: '40px' }}>
            <Stack
              direction={{ xs: 'column', sm: 'column', md: 'row' }}
              spacing={{ xs: 2, sm: 10, md: 23 }}
            >
              <TaskStatus taskStatus={getTaskStatus} />
              <Button variant="contained" onClick={() => navigate('add-task')}>Add Tasks</Button>
              <DateTime />
            </Stack>
          </div>
          <div style={{ marginTop: '100px' }}>
            <List searchedStatus={searchedStatus} />
          </div>
        </Grid>
        <Grid item md={2.5} xs={2} sm={2}></Grid>
      </Grid>
    </Box>
  </div>)
}

