import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

export default function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    
      <div style={{ width: '100%', maxWidth: 960 }}>
        <List sx={{ bgcolor: 'background.paper' }}>
          {[0, 1, 2, 3].map((value, indx) => {
            const labelId = `checkbox-list-label-${value}`;

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
                } disablePadding>
                  <ListItemButton role={undefined} onClick={handleToggle(value)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
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
