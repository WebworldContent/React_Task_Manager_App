import React, { Fragment, useState } from "react";
import TaskStatus from "./TaskStatus";
import TaskCategory from './TaskCategory';
import {Stack, Button, Box, Grid} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { MenuHeader } from "./Header";
import { getAuth } from "firebase/auth";
import CardElement from "./Card";

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
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item md={8} xs={10} sm={10}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <CardElement searchedStatus={searchedStatus} taskCategory={taskCategory} auth={auth}/>
                </div>
              </Grid>
              <Grid item md={8} xs={10} sm={10}>
                <div style={{ marginTop: '40px' }}>
                  <Stack
                    direction={{ xs: 'column', sm: 'column', md: 'row' }}
                    spacing={{ xs: 2, sm: 10, md: 45 }}
                  >
                    <TaskStatus taskStatus={getTaskStatus} />
                    <Button variant="contained" onClick={() => navigate('add-task')}>Add Tasks</Button>
                    <TaskCategory taskCategory={getTaskCategory} />
                  </Stack>
                </div>
              </Grid>
          </Grid>
        </Box>
      </div>
    </Fragment>
  )
}

