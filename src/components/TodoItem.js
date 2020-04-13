import React, {useContext} from 'react'
import { ThemeContext } from '../context';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TodoItem(props) {
    const { classes, changeTheme } = useContext(ThemeContext);
    const handleCheck = id => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "PUT",
            completed: true,
        })
            .then(response => response.json())
        const updatedTask = props.task;
        updatedTask.completed = !updatedTask.completed
        props.setTasks(
            props.tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    }

    return (
        <ListItem dense button role={undefined}  >
            <ListItemIcon>
                <Checkbox edge="start" disableRipple
                    className={classes.checkbox}
                    onClick={() => handleCheck(props.task.id)} />
            </ListItemIcon>
            <ListItemText>{props.task.title}</ListItemText>
            <ListItemSecondaryAction>
                <Button
                    onClick={() => props.onRemoveTask(props.task.id)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    )
}