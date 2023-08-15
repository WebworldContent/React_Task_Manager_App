import React, { useEffect, useState, useCallback } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { deleteTask, getTasks } from '../Containers/FormStore';
import { useNavigate } from 'react-router-dom';

export default function CheckboxList() {
  const [tasks, setTasks] = useState([]);
  const [dataChanged, setDataChanged] = useState(false); 
  const naviagate = useNavigate();

  const handleTaskDeletion = async (docId) => {
    if (docId) {
      await deleteTask(docId);
      setDataChanged(true);
    }
  };

  const getTaskData = useCallback(async () => {
    const taskData = await getTasks();
    setTasks(taskData);
  }, []);

  useEffect(() => {
    try {
      getTaskData();
      setDataChanged(false);
    } catch(err) {
      throw new Error(err);
    }
  }, [getTaskData, dataChanged]);

  return (
      <div style={{ width: '100%', maxWidth: 960 }}>
        <List sx={{ bgcolor: 'background.paper' }}>
          {tasks.length ?  tasks.map((task, indx) => {
            const labelId = `checkbox-list-label-${indx}`;

            return (
              <React.Fragment key={indx}>
                <ListItem key={indx} secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <span style={{ marginRight: '10px' }}><Button color="secondary" onClick={() => naviagate(`/add-task/${task.id}`)} variant="contained">
                      Edit
                    </Button>
                    </span>
                    <span style={{ marginLeft: '10px' }}><Button color="error" variant="contained" onClick={() => handleTaskDeletion(task.id)}>
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
          }) : <h2 style={{ textAlign: 'center' }}>No Task Yet!!</h2>}
        </List>
      </div>
  );
}
