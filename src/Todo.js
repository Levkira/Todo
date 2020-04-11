import React, { useState, useEffect } from 'react';
import './App.css';
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import { common, grey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import TodoItem from './components/TodoItem';
import { ThemeContext } from './context';
import ThemeButtons from './components/Theme-buttons';
import AddTaskModal from './components/AddForm';

const useStylesBase = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 1080,
        backgroundColor: 'theme.palette.background.paper',
    },

    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    wrapper: {
        textAlign: 'right',
        color: grey[500],
    }
}));

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#303030',
        color: 'white',
    },
    root: {
        color: 'white',
    },
    fab: {
        margin: theme.spacing(2),
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    absolute: {
        position: 'absolute',
    },
    checkbox: {
        color: common['white'],
    },
    wrapper: {
        textAlign: 'right',
        color: common['white'],
        alignItems: 'right',
    }
}));

export default function Todo() {
    const light = useStylesBase();
    const dark = useStyles();
    const [classes, setClasses] = useState(light);
    const context = {
        classes,
        changeTheme: () => { setClasses(classes === light ? dark : light) }
    }

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => setTasks(data))
    }, [])

    const onRemoveTask = id => {
        const updatedTasks = tasks.filter(
            task => task.id !== id);
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
        setTasks(updatedTasks)
    }
    const addTask = newTask => {
        setTasks([{ ...newTask, id: Date.now() }, ...tasks]);
    };

    return (
        <ThemeContext.Provider value={context}>
            <Container maxWidth="md" className={classes.container}>
                <h1>TODO</h1>
                <AddTaskModal classes={context.classes} addTask={addTask} />
                <ThemeButtons
                    changeTheme={context.changeTheme}
                    classes={context.classes} />
                <List className={classes.root}>
                    {tasks.map(task =>
                        <TodoItem key={task.id} task={task}
                            onRemoveTask={onRemoveTask}
                            classes={classes} />
                    )}
                </List>
            </Container>
        </ThemeContext.Provider>
    );
}

