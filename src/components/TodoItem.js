import React, { useState } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

export default function TodoItem(props) {

    const [checked, setChecked] = useState(false);

    const handleCheck = id => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: "PUT",
            completed: true,
        })
            .then(response => response.json())
        setChecked(!checked);
    }

    return (
        <ListItem dense button role={undefined}  >
            <ListItemIcon>
                <Checkbox edge="start" disableRipple
                    className={props.classes.checkbox}
                    checked={checked}
                    onClick={() => handleCheck(props.task.id)} />
            </ListItemIcon>
            <ListItemText>{props.task.title}</ListItemText>
            <ListItemSecondaryAction>
                <Button
                    onClick={() => props.onRemoveTask(props.task.id)}
                    variant="contained"
                    color="primary"
                    className={props.classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    )
}