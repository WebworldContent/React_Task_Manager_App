import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { getTasks } from '../Containers/FormStore';

export default function CheckboxList() {
  // const [checked, setChecked] = React.useState([0]);
  const [tasks, setTasks] = useState([]);

  // const handleToggle = (value) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  useEffect(() => {
    try {
      const getData = async () => {
        const taskData = await getTasks();
        setTasks((prevTask) => [...prevTask, ...taskData])
      };
      getData();
    } catch(err) {
      throw new Error(err);
    }
  }, []);

  console.log(tasks);

  return (
    
      <div style={{ width: '100%', maxWidth: 960 }}>
        <List sx={{ bgcolor: 'background.paper' }}>
          {tasks.map((task, indx) => {
            const labelId = `checkbox-list-label-${indx}`;

            return (
              <React.Fragment key={indx}>
                <ListItem key={indx} secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <span style={{ marginRight: '10px' }}><Button color="secondary" variant="contained" href="#contained-buttons">
                      Edit
                    </Button>
                    </span>
                    <span style={{ marginLeft: '10px' }}><Button color="error" variant="contained" href="#contained-buttons">
                      Delete
                    </Button></span>
                  </IconButton>
                } disablePadding style={{ display: 'flex', alignItems: 'center' }}>
                  <ListItemButton role={undefined}>
                    <ListItemIcon style={{ paddingRight: '50px'}}>
                      <Button variant="contained">{task.status}</Button>
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={task.name} />
                  </ListItemButton>
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            );
          })}
        </List>
      </div>
  );
}
