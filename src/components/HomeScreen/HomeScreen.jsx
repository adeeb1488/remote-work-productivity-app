import React, {useState, useEffect} from 'react';
import { Grid, Paper, Box, Typography } from '@mui/material';
import CodeEditor from '../Features/CodeEditor.jsx';
import Chat from '../Features/Chat.jsx';
import Calendar from '../Features/Calendar.jsx';
import TodoList from '../Features/TodoList.jsx';

const styles = {
    container: {
        marginTop: '32px',
        padding: '16px',
    },
    section: {
        padding: '16px',
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#1c1c1c',
        height: '100%'
    }
};
function HomeScreen() {
    const[selectedDate, setSelectedDate] = useState(new Date());
    const [todoItems, setToDoItems] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }
    // const addToDoItem = (date, item) =>{
    //     const dateString = date.toDateString();
    //     setToDoItems((previousItems)=>{
    //        const updatedItems = {
    //         ...previousItems,
    //         [dateString]: [...(previousItems[dateString] || []), item]
    //        }
    //         // console.log("Updated ToDo Items:", updatedItems);
    //         return updatedItems;
        
    //     })
    // }
    const handleAddTodo = (date, text) =>{
        const newTodo = {text, completed: false, date: date.toDateString()};
        setToDoItems([...todoItems, newTodo])
    }
    const handleToggleComplete = (index) =>{
        const updatedTodos = todoItems.map((item, i)=>
        i === index ? {...item, completed: !item.completed} : item
        )
        setToDoItems(updatedTodos);
    }
    const handleDeleteItem = (index) =>{
        const updatedTodos = todoItems.filter((_,i) => i !== index);
        setToDoItems(updatedTodos);
    }
    const filteredTodoItems = todoItems.filter(
        (item) => item.date === selectedDate.toDateString()
      );
    
    const getToDoItemsForDate = (date) => {
        const dateString = date.toDateString();
    const items = todoItems[dateString] || []; 
    // console.log("ToDo Items for date", dateString, ":", items);
    return items;
    };
    // console.log('toDoItems:', getToDoItemsForDate(selectedDate));

  return (
    <Box sx = {styles.container}>
        <Typography variant='h4'  gutterBottom style={{ color: 'white' }}>
            Welcome to Remote Work Productivity App
        </Typography>   
        <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper style={styles.section}>
                        <Typography variant="h6" style={{ color: 'white' }}>Code Editor</Typography>
                        <Box sx={{ height: '400px' }}>
                            <CodeEditor />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={styles.section}>
                        <Typography variant="h6" style={{ color: 'white' }}>Chat</Typography>
                       <Chat />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={styles.section}>
                        <Typography variant="h6" style={{ color: 'white' }}>Calendar</Typography>
                        <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={styles.section}>
                        <Typography variant="h6" style={{ color: 'white' }}>To-Do List</Typography>
                        <TodoList
                        selectedDate={selectedDate}
                        todoItems={filteredTodoItems}
                        addToDoItem={handleAddTodo}
                        toggleCompleteItem={handleToggleComplete}
                        deleteItem={handleDeleteItem}
                    />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
  )
}

export default HomeScreen