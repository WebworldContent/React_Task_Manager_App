import React, { Fragment, useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TaskStatus from "./TaskStatus";
import TaskCategory from './TaskCategory';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import List from './Lists';
import { useNavigate } from "react-router-dom";
import { MenuHeader } from "./Header";
import { getAuth } from "firebase/auth";

export const Home = () => {
  const [searchedStatus, setSearchedStatus] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();
  const getTaskStatus = (data) => {
    setSearchedStatus(data);
  };

  const getTaskCategory = (data) => setTaskCategory(data);

    return (
    <Fragment>
      <MenuHeader auth={auth} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                  <TaskCategory taskCategory={getTaskCategory} />
                </Stack>
              </div>
              <div style={{ marginTop: '100px' }}>
                <List searchedStatus={searchedStatus} taskCategory={taskCategory} auth={auth} />
              </div>
            </Grid>
            <Grid item md={2.5} xs={2} sm={2}></Grid>
          </Grid>
        </Box>
      </div>
    </Fragment>
  )
}

