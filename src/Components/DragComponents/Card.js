import React from 'react';
import { Grid } from '@mui/material';
import { DragElement } from './DragElement';

export default function CardElement({tasks, progressList, completedList, onDelete, cardWidth}) {
  return (
    <div style={{ marginTop: '30px' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item md={4} xs={10} sm={10}>
            <div style={{ textAlign: 'center' }}><h1>Todo</h1></div>
            <DragElement
              droppableType='TodosList'
              lists={tasks}
              onDelete={onDelete}
              cardWidth={cardWidth}
              droppingAreaStyle={
                {
                  height: 600,
                  backgroundColor: '#83C0FC',
                }
              }
            />
          </Grid>
          <Grid item md={4} xs={10} sm={10}>
            <div style={{ textAlign: 'center' }}><h1>Progress</h1></div>
            <DragElement 
              droppableType='ProgressList'
              lists={progressList}
              cardWidth={cardWidth}
              droppingAreaStyle={
                {
                  height: 600,
                  backgroundColor: '#83C0FC',
                }
              }
            />
          </Grid>
          <Grid item md={4} xs={10} sm={10}>
            <div style={{ textAlign: 'center' }}><h1>Completed</h1></div>
            <DragElement 
              droppableType='CompletedList'
              lists={completedList}
              cardWidth={cardWidth}
              droppingAreaStyle={
                {
                  height: 600,
                  backgroundColor: '#83C0FC',
                }
              }
            />
          </Grid>
      </Grid>
    </div>
  );
}