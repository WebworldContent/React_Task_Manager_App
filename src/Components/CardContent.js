import React from "react";
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { deleteTask } from '../Containers/FormStore';
import { useNavigate } from 'react-router-dom';

export const CardInner = ({name, status, category, taskId, handleDelete}) => {

    const naviagate = useNavigate();
    const handleTaskDeletion = async (docId) => {
      if (docId) {
        await deleteTask(docId);
        handleDelete(true);
      }
    };

    return (
      <Card sx={{ minWidth: 275, margin: 1 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Button color="info">{status}</Button>
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {name}
            </Typography>
            <Typography variant="body2">
            <Button color="success">
              {category}
            </Button>
            </Typography>
        </CardContent>
        <CardActions>
          <span style={{ marginLeft: '0px' }}>
            <Button color="secondary" onClick={() => naviagate(`/add-task/${taskId}`)} variant="contained">
              Edit
            </Button>
          </span>
          <span style={{ marginLeft: '110px' }}>
            <Button color="error" variant="contained" onClick={() => handleTaskDeletion(taskId)}>
              Delete
            </Button>
          </span>
        </CardActions>
      </Card>
    );
};

