import React, { useEffect, useState, useCallback, Fragment } from 'react';
import {Card, CardActions, CardContent, Button, Typography} from '@mui/material';
import { deleteTask, getTaskStatus, getTasks, getTaskCategory } from '../Containers/FormStore';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";

export default function CardElement({searchedStatus, taskCategory: searchedCategory, auth}) {
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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const taskData = await getTasks(uid);
        setTasks(taskData);
      }
    });
    
  }, [auth]);

  const getTasksStatusWise = useCallback(async () => {
    const taskData = await getTaskStatus(searchedStatus);
    setTasks(taskData);
  }, [searchedStatus]);

  const getTasksCategoryWise = useCallback(async () => {
    const taskData = await getTaskCategory(searchedCategory);
    setTasks(taskData);
  }, [searchedCategory]);

  useEffect(() => {
    try {
      if (searchedStatus) {
        getTasksStatusWise();
      } else if (searchedCategory) {
        getTasksCategoryWise()
      } else {
        getTaskData();
      }
      setDataChanged(false);
    } catch(err) {
      throw new Error(err);
    }
  }, [getTaskData, dataChanged, getTasksStatusWise, searchedStatus, getTasksCategoryWise, searchedCategory]);


  return (
      <Fragment>
        {tasks.length ? tasks.map((task, indx) => {
        return (<Card sx={{ minWidth: 275, margin: 1 }} key={indx}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                <Button color="info">{task.status}</Button>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {task.name}
                </Typography>
                <Typography variant="body2">
                <Button color="success">
                  {task.category}
                </Button>
                </Typography>
            </CardContent>
            <CardActions>
              <span style={{ marginLeft: '0px' }}>
                <Button color="secondary" onClick={() => naviagate(`/add-task/${task.id}`)} variant="contained">
                  Edit
                </Button>
              </span>
              <span style={{ marginLeft: '110px' }}>
                <Button color="error" variant="contained" onClick={() => handleTaskDeletion(task.id)}>
                  Delete
                </Button>
              </span>
            </CardActions>
        </Card>)
        }) : <h2 style={{ textAlign: 'center' }}>No Task Yet!!</h2>}
    </Fragment>
  );
}