import React from 'react';
import Brightness3Icon from '@material-ui/icons/Brightness3';

export default function ThemeButtons(props) {
    return (
        <div className={props.classes.wrapper} >
            <Brightness3Icon onClick={props.changeTheme} fontSize="large" />
        </div>
    )
}


