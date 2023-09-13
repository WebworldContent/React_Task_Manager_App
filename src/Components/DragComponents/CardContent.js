import React from "react";
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { deleteTask } from '../../Containers/FormStore';
import { useNavigate } from 'react-router-dom';

export const CardInner = ({name, status, category, taskId, handleDelete, cardWidth}) => {

    const naviagate = useNavigate();

    const handleTaskDeletion = async (docId) => {
      if (docId) {
        await deleteTask(docId);
        handleDelete(true);
      }
    };

    const cardStyle = {
      margin: 1,
      ...(cardWidth ? {
        width: cardWidth
      } : {})
    };

    return (
      <Card sx={cardStyle}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <h2 style={{color: '#048ee9', textTransform: 'capitalize', fontFamily: 'cursive'}}>{name}</h2>
          </Typography>
          <Typography variant="body2">
            <h3>{category}</h3>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {status}
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ marginLeft: '0px' }}>
            {taskId ? <Button color="secondary" onClick={() => naviagate(`/add-task/${taskId}`)} variant="contained">Edit</Button> : ''}
          </span>
          <span style={{ marginLeft: '110px' }}>
            {taskId ? <Button color="error" variant="contained" onClick={() => handleTaskDeletion(taskId)}>Delete</Button> : ''}
          </span>
        </CardActions>
      </Card>
    );
};

