import React, { useEffect, useMemo, useState } from "react";
import List from './Components/Lists'
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TaskStatus from "./Components/TaskStatus";
import DateTime from "./Components/DateTime";
import Stack from '@mui/material/Stack';

function App() {
  const [indx, setIndx] = useState(0);
  const bgColors = useMemo(() => ['#7FFFD4', '#6495ED', '#87CEFA', '#90EE90', '#DDA0DD'], []);

  useEffect(() => {
    document.body.style.backgroundColor = bgColors[indx];
  
    const interval = setInterval(() => {
      setIndx((prev) => (prev + 1) % bgColors.length);
    }, 3000);

    return () => {
      document.body.style.backgroundColor = null;
      clearInterval(interval);
    };
  }, [indx, bgColors]);

  return (
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
                style={{width: '960px', height: '500px'}}
              />
            </Grid>
          <Grid item md={2.5} xs={4} sm={4}></Grid>
          <Grid item md={8} xs={8} sm={8}>
            <div style={{ marginTop: '40px' }}>
              <Stack
                direction={{ xs: 'column', sm: 'column', md: 'row' }}
                spacing={{ xs: 2, sm: 10, md: 55 }}
              >
                <TaskStatus />
                <DateTime />
              </Stack>
            </div>
            <div style={{ marginTop: '100px' }}>
              <List />
            </div>
          </Grid>
          <Grid item md={2.5} xs={2} sm={2}></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
