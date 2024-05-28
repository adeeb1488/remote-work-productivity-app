import {  Box, List, ListItem, ListItemText, TextField, Button, Typography, Checkbox, IconButton } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = ({selectedDate, todoItems, addToDoItem, toggleCompleteItem, deleteItem}) => {
  const[newItem, setNewItem] = useState('');
  console.log("ToDoList received props:", { selectedDate, todoItems });

  const handleAddItem = ()=>{
    if(newItem.trim()){
        addToDoItem(selectedDate, newItem.trim());
        setNewItem('');
    }
  }
  
    return (
    <Box sx={{ padding: 2 }}>
        <Typography variant="h6">To-Do List for {selectedDate.toDateString()}</Typography>
        <List>
                {todoItems.map((item, index) => (
                    <ListItem key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                        checked={item.completed}
                        onChange ={()=> toggleCompleteItem(index)}
                        />
                        
                        <ListItemText 
                        primary={item.text}
                        sx={{ textDecoration: item.completed ? 'line-through' : 'none', color: 'white' }}
                        />
                         <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(index)}>
              <DeleteIcon style={{ color: 'white' }} />
            </IconButton>
                    </ListItem>
                ))}
            </List>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2}}>
        <TextField 

           label="New To-Do item"
           value={newItem}
           onChange={(e) => setNewItem(e.target.value)}
           fullWidth
           variant="outlined"
           sx={{ marginRight: 1, backgroundColor: 'white', borderRadius:4 }}
        /> 
        <Button variant="contained" onClick={handleAddItem}>
            Add
        </Button>
        </Box>
    </Box>
  )
}
TodoList.propTypes = {
    selectedDate: PropTypes.instanceOf(Date).isRequired,
    todoItems: PropTypes.arrayOf(PropTypes.string),
    addToDoItem: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
    todoItems: [],
};

export default TodoList