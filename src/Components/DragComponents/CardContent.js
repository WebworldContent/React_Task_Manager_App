import React, {useState} from "react";
import dayjs from "dayjs";
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';
import { deleteTask } from '../../Containers/FormStore';
import { useNavigate } from 'react-router-dom';
import ListDetail from "../ListInfo/ListDetail";

export const CardInner = ({name, status, category, taskId, handleDelete, cardWidth, taskEstimate, createdAt}) => {
    const naviagate = useNavigate();
    const [isListOpen, setIsListOpen] = useState(false);

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

    const getTimeDifference = (startDate, endDate) => {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const duration = end.diff(start, 'minute'); // Get the difference in minutes

      if (!duration) {
        return;
      }
    
      if (duration >= 1440) {
        // If the difference is 1440 minutes or more (1 day or more)
        const days = Math.floor(duration / 1440);
        return `Time remaining ${days} days`;
      } else if (duration >= 60) {
        // If the difference is 60 minutes or more (1 hour or more)
        const hours = Math.floor(duration / 60);
        return `Time remaining ${hours} hrs`;
      } else {
        // If the difference is less than 60 minutes
        return `Time remaining ${duration} min`;
      }
    };

    const startDate = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000);

    return (
      <>
      <Card sx={cardStyle} onClick={() => setIsListOpen(true)}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <h2 style={{color: '#048ee9', textTransform: 'capitalize', fontFamily: 'cursive'}}>{name}</h2>
          </Typography>
          <Typography variant="body2">
            <h3>{category}</h3>
          </Typography>
          {status !== 'completed' ? <Typography variant="body2" color="text.secondary">
            <h3 style={{fontFamily: 'auto'}}>{getTimeDifference(startDate, taskEstimate)}</h3>
          </Typography> : ''}
          <Typography variant="body2" color="text.secondary">
            {status}
          </Typography>
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ marginLeft: '0px' }}>
            {taskId ? <Button color="secondary" onClick={() => naviagate(`/add-task/${taskId}`)} variant="contained">Edit</Button> : ''}
          </span>
          {/* <span style={{ marginLeft: '0px' }}>
            {taskId ? <Button color="primary"   variant="contained">Open</Button> : ''}
          </span> */}
          <span style={{ marginLeft: '110px' }}>
            {taskId ? <Button color="error" variant="contained" onClick={() => handleTaskDeletion(taskId)}>Delete</Button> : ''}
          </span>
        </CardActions>
      </Card>
      <ListDetail openList={isListOpen} isListOpen={(data) => setIsListOpen(data)}/>
      </>
    );
};

