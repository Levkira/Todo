import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: theme.spacing(1),
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
}));

export default function AddTaskModal(props) {
  const [newTask, setNewTask] = useState('go');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
  }, [])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setCurrentUser(event.target.value);
  };

  const handleSubmit = () => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: "POST",
      newTask,
    })
      .then(response => response.json())
      .then(data => setNewTask(data.value))
    setNewTask({
      title: newTask.title,
      userId: currentUser.id,
      completed: false
    })
    props.addTask(newTask)
    setOpen(false)
  };

  const onInputChange = (e) => {
    setNewTask({
      title: e.target.value,
    })
  };

  return (
    <div>
      <Tooltip title="Add" aria-label="add" onClick={handleOpen}>
        <Fab color="primary" className={props.fab}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <FormControl style={modalStyle} className={classes.paper} >
          <h2 id="simple-modal-title">Add new task</h2>
          <TextField multiline rows="4"
            fullWidth variant="outlined"
            onChange={onInputChange}
          />
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            fullWidth
            value={currentUser}
            onOpen={handleOpen}
            onChange={handleChange}
          >
            {users.map(user =>
              <MenuItem key={user.id} value={user.name}>
                {user.name}
              </MenuItem>
            )}
          </Select>
          <Button variant="outlined"
            onClick={handleClose}
            className={classes.button}
          >
            Cancel
        </Button>
          <Button variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={handleSubmit}
          >
            Save
        </Button>
        </FormControl>
      </Modal>
    </div>
  );
}
