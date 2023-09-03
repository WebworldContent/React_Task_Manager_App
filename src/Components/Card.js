import React, { useEffect, useState, useCallback } from 'react';
import { getTaskStatus, getTasks, getTaskCategory } from '../Containers/FormStore';
import { onAuthStateChanged } from "firebase/auth";
import { DragDropContext } from "react-beautiful-dnd";
import { Grid } from '@mui/material';
import { DragElement } from './DragElement';

export default function CardElement({searchedStatus, taskCategory: searchedCategory, auth}) {
  const [tasks, setTasks] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [progressList, setProgressList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const onDelete = (dataChanged) => {
    setDataChanged(dataChanged);
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

  const handleOnDragEnd = (result) => {
    const {source, destination} = result;
    console.log(result);
    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add, 
    active = tasks,
    progress = progressList,
    completed = completedList;

    if (source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === 'ProgressList') {
      add = progress[source.index];
      progress.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === 'ProgressList') {
      progress.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }

    setTasks(active);
    setProgressList(progress);
    setCompletedList(completed);

  };

  return (
    <div style={{ marginTop: '30px' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Grid item md={4} xs={10} sm={10}>
            <div style={{ textAlign: 'center' }}><h1>Todo</h1></div>
            <DragElement droppableType='TodosList' lists={tasks} onDelete={onDelete}/>
          </Grid>
          <Grid item md={4} xs={10} sm={10}>
            <div style={{ textAlign: 'center' }}><h1>Progress</h1></div>
            <DragElement droppableType='ProgressList' lists={progressList}/>
          </Grid>
          <Grid item md={4} xs={10} sm={10}>
            <div style={{ textAlign: 'center' }}><h1>Completed</h1></div>
            <DragElement droppableType='CompletedList' lists={completedList}/>
          </Grid>
        </DragDropContext>
      </Grid>
    </div>
  );
}