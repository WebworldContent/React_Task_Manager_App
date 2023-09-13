import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { CardInner } from './CardContent';
import { Box } from '@mui/material';

export const DragElement = ({droppableType, lists, onDelete, cardWidth, droppingAreaStyle}) => {
    return (
        <Droppable droppableId={droppableType}>
              {
                (provided) => (
                  <Box
                      sx={droppingAreaStyle}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                  >
                      {lists.map((task, indx) => {
                      return (
                        <Draggable draggableId={`${task.id}${indx}`} index={indx} key={indx}>
                          {
                            (provided) => (
                              <div key={indx} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                                <CardInner
                                  name={task.name}
                                  category={task.category}
                                  status={task.status}
                                  taskId={onDelete ? task.id : ''}
                                  handleDelete={onDelete}
                                  cardWidth={cardWidth}
                                  taskEstimate={task.taskEstimate}
                                  createdAt={task.createdAt}
                                />
                              </div>
                            )
                          }
                        
                        </Draggable>)})}
                        {provided.placeholder}
                  </Box>
                )}
            </Droppable>
    )
};

