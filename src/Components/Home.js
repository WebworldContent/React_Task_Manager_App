import React, { Fragment, useEffect, useState, useCallback } from "react";
import TaskStatus from "./TaskStatus";
import TaskCategory from './TaskCategory';
import {Stack, Button, Box, Grid} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { MenuHeader } from "./Header";
import { getAuth } from "firebase/auth";
import { getTaskStatus, getTasks, getTaskCategory, updateTaskStatus, getStageAreaTasks } from '../Containers/FormStore';
import { onAuthStateChanged } from "firebase/auth";
import { DragDropContext } from "react-beautiful-dnd";

import Card from './DragComponents/Card';
import { DragElement } from "./DragComponents/DragElement";

export const Home = () => {
  const [searchedStatus, setSearchedStatus] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const onDelete = (dataChanged) => {
    setDataChanged(dataChanged);
  };

  const getStageAreaData = useCallback(async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const taskData = await getStageAreaTasks(uid);
        setTasks(taskData);
      }
    });
    
  }, [auth]);

  const getTaskData = useCallback(async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const taskData = await getTasks(uid);
        setTodoList(taskData.filter(data => data.status === 'todo'));
        setProgressList(taskData.filter(data => data.status === 'in_progress'));
        setCompletedList(taskData.filter(data => data.status === 'completed'));
      }
    });
  }, [auth]);

  const getTasksStatusWise = useCallback(async () => {
    const taskData = await getTaskStatus(searchedStatus);
    setTasks(taskData);
  }, [searchedStatus]);

  const getTasksCategoryWise = useCallback(async () => {
    const taskData = await getTaskCategory(taskCategory);
    setTasks(taskData);
  }, [taskCategory]);

  useEffect(() => {
    (async () => {
      try {
        await getTaskData();

        if (searchedStatus) {
          await getTasksStatusWise();
        } else if (taskCategory) {
          await getTasksCategoryWise();
        } else {
          await getStageAreaData();
        }
        setDataChanged(false);
      } catch(err) {
        throw new Error(err);
      }
    })();
  }, [getTaskData, getStageAreaData, dataChanged, getTasksStatusWise, searchedStatus, getTasksCategoryWise, taskCategory]);

  const handleOnDragEnd = (result) => {
    const {source, destination} = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add,
    active = tasks,
    todo = todoList,
    progress = progressList,
    completed = completedList;

    if (source.droppableId === 'StageArea') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === 'TodosList') {
      add = todo[source.index];
      todo.splice(source.index, 1);
    } else if (source.droppableId === 'ProgressList') {
      add = progress[source.index];
      progress.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodosList') {
      updateTaskStatus(add.id, 'todo');
      todo.splice(destination.index, 0, add);
    } else if (destination.droppableId === 'ProgressList') {
      updateTaskStatus(add.id, 'in_progress');
      progress.splice(destination.index, 0, add);
    } else {
      updateTaskStatus(add.id, 'completed');
      completed.splice(destination.index, 0, add);
    }

    setTasks(active);
    setTodoList(todo);
    setProgressList(progress);
    setCompletedList(completed);
    setDataChanged(true);

  };

    return (
    <Fragment>
      <MenuHeader auth={auth} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Grid item md={8} xs={10} sm={10}>
                  <DragElement droppableType='StageArea' lists={tasks} onDelete={onDelete} cardWidth={275} droppingAreaStyle={
                    {
                      display: 'flex',
                      height: 350,
                      backgroundColor: '#83C0FC',
                      flexWrap: 'wrap',
                      overflowX: 'auto'
                    }
                  }/>
                </Grid>
                <Grid item md={8} xs={10} sm={10}>
                  <div style={{ marginTop: '40px' }}>
                    <Stack
                      direction={{ xs: 'column', sm: 'column', md: 'row' }}
                      spacing={{ xs: 2, sm: 10, md: 45 }}
                    >
                      <TaskStatus taskStatus={(data) => setSearchedStatus(data)} />
                      <Button variant="contained" onClick={() => navigate('add-task')}>Add Tasks</Button>
                      <TaskCategory taskCategory={(data) => setTaskCategory(data)} />
                    </Stack>
                  </div>
                </Grid>
                <Grid item md={8} xs={10} sm={10}>
                  <Card tasks={todoList} progressList={progressList} completedList={completedList} onDelete={onDelete} />
                </Grid>
              </DragDropContext>
          </Grid>
        </Box>
      </div>
    </Fragment>
  )
}

